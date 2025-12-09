'use client';

import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Phone, Video, MoreVertical, Send, Paperclip,
    Mic, Smile, Image as ImageIcon, ChevronLeft, Check, CheckCheck,
    Settings, LogOut, Loader2, Menu
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/ui/dropdown-menu';

// Emoji Picker
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import { useSocket } from "@/context/SocketProviderContext";
import { AuthContext } from "@/context/AuthProvider";
import { apiClient } from "@/service/api";
import { toast } from "react-hot-toast";

// Types
type User = { _id: string; name: string; avatar?: string; role: string; email?: string; };
type Message = { _id?: string; tempId?: string; text: string; from: User | string; createdAt: string; roomId: string; status?: string; };

export default function ChatPage() {
    const { socket, isConnected } = useSocket();
    const { user } = useContext(AuthContext);

    // --- Data State ---
    const [usersList, setUsersList] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

    // --- UI State ---
    const [loadingSidebar, setLoadingSidebar] = useState(true);
    const [loadingChat, setLoadingChat] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // Mobile Sidebar Toggle
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 1. Initial Load
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await apiClient.get('/chat/users');
                if (res.data?.ok) {
                    setUsersList(res.data.data || []);
                }
            } catch (error) {
                console.error("Sidebar Error:", error);
            } finally {
                setLoadingSidebar(false);
            }
        };
        fetchUsers();
    }, []);

    // 2. Auto-Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 3. Socket Listener (The "Live" Part)
    useEffect(() => {
        if (!socket) return;

        const handleIncomingMessage = (msg: Message) => {
            // Security check: Only add if message belongs to current room
            if (activeRoomId && msg.roomId === activeRoomId) {
                setMessages((prev) => {
                    // Prevent duplicate messages (optimistic vs server echo)
                    const exists = prev.some(m =>
                        (m._id && m._id === msg._id) ||
                        (m.tempId && m.tempId === msg.tempId) // Check tempId if server echoes it back
                    );
                    if (exists) return prev;
                    return [...prev, msg];
                });
            }
        };

        socket.on("message", handleIncomingMessage);

        return () => {
            socket.off("message", handleIncomingMessage);
        };
    }, [socket, activeRoomId]);

    // 4. Handle Room Selection
    const handleUserSelect = async (targetUser: User) => {
        if (loadingChat) return;

        setSelectedUser(targetUser);
        setMessages([]); // Clear previous chat
        setActiveRoomId(null);
        setLoadingChat(true);
        setShowEmojiPicker(false);

        // On mobile, hide sidebar when chat opens
        if (window.innerWidth < 768) setIsSidebarOpen(false);

        try {
            // A. Get/Create Room
            const payload = { otherUserId: targetUser._id };
            const res = await apiClient.post('/chat/rooms', payload);

            if (res.data?.ok && res.data?.room) {
                const room = res.data.room;
                setActiveRoomId(room.roomId);

                // B. Join Socket Room
                if (socket && isConnected) {
                    socket.emit("joinRoom", { roomId: room.roomId });
                }

                // C. Fetch History
                const msgRes = await apiClient.get(`/chat/messages/${room.roomId}`);
                if (msgRes.data?.ok) {
                    setMessages(msgRes.data.data || []);
                }
            }
        } catch (error) {
            console.error("Chat Init Error:", error);
            toast.error("Failed to open chat");
        } finally {
            setLoadingChat(false);
        }
    };

    // 5. Send Message (Optimistic UI)
    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newMessage.trim() || !socket || !activeRoomId) return;

        const text = newMessage;
        const tempId = Date.now().toString(); // ID for optimistic display

        setNewMessage('');
        setShowEmojiPicker(false);

        // Optimistic update: Show message immediately
        const optimisticMsg: Message = {
            _id: tempId, // Temporary ID
            tempId: tempId,
            text,
            from: user.userId, // Matches structure of real user object
            createdAt: new Date().toISOString(),
            roomId: activeRoomId,
            status: 'sending'
        };

        setMessages(prev => [...prev, optimisticMsg]);

        // Send to server
        socket.emit("sendMessage", { roomId: activeRoomId, text, tempId }, (ack: any) => {
            if (!ack?.ok) {
                toast.error("Failed to send message");
                // Remove the optimistic message if it failed
                setMessages(prev => prev.filter(m => m._id !== tempId));
                setNewMessage(text); // Put text back in input
            }
        });
    };

    // 6. Emoji Click Handler
    const onEmojiClick = (emojiData: EmojiClickData) => {
        setNewMessage((prev) => prev + emojiData.emoji);
    };

    const filteredUsers = usersList.filter(u =>
        u.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!user) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" /></div>;

    return (
        // === MAIN LAYOUT CONTAINER ===
        // Uses CSS Grid for rigid structure.
        // Mobile: 1 column. Desktop: 350px sidebar + 1fr chat area.
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] h-[calc(100vh-4rem)] bg-white overflow-hidden font-sans border-t border-gray-200">

            {/* ================= LEFT SIDEBAR ================= */}
            <div className={`
                flex flex-col border-r border-gray-200 bg-white h-full
                ${isSidebarOpen ? 'block' : 'hidden md:flex'} // Toggle logic for mobile
            `}>
                {/* Sidebar Header */}
                <div className="h-16 flex-shrink-0 px-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-2 ring-white shadow-sm">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-orange-100 text-orange-700 font-bold">{user.userId?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-gray-800 text-sm">Chats</h1>
                            <div className="flex items-center gap-1.5">
                                <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
                                    {isConnected ? 'Online' : 'Reconnecting...'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 rounded-full h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem><Settings className="mr-2 h-4 w-4"/> Settings</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600"><LogOut className="mr-2 h-4 w-4"/> Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Search */}
                <div className="p-3 flex-shrink-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search contacts..."
                            className="pl-9 bg-gray-100 border-transparent focus:bg-white focus:border-orange-300 transition-all rounded-xl h-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* SCROLLABLE USER LIST */}
                {/* overflow-y-auto is critical here for scrolling */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="px-2 pb-2 space-y-1">
                        {loadingSidebar ? (
                            <div className="flex flex-col items-center justify-center py-10 space-y-2 text-gray-400">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span className="text-xs">Syncing contacts...</span>
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 text-sm">
                                <p>No contacts found.</p>
                            </div>
                        ) : (
                            filteredUsers.map((u) => {
                                const isActive = selectedUser?._id === u._id;
                                return (
                                    <button
                                        key={u._id}
                                        onClick={() => handleUserSelect(u)}
                                        className={`
                                            w-full p-3 flex items-center gap-3 rounded-xl transition-all duration-200 text-left group
                                            ${isActive ? 'bg-orange-50 ring-1 ring-orange-200 shadow-sm' : 'hover:bg-gray-50'}
                                        `}
                                    >
                                        <div className="relative">
                                            <Avatar className="h-11 w-11 border border-gray-100 bg-white shadow-sm">
                                                <AvatarImage src={u.avatar} />
                                                <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 font-bold">
                                                    {u.name?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline">
                                                <h3 className={`font-semibold text-sm truncate ${isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                                    {u.name}
                                                </h3>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate capitalize">
                                                {u.role}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* ================= CHAT AREA ================= */}
            <main className={`
                flex flex-col h-full bg-[#E5DDD5] relative
                ${!isSidebarOpen ? 'flex' : 'hidden md:flex'} // On mobile, hide if sidebar is open
            `}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

                {selectedUser ? (
                    <>
                        {/* 1. CHAT HEADER */}
                        <div className="h-16 px-4 bg-white border-b border-gray-200 flex justify-between items-center z-10 shadow-sm flex-shrink-0">
                            <div className="flex items-center gap-3">
                                {/* Mobile Back Button */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden -ml-2 text-gray-600"
                                    onClick={() => setIsSidebarOpen(true)}
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>

                                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-90 transition-opacity">
                                    <AvatarImage src={selectedUser.avatar} />
                                    <AvatarFallback>{selectedUser.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-bold text-gray-800 text-sm leading-tight">
                                        {selectedUser.name}
                                    </h2>
                                    <p className="text-[10px] text-green-600 font-medium bg-green-50 px-1.5 rounded-full w-fit">
                                        {selectedUser.role}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 rounded-full h-9 w-9">
                                    <Video className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 rounded-full h-9 w-9">
                                    <Phone className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* 2. MESSAGES LIST (SCROLLABLE) */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            {loadingChat ? (
                                <div className="flex flex-col items-center justify-center h-full space-y-4">
                                    <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
                                    <p className="text-sm text-gray-500 font-medium bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm">
                                        Loading secure chat...
                                    </p>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full opacity-60 space-y-4">
                                    <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <Smile className="h-12 w-12 text-orange-300" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-medium text-gray-600">No messages yet</p>
                                        <p className="text-sm text-gray-500">Say hello to {selectedUser.name}!</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-end min-h-full space-y-2 pb-2">
                                    {messages.map((msg, index) => {
                                        // Handle Robust ID Checking (Populated vs String)
                                        const senderId = typeof msg.from === 'object' ? msg.from._id : msg.from;
                                        const isMe = senderId === user.userId._id;

                                        return (
                                            <motion.div
                                                key={msg._id || msg.tempId || index}
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`
                                                        relative max-w-[85%] md:max-w-[65%] px-3 py-2 rounded-lg shadow-sm text-sm
                                                        ${isMe
                                                        ? 'bg-[#E8A314] text-white rounded-tr-none'
                                                        : 'bg-white text-gray-900 rounded-tl-none'
                                                    }
                                                    `}
                                                >
                                                    {/* Chat Bubble Tail */}
                                                    <span className={`absolute top-0 w-2 h-2 ${isMe ? '-right-2 border-[8px] border-[#E8A314] border-t-transparent border-r-transparent' : '-left-2 border-[8px] border-white border-t-transparent border-l-transparent'} transform ${isMe ? 'rotate-0' : 'rotate-180'}`}></span>

                                                    <p className="whitespace-pre-wrap leading-relaxed break-words">{msg.text}</p>

                                                    <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-orange-100' : 'text-gray-400'}`}>
                                                        {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        {isMe && <CheckCheck className="h-3 w-3" />}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        {/* 3. INPUT AREA */}
                        <div className="p-3 bg-[#F0F2F5] flex-shrink-0 z-10 border-t border-gray-200">
                            {/* EMOJI PICKER POPUP */}
                            {showEmojiPicker && (
                                <div className="absolute bottom-20 left-4 z-50 shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
                                    <EmojiPicker
                                        onEmojiClick={onEmojiClick}
                                        width={300}
                                        height={350}
                                        previewConfig={{ showPreview: false }}
                                    />
                                </div>
                            )}

                            <form onSubmit={handleSendMessage} className="flex items-end gap-2 max-w-5xl mx-auto">
                                <div className="relative">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className={`rounded-full h-10 w-10 shrink-0 hidden sm:flex ${showEmojiPicker ? 'text-orange-500 bg-orange-100' : 'text-gray-500 hover:bg-gray-200'}`}
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    >
                                        <Smile className="h-6 w-6" />
                                    </Button>
                                </div>
                                <Button type="button" variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-200 rounded-full h-10 w-10 shrink-0">
                                    <Paperclip className="h-5 w-5" />
                                </Button>

                                <div className="flex-1 bg-white border border-gray-200 rounded-xl flex items-center px-4 py-2 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all shadow-sm">
                                    <Input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onFocus={() => setShowEmojiPicker(false)}
                                        placeholder="Type a message..."
                                        className="border-none shadow-none focus-visible:ring-0 bg-transparent min-h-[24px] py-0 px-0 text-base placeholder:text-gray-400"
                                        autoComplete="off"
                                    />
                                </div>

                                {newMessage.trim() ? (
                                    <Button
                                        type="submit"
                                        disabled={!isConnected}
                                        className="rounded-full h-11 w-11 bg-[#E8A314] hover:bg-[#d6920b] shadow-md shrink-0 flex items-center justify-center p-0 transition-transform active:scale-95 disabled:opacity-50"
                                    >
                                        <Send className="h-5 w-5 text-white ml-0.5" />
                                    </Button>
                                ) : (
                                    <Button type="button" className="rounded-full h-11 w-11 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 shadow-sm shrink-0 flex items-center justify-center p-0">
                                        <Mic className="h-5 w-5" />
                                    </Button>
                                )}
                            </form>
                        </div>
                    </>
                ) : (
                    /* EMPTY STATE */
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-[#f0f2f5] border-l border-gray-200">
                        <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                            <img src="/logo.svg" alt="App Logo" className="h-16 w-16 opacity-80" />
                        </div>
                        <h2 className="text-3xl font-light text-gray-800 mb-4">KrishiNetra Web</h2>
                        <p className="text-gray-500 max-w-md leading-relaxed">
                            Send and receive messages without keeping your phone online.<br/>
                            Select a chat from the sidebar to start messaging.
                        </p>
                        <div className="mt-10 flex items-center gap-2 text-xs text-gray-400">
                            <div className="h-3 w-3 bg-gray-300 rounded-full flex items-center justify-center">
                                <div className="h-1.5 w-1.5 bg-gray-500 rounded-full"></div>
                            </div>
                            End-to-end encrypted
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
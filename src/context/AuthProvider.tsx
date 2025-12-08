"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, GET_ME } from "@/service/api";

export const AuthContext = createContext({
    user: null,
    setUser: null,
    loading: true
});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMyUser = async() => {
            console.log("Fetching user data...");
            try{
                const res = await apiClient.get(GET_ME);
                console.log("Res",res);
                setUser(res.data.data);
            }catch(err){
                setUser(null);
                console.log("Error:",err?.response?.data);
            }finally{
                setLoading(false);
            }
        }
        // const access = getCookie('accessToken');
        // const refresh = getCookie('refreshToken');
        // if (!refresh || !access) {
        //     setLoading(false);
        //     return;
        // }
        getMyUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

function getCookie(name:string) {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='))
        ?.split('=')[1];
}
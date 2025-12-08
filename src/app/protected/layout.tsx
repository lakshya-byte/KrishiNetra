"use client";

import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProtectedLayout({ children }) {
    const effectRan = useRef(false);
	const { user, loading } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
            toast.error("Please log in to access this page.");
			router.replace("/auth");
		}
	}, [loading, user]);

    if(loading){
        return <div className="flex items-center justify-center h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
    }

	return <div className="protected-container">{children}</div>;
}

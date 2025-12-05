"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }) {
	const { user, loading } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.replace("/auth");
		}
	}, [loading, user]);

	if (loading || !user) return null;

	return <div className="protected-container">{children}</div>;
}

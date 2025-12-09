"use client";

import { useContext, useEffect, useState } from "react";
import { apiClient } from "@/service/api";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";

export default function ResidueDetailPage() {
    const params = useParams();
    const router = useRouter();
    const residueId = params.id;
    const {user,loading} = useContext(AuthContext);

    const [residue, setResidue] = useState(null);

    const fetchResidue = async () => {
        try {
            const res = await apiClient.get(`/residue/${residueId}`);
            setResidue(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBuy = async () => {
        try {

            await apiClient.put(`/residue/${residueId}/buy`, {
                buyerId: "BUYER_PROFILE_ID_HERE" 
            });

            alert("Residue booked successfully!");
            router.push("/distributor/residue");
        } catch (err) {
            console.error(err);
            alert("Failed to book residue.");
        }
    };

    useEffect(() => {
        fetchResidue();
    }, []);

    if (!residue) return <div className="p-6">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow p-6">

            <h1 className="text-3xl font-bold mb-4">{residue.residueType}</h1>

            <div className="space-y-2 text-lg">
                <p><b>Quantity:</b> {residue.quantityTons} tons</p>
                <p><b>Moisture Level:</b> {residue.moistureLevel}</p>
                <p><b>Quality Grade:</b> {residue.qualityGrade}</p>
                <p><b>Price:</b> ₹{residue.basePricePerTon}/ton</p>
                <p><b>Status:</b> {residue.status}</p>
            </div>

            <hr className="my-4" />

            <h2 className="text-xl font-semibold">Location</h2>
            <p className="text-gray-700 mt-1">
                {residue.location?.village}, {residue.location?.district}, {residue.location?.state}
            </p>

            <hr className="my-4" />

            {/* BUY BUTTON */}
            <button
                onClick={handleBuy}
                disabled={loading || residue.status !== "Available"}
                className={`px-6 py-3 rounded text-white font-semibold 
                    ${residue.status === "Available" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
            >
                {loading ? "Booking..." : "Buy / Book Residue"}
            </button>

        </div>
    );
}

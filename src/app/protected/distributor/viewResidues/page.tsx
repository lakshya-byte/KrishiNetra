"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/service/api";
import { useRouter } from "next/navigation";

export default function ViewResiduePage() {
    const router = useRouter();
    const [residues, setResidues] = useState([]);

    const fetchResidues = async () => {
        try {
            const res = await apiClient.get("/residue");
            setResidues(res.data);
        } catch (err) {
            console.error("Error fetching residues:", err);
        }
    };

    useEffect(() => {
        fetchResidues();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Available Residues</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {residues.map((item) => (
                    <div
                        key={item._id}
                        onClick={() => router.replace(`/protected/distributor/viewResidues/${item._id}`)}
                        className="border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transition bg-white"
                    >s
                        <h2 className="text-xl font-semibold">{item.residueType}</h2>

                        <p className="text-gray-600 mt-1">
                            Quantity: {item.quantityTons} tons
                        </p>

                        <p className="text-gray-600">
                            Price: ₹{item.basePricePerTon}/ton
                        </p>

                        <p className="text-gray-500 mt-2 text-sm">
                            {item.location?.district}, {item.location?.state}
                        </p>

                        <span
                            className={`inline-block mt-3 px-3 py-1 text-sm rounded 
                                ${item.status === "Available" ? "bg-green-100 text-green-700" :
                                item.status === "Booked" ? "bg-yellow-100 text-yellow-700" :
                                "bg-gray-200 text-gray-700"}`}
                        >
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

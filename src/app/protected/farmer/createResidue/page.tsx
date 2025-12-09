"use client";

import { useState } from "react";
import { apiClient } from "@/service/api"; // your axios instance with auth token attached
import { useRouter } from "next/navigation";

export default function CreateResidue() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        residueType: "",
        quantityTons: "",
        moistureLevel: "Medium",
        qualityGrade: "B",
        basePricePerTon: "",
        expiryDate: "",
        location: {
            state: "",
            district: "",
            village: "",
            stateCode:"",
        },
    });

    const residueTypes = [
        "Paddy Straw",
        "Wheat Straw",
        "Sugarcane Bagasse",
        "Maize Stalk",
        "Cotton Stalk",
        "Banana Fiber",
        "Rice Husk",
        "Groundnut Shells",
        "CornCobs",
        "MixedResidue",
        "Other",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("location.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                location: { ...prev.location, [key]: value },
            }));
        } else if (name === "longitude" || name === "latitude") {
            setForm((prev) => ({
                ...prev,
                location: {
                    ...prev.location,
                },
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...form,
                quantityTons: Number(form.quantityTons),
                basePricePerTon: Number(form.basePricePerTon),
                location: {
                    ...form.location,
                },
            };

            await apiClient.post("/residue/F", payload);

            router.replace("/protected/farmer/dashboard");
            alert("Residue listing created successfully!"); 
        } catch (err) {
            console.error(err);
            alert("Failed to create residue listing");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create Residue Listing</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block font-medium">Residue Type</label>
                    <select
                        name="residueType"
                        value={form.residueType}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Type</option>
                        {residueTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-medium">Quantity (Tons)</label>
                    <input
                        type="number"
                        name="quantityTons"
                        value={form.quantityTons}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Moisture Level */}
                <div>
                    <label className="block font-medium">Moisture Level</label>
                    <select
                        name="moistureLevel"
                        value={form.moistureLevel}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>

                {/* Quality */}
                <div>
                    <label className="block font-medium">Quality Grade</label>
                    <select
                        name="qualityGrade"
                        value={form.qualityGrade}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block font-medium">Base Price (₹/Ton)</label>
                    <input
                        type="number"
                        name="basePricePerTon"
                        value={form.basePricePerTon}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Expiry Date */}
                <div>
                    <label className="block font-medium">Expiry Date (optional)</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={form.expiryDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Location Fields */}
                <h2 className="font-bold text-lg mt-4">Location</h2>

                <div>
                    <label className="block font-medium">State</label>
                    <input
                        type="text"
                        name="location.state"
                        value={form.location.state}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">District</label>
                    <input
                        type="text"
                        name="location.district"
                        value={form.location.district}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Village</label>
                    <input
                        type="text"
                        name="location.village"
                        value={form.location.village}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
               
                <div>
                    <label className="block font-medium">StateCode</label>
                    <input
                        type="text"
                        name="location.stateCode"
                        value={form.location.stateCode}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white p-3 rounded mt-6 hover:bg-green-700"
                >
                    {loading ? "Creating..." : "Create Residue Listing"}
                </button>
            </form>
        </div>
    );
}

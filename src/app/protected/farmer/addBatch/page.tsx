'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Upload, MapPin, Check, UploadIcon, XIcon } from 'lucide-react';
import { apiClient, POST_CREATE_BATCH } from '@/service/api';

export default function AddBatch() {
    const maxImages = 5;
    const maxSizeMB = 5;
    const bytesLimit = maxSizeMB * 1024 * 1024;

    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]); // {id, src, name}
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [uploadedUrls, setUploadedUrls] = useState([] as string[]); // URLs returned from backend
    const [step, setStep] = useState(1);

    // const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        cropType: '',
        otherCropType: '',
        quantity: '',
        unit: 'kg',
        quality: '',
        price: '',
        harvestDate: '',
        location: {
            village:'',
            district:'',
            state:'',
            pin:''
        },
        images: [] as string[],
    });

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    useEffect(() => {
        // build previews when files change
        const newPreviews = files.map((file, idx) => ({
            id: `${file.name}-${file.size}-${idx}`,
            src: URL.createObjectURL(file),
            name: file.name,
        }));
        setPreviews((prev) => {
            // revoke old urls
            prev.forEach((p) => URL.revokeObjectURL(p.src));
            return newPreviews;
        });

        return () => {
            newPreviews.forEach((p) => URL.revokeObjectURL(p.src));
        };
    }, [files]);

    function validateAndAppend(newFiles: any[]) {
        setError("");
        const curCount = previews.length + uploadedUrls.length;
        const allowedCount = maxImages - curCount;
        if (allowedCount <= 0) {
            setError(`Maximum ${maxImages} images allowed.`);
            return;
        }

        const filtered = [];
        for (let i = 0; i < newFiles.length && filtered.length < allowedCount; i++) {
            const f = newFiles[i];
            if (!f.type.startsWith("image/")) {
                setError("Only image files (JPG/PNG/etc.) are allowed.");
                continue;
            }
            if (f.size > bytesLimit) {
                setError(`Each file must be <= ${maxSizeMB}MB.`);
                continue;
            }
            filtered.push(f);
        }

        if (filtered.length) setFiles((s) => [...s, ...filtered]);
    }

    function handleInputChange(e) {
        validateAndAppend(Array.from(e.target.files || []));
        e.target.value = null; // reset
    }

    function handleDrop(e) {
        e.preventDefault();
        validateAndAppend(Array.from(e.dataTransfer.files || []));
    }

    function handleRemovePreview(id) {
        setFiles((s) => s.filter((_, i) => `${s[i].name}-${s[i].size}-${i}` !== id));
    }

    function handleRemoveUploaded(index) {
        const removed = uploadedUrls[index];
        setUploadedUrls((s) => s.filter((_, i) => i !== index));
    }

    const handleUpload = async () => {
        if (!files.length) {
            setError("No new images to upload.");
            return;
        }

        setUploading(true);
        setError("");

        try {
            const fd = new FormData();
            files.forEach((f) => fd.append("images", f));

            console.log(files);
            // NOTE: your backend endpoint should accept `images` multipart and return { urls: [..] }
            const res = await apiClient.post("/upload/upload-images", fd, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (!res) {
                throw new Error("Upload failed");
            }
            console.log("Upload response:", res);
            setUploadedUrls((s) => [...s, ...res.data.message.urls]); 
            setFiles([]);
        } catch (err) {
            console.error(err);
            setError(err.message || "Upload error");
        } finally {
            setUploading(false);
        }
    }

    const handleSubmit = async () => {
        const batchId = Math.floor(Math.random() * 1000000); // Temporary batch ID generation
        try {
            const payload = {
                batchId:batchId,
                cropType: formData.cropType === 'other' ? formData.otherCropType : formData.cropType,
                quantity: `${formData.quantity}`,
                pricePerKg: formData.price,
                harvestDate: formData.harvestDate,
                location:`${formData.location.village}, ${formData.location.district}, ${formData.location.state} - ${formData.location.pin}`,
                additionalDetails: {
                    quality: formData.quality
                },
                images: uploadedUrls
            }

            const res = await apiClient.post(POST_CREATE_BATCH,payload);
            console.log("Batch creation response:", res);
        }catch(err){
            console.log(err);
        }

    };



    const progressPercentage = (step / 4) * 100;

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-[#0F1419] mb-4">Create New Batch</h1>
                <div className="flex items-center gap-3">
                    <span className="text-[#666666] text-sm">Step {step} of 4</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#2D7A3E] transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className="space-y-6" style={{ animation: 'fadeInUp 300ms ease-out' }}>
                        <h2 className="text-[#0F1419]">Basic Information</h2>

                        {/* Crop Type */}
                        <div>
                            <label className="block text-[#0F1419] text-sm mb-2">Crop Type</label>
                            <select
                                value={formData.cropType}
                                onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                            >
                                <option value="">Select a crop</option>
                                <option value="Rice">Rice</option>
                                <option value="Wheat">Wheat</option>
                                <option value="Mustard">Mustard</option>
                            </select>
                        </div>

                        {/* Other Crop Type */}
                        {formData.cropType === 'other' && (
                            <div className="mt-4">
                                <label className="block text-[#0F1419] text-sm mb-2">Specify Other Crop Type</label>
                                <input
                                    type="text"
                                    placeholder="Enter crop type"
                                    value={formData.otherCropType}
                                    onChange={(e) => setFormData({ ...formData, otherCropType: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                />
                            </div>
                        )}
                        {/* Quantity */}
                        <div>
                            <label className="block text-[#0F1419] text-sm mb-2">Quantity</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Enter quantity"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                />
                                <select
                                    value={formData.unit}
                                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                >
                                    <option value="kg">kg</option>
                                    <option value="tons">tons</option>
                                </select>
                            </div>
                        </div>

                        {/* Quality Level */}
                        <div>
                            <label className="block text-[#0F1419] text-sm mb-2">Quality Level</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {['Grade A', 'Grade B', 'Grade C'].map((quality) => (
                                    <button
                                        key={quality}
                                        onClick={() => setFormData({ ...formData, quality })}
                                        className={`
                      px-4 py-3 rounded-lg border-2 transition-all duration-150
                      ${formData.quality === quality
                                                ? 'bg-[#2D7A3E] text-white border-[#2D7A3E]'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#2D7A3E]'
                                            }
                    `}
                                    >
                                        {quality}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-[#0F1419] text-sm mb-2">Price per Unit</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full pl-8 pr-16 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">/{formData.unit}</span>
                            </div>
                            <p className="text-[#666666] text-xs mt-1">Market average: ₹7.50/kg</p>
                        </div>

                        {/* Harvest Date */}
                        <div>
                            <label className="block text-[#0F1419] text-sm mb-2">Harvest Date</label>
                            <input
                                type="date"
                                value={formData.harvestDate}
                                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Images & QR */}
                {step === 2 && (
                    <div className="space-y-6" style={{ animation: 'fadeInUp 300ms ease-out' }}>
                        <h2 className="text-[#0F1419]">Images</h2>

                        {/* Upload Images */}
                        <div>
                            <label className="block text-[#0F1419] text-sm mb-2">Upload Images</label>
                            <div
                                className="border-2 border-dashed border-[#E8A314] rounded-xl p-6 text-center hover:bg-[#FFF8E1] transition-colors cursor-pointer"
                                onClick={() => inputRef.current && inputRef.current.click()}
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <div className="flex flex-col items-center">
                                    <UploadIcon className="w-12 h-12 text-[#E8A314] mx-auto mb-4" />
                                    <p className="text-[#666666] mb-2">Drag images or click to upload</p>
                                    <p className="text-[#999999] text-xs">JPG, PNG, max {maxSizeMB}MB each (Max {maxImages} images)</p>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

                            {/* Preview thumbnails for new files */}
                            {previews.length > 0 && (
                                <div className="mt-4 grid grid-cols-5 gap-3">
                                    {previews.map((p) => (
                                        <div key={p.id} className="relative rounded overflow-hidden border p-1">
                                            <img src={p.src} alt={p.name} className="w-28 h-28 object-cover" />
                                            <button
                                                onClick={() => handleRemovePreview(p.id)}
                                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                                                title="Remove"
                                            >
                                                <XIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Uploaded images (already returned from backend) */}
                            {uploadedUrls.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Uploaded</p>
                                    <div className="grid grid-cols-5 gap-3">
                                        {uploadedUrls.map((url, idx) => (
                                            <div key={url + idx} className="relative rounded overflow-hidden border p-1">
                                                <img src={url} alt={`uploaded-${idx}`} className="w-28 h-28 object-cover" />
                                                <button
                                                    onClick={() => handleRemoveUploaded(idx)}
                                                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                                                    title="Remove uploaded"
                                                >
                                                    <XIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 mt-4">
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading || files.length === 0}
                                    className="px-4 py-2 rounded-xl shadow-md bg-[#E8A314] text-white disabled:opacity-60"
                                >
                                    {uploading ? "Uploading..." : "Upload"}
                                </button>

                                <button
                                    onClick={() => {
                                        setFiles([]);
                                        setPreviews([]);
                                    }}
                                    className="px-4 py-2 rounded-xl border"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        {/* QR Code */}
                        {/* <div className="bg-[#E8F5E9] rounded-xl p-6 text-center">
              <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="text-[#2D7A3E] text-xs">QR Code Preview</div>
              </div>
              <p className="text-[#666666] text-sm mb-4">QR Code generated automatically</p>
              <button className="px-6 py-2 bg-white border-2 border-[#2D7A3E] text-[#2D7A3E] rounded-lg hover:bg-[#E8F5E9] transition-all">
                Download QR
              </button> 
            </div> */}
                    </div>
                )}

                {/* Step 3: Location */}
                {step === 3 && (
                    <div className="space-y-6" style={{ animation: 'fadeInUp 300ms ease-out' }}>
                        <h2 className="text-[#0F1419]">Location & Harvest Details</h2>

                        {/* Map Picker */}
                        {/* <div>
                            <label className="block text-[#0F1419] text-sm mb-2">Farm Location</label>
                            <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center mb-3">
                                <div className="text-center">
                                    <MapPin className="w-12 h-12 text-[#2D7A3E] mx-auto mb-2" />
                                    <p className="text-[#666666]">Interactive map would appear here</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#2D7A3E] text-white rounded-lg hover:bg-[#236630] transition-all">
                                <MapPin className="w-4 h-4" />
                                Use Current Location
                            </button>
                        </div> */}

                        {/* Address Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Village / Town */}
                            <div>
                                <label className="block text-[#0F1419] text-sm mb-2">Village/Town</label>
                                <input
                                    type="text"
                                    placeholder="Enter village/town"
                                    value={formData.location.village}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            location: { ...formData.location, village: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:border-[#2D7A3E] focus:ring-2 
                       focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                />
                            </div>

                            {/* District */}
                            <div>
                                <label className="block text-[#0F1419] text-sm mb-2">District</label>
                                <input
                                    type="text"
                                    placeholder="Enter district"
                                    value={formData.location.district}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            location: { ...formData.location, district: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:border-[#2D7A3E] focus:ring-2 
                       focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label className="block text-[#0F1419] text-sm mb-2">State</label>
                                <input
                                    type="text"
                                    placeholder="Enter state"
                                    value={formData.location.state}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            location: { ...formData.location, state: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:border-[#2D7A3E] focus:ring-2 
                       focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                />
                            </div>

                            {/* PIN Code */}
                            <div>
                                <label className="block text-[#0F1419] text-sm mb-2">PIN Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter PIN code"
                                    value={formData.location.pin}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            location: { ...formData.location, pin: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:border-[#2D7A3E] focus:ring-2 
                       focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                />
                            </div>

                        </div>
                    </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                    <div className="space-y-6" style={{ animation: 'fadeInUp 300ms ease-out' }}>
                        <h2 className="text-[#0F1419]">Review & Confirm</h2>

                        <div className="space-y-4">
                            {/* Summary Cards */}
                            {[
                                { label: 'Crop Type', value: formData.cropType || 'Not specified' },
                                { label: 'Quantity', value: `${formData.quantity || '0'} ${formData.unit}` },
                                { label: 'Quality', value: formData.quality || 'Not specified' },
                                { label: 'Price', value: `₹${formData.price || '0'}/${formData.unit}` },
                                { label: 'Harvest Date', value: formData.harvestDate || 'Not specified' },
                            ].map((item, index) => (
                                <div
                                    key={item.label}
                                    className="flex justify-between items-center p-4 bg-[#F5F5F5] rounded-lg"
                                    style={{ animation: `slideInLeft 300ms ease-out ${index * 100}ms both` }}
                                >
                                    <div>
                                        <div className="text-[#666666] text-sm">{item.label}</div>
                                        <div className="text-[#0F1419]">{item.value}</div>
                                    </div>
                                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Confirmation Checkbox */}
                        <label className="flex items-start gap-3 p-4 border-2 border-[#2D7A3E] rounded-lg cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 text-[#2D7A3E] rounded mt-0.5" />
                            <span className="text-[#0F1419]">I confirm all information is accurate</span>
                        </label>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                    {step > 1 && (
                        <button
                            onClick={handlePrevious}
                            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Previous
                        </button>
                    )}
                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#E8A314] text-white rounded-lg hover:bg-[#D49014] hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Next
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-6 py-3 bg-[#E8A314] text-white rounded-lg hover:bg-[#D49014] hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Create Batch
                        </button>
                    )}
                </div>
            </div>

            {/* Success Modal 
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div
                        className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
                        style={{ animation: 'scaleUp 300ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                    >
                        <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-[#0F1419] mb-2">Batch Created Successfully!</h2>
                        <p className="text-[#666666] mb-6">Your batch is live on marketplace</p>
                        <div className="bg-[#E8F5E9] rounded-lg p-3 mb-6">
                            <p className="text-[#666666] text-sm mb-1">Batch ID</p>
                            <p className="text-[#2D7A3E]">#BTC-2025-112847</p>
                        </div>
                        <div className="space-y-2">
                            <button
                                onClick={() => {}}
                                className="w-full px-6 py-3 bg-[#2D7A3E] text-white rounded-lg hover:bg-[#236630] transition-all"
                            >
                                View Batch
                            </button>
                            <button
                                onClick={}
                                className="w-full px-6 py-3 border-2 border-[#E8A314] text-[#E8A314] rounded-lg hover:bg-[#FFF8E1] transition-all"
                            >
                                Add Another
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}

import cloudinary from "../utils/Cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadImages = async (req, res) => {
	try {
		if (!req.files || req.files.length === 0) {
			return res.status(400).json(new ApiError(400, "No files uploaded"));
		}

		const uploadedUrls = [];

		// Upload each file to Cloudinary
		for (const file of req.files) {
			const result = await cloudinary.v2.uploader.upload(file.path, {
				folder: "batches",
			});

			uploadedUrls.push(result.secure_url);
		}

		return res.json(
			new ApiResponse(200, "Files uploaded successfully", {
				urls: uploadedUrls,
			})
		);
	} catch (err) {
		console.error("Cloudinary upload error:", err);
		return res
			.status(500)
			.json(new ApiError(500, "Upload failed", err.message));
	}
};

export { uploadImages };

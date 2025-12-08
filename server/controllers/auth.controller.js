import { User } from "../models/user.model.js";
import { Farmer } from "../models/farmer.model.js";
import { Distributor } from "../models/distributor.model.js";
import { Retailer } from "../models/retailer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
	try {
        // log
		const user = await User.findById(userId);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(500, "Something went wrong while generating tokens");
	}
};

// http://localhost:8000/api/auth/login
const loginUser = async (req, res) => {
    try {

        console.log("login triggered")
        const { email, password } = req.body;
        console.log("Received login request:", { email, password });
        if (!email || !password)
            return res.status(400).json(new ApiError(400, "All fields are required"));

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect)
            return res.status(401).json(new ApiError(401, "Invalid password"));

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
            user._id
        );
        console.log("Generated tokens:", { accessToken, refreshToken });

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        console.log("Logged in user:", loggedInUser);

        const options = {
            secure: true,
            httpOnly: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                }, "User logged in successfully")
            );
    } catch (error) {
        console.log(error)
        return res
            .status(error.statusCode || 500)
            .json(new ApiError(error.statusCode || 500, error.message));
    }
};

// // https://localhost:8000/api/auth/logout
// const logoutUser = async (req, res) => {
//     console.log("Received logout request:", req.user);
//     await User.findByIdAndUpdate(req.user._id, { new: true });
//     const options = { secure: true, httpOnly: true, sameSite: "none" };
//     return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options)
//       .json(new ApiResponse(200, {}, "User logged out successfully"));
// };

const logoutUser = (async (req, res) => {
    // 1. Check if req.user exists before accessing ._id
    if (req.user?._id) {
        // Optional: clear the refresh token in DB if you are using one
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: { refreshToken: 1 } // Actually remove the token
            },
            {
                new: true
            }
        );
    }

    // 2. Clear cookies regardless of whether we found the user in DB
    const options = {
        httpOnly: true,
        secure: true, // Set to false if testing on localhost HTTP (not HTTPS)
        sameSite: "none" // Set to "lax" if testing on localhost HTTP
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});
// https://localhost:8000/api/auth/registerFarmer
const registerFarmer = async (req, res) => {
    try {
        const { name, email, password,aadharNumber,phone,role,farmLocation,farmName,crops,govtId} = req.body;

        if (!name || !email || !password || !phone || !role || !aadharNumber) {
            return res
                .status(400)
                .json(new ApiError(400, "All fields are required"));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json(new ApiError(409, "Email already exists"));
        }

        const newUser = await User.create({
            name,
            email,
            password,
            phone,
            aadharNumber,
            role
        });

        const newFarmer = await Farmer.create({
            userId: newUser._id,
            farmLocation,
            farmName,
            crops,
            govtId
        });

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newUser._id);

        const safeUser = await User.findById(newUser._id).select(
            "-password -refreshToken"
        );

        const options = {
            secure: true,
            httpOnly: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
        };

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    201,
                    { 
                        user: safeUser , 
                        farmer: newFarmer,
                        accessToken,
                        refreshToken
                    },
                    "User registered successfully"
                )
            );
    } catch (error) {
        console.log(error)
        return res
            .status(error.statusCode || 500)
            .json(new ApiError(error.statusCode || 500, error.message));
    }
};

// https://localhost:8000/api/auth/registerBuyer
const registerBuyer = async (req, res) => {
    try {
        console.log(req.body, "registerBuyer")
        const { name, email, password, phone, aadharNumber,role,gstNumber,panNumber,tradeLicenseNumber,businessName,warehouseAddress,storeName,storeAddress} = req.body;

        if (!name || !email || !password || !phone || !role || !gstNumber || !panNumber || !tradeLicenseNumber) {
            return res
                .status(400)
                .json(new ApiError(400, "All fields are required"));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json(new ApiError(409, "Email already exists"));
        }

        const newUser = await User.create({
            name,
            email,
            password,
            phone,
            aadharNumber,
            role,
        });
        let roledUser = null;
        if (role === "Distributor") {
            const newDistributor = await Distributor.create({
                userId: newUser._id,
                gstNumber,
                panNumber,
                tradeLicenseNumber,
                businessName,
                warehouseAddress,
            });
            roledUser = newDistributor;
        }else if(role === "Retailer"){
            const newRetailer = await Retailer.create({
                userId: newUser._id,
                gstNumber,
                panNumber,
                tradeLicenseNumber,
                storeName,
                storeAddress,
            });
            roledUser = newRetailer;
        }
        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(newUser._id);

        const safeUser = await User.findById(newUser._id).select(
            "-password -refreshToken"
        );

        const options = {
            secure: true,
            httpOnly: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
        };

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    201,
                    { 
                        user: safeUser, 
                        roledUser,
                        accessToken,
                        refreshToken
                    },
                    "User registered successfully"
                )
            );
    } catch (error) {
        console.log(error)
        return res
            .status(error.statusCode || 500)
            .json(new ApiError(error.statusCode || 500, error.message));
    }
}


export { loginUser,logoutUser,registerFarmer,registerBuyer};

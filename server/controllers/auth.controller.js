import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(500, "Something went wrong while generating tokens");
	}
};

// https://localhost:8000/api/auth/login
const loginUser = async (req, res) => {
	const { email, password } = req.body;
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
			new ApiResponse(200, { user: profile }, "User logged in successfully")
		);
};

// https://localhost:8000/api/auth/logout
const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });
    const options = { secure: true, httpOnly: true, sameSite: "none" };
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
};

// https://localhost:8000/api/auth/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password,aadharNumber} = req.body;

        if (!name || !email || !password) {
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
            password
        });

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
                    { user: safeUser },
                    "User registered successfully"
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(new ApiError(error.statusCode || 500, error.message));
    }
};


export { loginUser,logoutUser,registerUser};

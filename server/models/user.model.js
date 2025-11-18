import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, unique: true, sparse: true },
		phone: { type: String, unique: true, sparse: true },
		password: { type: String, required: true },
		aadharNumber: { type: String, unique: true, sparse: true },
		role: {
			type: String,
			enum: ["Farmer", "Distributor", "Retailer", "Admin","Consumer"],
			required: true,
		},
		isActive: { type: Boolean, default: true },
		lastLogin: Date,
		blockchain: {
			walletAddress: { type: String, unique: true, sparse: true },
			publicKey: { type: String },
			walletType: {
				type: String,
				enum: ["metamask", "walletconnect", "privkey", "none"],
				default: "none",
			},
			isWalletVerified: { type: Boolean, default: false },
		},
	},
	{ timestamps: true }
);

// Hash on create/save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Hash on findOneAndUpdate if password is changed
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update?.password) {
    update.password = await bcrypt.hash(update.password, 10);
    this.setUpdate(update);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			name: `${this.firstName} ${this.lastName}`,
			role: this.role,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15d" }
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "30d",
	});
};

export const User = mongoose.model("User", userSchema);

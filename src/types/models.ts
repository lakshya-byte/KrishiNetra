export type ID = string;

export interface BlockchainInfo {
    walletAddress?: string;
    publicKey?: string;
    walletType?: "metamask" | "walletconnect" | "privkey" | "none";
    isWalletVerified?: boolean;
}

export interface User {
    _id?: ID;
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    aadharNumber?: string;

    role?: "Farmer" | "Distributor" | "Retailer" | "Admin" | "Consumer";

    isActive?: boolean;
    lastLogin?: string;

    blockchain?: BlockchainInfo;

    createdAt?: string;
    updatedAt?: string;
}

// FARMER
export interface FarmLocation {
    lat?: number;
    lng?: number;
    address?: string;
    landSize?: number;
}

export interface Farmer {
    _id?: ID;
    userId?: ID;

    farmName?: string;
    farmLocation?: FarmLocation[];

    crops?: string[];
    govtId?: string;
    certifications?: string[];
    batches?: ID[];

    createdAt?: string;
    updatedAt?: string;
}

// DISTRIBUTOR
export interface VerificationStatus {
    aadhar?: boolean;
    pan?: boolean;
    gst?: boolean;
    tradeLicense?: boolean;
}

export interface Distributor {
    _id?: ID;
    userId?: ID;

    gstNumber?: string;
    panNumber?: string;
    tradeLicenseNumber?: string;

    businessName?: string;
    warehouseAddress?: string;

    verificationStatus?: VerificationStatus;

    ownedBatches?: ID[];

    createdAt?: string;
    updatedAt?: string;
}

// RETAILER
export interface Retailer {
    _id?: ID;
    userId?: ID;

    gstNumber?: string;
    panNumber?: string;
    tradeLicenseNumber?: string;

    storeName?: string;
    storeAddress?: string;

    verificationStatus?: VerificationStatus;

    ownedBatches?: ID[];

    createdAt?: string;
    updatedAt?: string;
}

// BATCH
export interface ImageFile {
    name?: string;
    desc?: string;
    url?: string;
}

export interface DocumentFile {
    name?: string;
    desc?: string;
    url?: string;
}

export interface TradeHistoryEntry {
    owner?: ID;
    pricePerKg?: number;
    updatedAt?: string;
}

export interface BidEntry {
    distributorId?: ID;
    bidPricePerKg?: number;
    bidDate?: string;
}

export interface BiddingInfo {
    status?: "Open" | "Closed";
    closingDate?: string;
    bids?: BidEntry[];
    biddingWinner?: ID;
}

export interface RetailOrderEntry {
    retailerId?: ID;
    quantityBought?: number;
    pricePerKg?: number;
    purchaseDate?: string;
}

export interface AdditionalDetails {
    moistureContent?: number;
    purity?: number;
    grade?: string;
}

export interface RatingDistribution {
    1?: number;
    2?: number;
    3?: number;
    4?: number;
    5?: number;
}

export interface Rating {
    overall?: number;
    distribution?: RatingDistribution;
}

export interface Batch {
    _id?: ID;

    batchId?: string;
    farmerId?: ID;

    cropType?: string;
    quantity?: number;
    pricePerKg?: number;
    harvestDate?: string;
    location?: string;

    images?: ImageFile[];
    documents?: DocumentFile[];

    status?: "Created"
        | "Listed"
        | "Bidding"
        | "InTransaction"
        | "SoldToDistributor"
        | "ListedForRetailers"
        | "Finished";

    tradeHistory?: TradeHistoryEntry[];

    bidding?: BiddingInfo;

    availableQuantity?: number;

    retailOrders?: RetailOrderEntry[];

    expiryDate?: string;

    additionalDetails?: AdditionalDetails;

    rating?: Rating;

    createdAt?: string;
    updatedAt?: string;
}

// DISPUTE
export interface DisputeFile {
    name?: string;
    desc?: string;
    url?: string;
}

export interface Dispute {
    _id?: ID;

    raisedBy?: ID;
    againstUser?: ID;
    batchId?: ID;

    title?: string;
    description?: string;

    files?: DisputeFile[];

    status?: "Pending" | "In-Review" | "Assigned" | "Resolved" | "Rejected";

    assignedTo?: ID;

    resolutionComment?: string;
    resolutionDate?: string;
    resolvedBy?: ID;

    createdAt?: string;
    updatedAt?: string;
}

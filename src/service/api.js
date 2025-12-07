// import axios from "axios
import axios from "axios";

export const Host = "http://localhost:8000/api";

export const USER_ROUTE = "/user";
export const AUTH_ROUTE = "/auth";
export const FARMER_ROUTE="/farmer";
export const DISTRIBUTOR_ROUTE = "/distributor";
export const RETAILER_ROUTE = "/retailer";


// USER
export const POST_CREATE_DISPUTE = `${USER_ROUTE}/create-dispute`;
export const GET_MY_DISPUTES = `${USER_ROUTE}/my-disputes`;
export const GET_ME = `${USER_ROUTE}/me`;

// AUTH
export const POST_LOGIN = `${AUTH_ROUTE}/login`
export const GET_LOGOUT = `${AUTH_ROUTE}/logout`;
export const POST_REGISTER_FARMER = `${AUTH_ROUTE}/registerFarmer`;
export const POST_REGISTER_BUYER = `${AUTH_ROUTE}/registerBuyer`;

// FARMER
export const POST_CREATE_BATCH = `${FARMER_ROUTE}/create-batch`;
export const GET_FARMER_BATCHES = `${FARMER_ROUTE}/get-my-batches`;
export const POST_ENLIST_BATCH = `${FARMER_ROUTE}/enlist-batch`;
export const POST_START_BIDDING = `${FARMER_ROUTE}/start-bidding`;
export const POST_STOP_BIDDING = `${FARMER_ROUTE}/stop-bidding`;
export const POST_COMPLETE_TRANSACTION = `${FARMER_ROUTE}/complete-transaction`;
export const POST_UPDATE_BATCH = `${FARMER_ROUTE}/update-batch`;

// DISTRIBUTOR
export const GET_ALL_BATCHES = `${DISTRIBUTOR_ROUTE}/all-batches`;
export const GET_BATCH_BY_ID = `${DISTRIBUTOR_ROUTE}/batch`;
export const GET_DISTRIBUTOR_BATCHES = `${DISTRIBUTOR_ROUTE}/my-batches`;
export const POST_PLACE_BID = `${DISTRIBUTOR_ROUTE}/place-bid`;
export const POST_ENLIST_FOR_RETAILER = `${DISTRIBUTOR_ROUTE}/enlist-for-retailers`

// RETAILER
export const GET_ALL_LISTED_BATCHES = `${DISTRIBUTOR_ROUTE}/all-listed-batches`
export const POST_BUY_LOT = `${DISTRIBUTOR_ROUTE}/buy-lot`
export const GET_RETAILER_BATCHES = `${DISTRIBUTOR_ROUTE}/my-batches`;
export const GET_ORDER_HISTORY = `${DISTRIBUTOR_ROUTE}/order-history`;

export const apiClient = axios.create({
  baseURL: Host,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
});

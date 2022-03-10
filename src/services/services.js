import ApiCall from "./ApiCall";
import * as action from "./actions";

export const userPendingPayment = (locality, houseNumber, phoneNumber) =>
  ApiCall(
    action.GET,
    `users/payment?locality=${locality}&hno=${houseNumber}&phn=${phoneNumber}`
  );

// Token API
export const getToken = (data) => ApiCall(action.POST, "token/", data);

// Locality API
export const getAllLocality = () => ApiCall(action.GET, "locality/");
export const getAllLocalities = () => ApiCall(action.GET, "list/locality/");
export const getLocality = (id) => ApiCall(action.GET, `locality/${id}/`);
export const addLocality = (data) => ApiCall(action.POST, "locality/", data);
export const editLocality = (id, data) =>
  ApiCall(action.PUT, `locality/${id}/`, data);

// Category API
export const getAllCategory = () => ApiCall(action.GET, "category/");
export const getCategory = (id) => ApiCall(action.GET, `category/${id}/`);
export const addCategory = (data) => ApiCall(action.POST, "category/", data);
export const editCategory = (id, data) =>
  ApiCall(action.PUT, `category/${id}/`, data);

// Product API
export const getAllProduct = () => ApiCall(action.GET, "product/");
export const getAllListProducts = () => ApiCall(action.GET, "list/product/");
export const getProduct = (id) => ApiCall(action.GET, `product/${id}/`);
export const addProduct = (data) => ApiCall(action.POST, "product/", data);
export const editProduct = (id, data) =>
  ApiCall(action.PUT, `product/${id}/`, data);

// User API
export const getAllUser = () => ApiCall(action.GET, "user/");
export const getAllListUsers = () => ApiCall(action.GET, "list/user/");
export const getUser = (userId) => ApiCall(action.GET, `user/${userId}/`);
export const getUserDetails = () => ApiCall(action.GET, "get/user/");
export const searchUser = (search) =>
  ApiCall(action.GET, `user/?search=${search}`);
export const filterUserByLocality = (locality) =>
  ApiCall(action.GET, `user/?locality=${locality}`);
export const addUser = (data) => ApiCall(action.POST, "user/", data);
export const updateUser = (userId, data) =>
  ApiCall(action.PATCH, `user/${userId}/`, data);

// Sale API
export const getAllSale = () => ApiCall(action.GET, "sale/");
export const getSale = (id) => ApiCall(action.GET, `sale/${id}/`);
export const getSalePerMonth = (month, year) =>
  ApiCall(action.GET, `get/sale-per-user/${month}/${year}/`);
export const addSale = (data) => ApiCall(action.POST, "sale/", data);
export const editSale = (id, data) => ApiCall(action.PUT, `sale/${id}/`, data);
export const deleteSale = (id) => ApiCall(action.DELETE, `sale/${id}/`);
export const addRecurringSale = () =>
  ApiCall(action.POST, "add/sale/recurring_product/");

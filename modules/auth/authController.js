import APIResponse from "../../common/utils/apiResponse.js";
import * as authService from "./authService.js";
const register = async (req, res, next) => {
  const user = await authService.register(req.body);
  APIResponse.created(res, "User registered successfully", {
    id: user.id,
    name: user.first_name + " " + user.last_name,
    email: user.email,
  });
};

const login = async (req, res) => {
  const { user, token } = await authService.login(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });
  APIResponse.ok(res, "Login successful", {
    ...user,
    token,
  });
};
const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });
  APIResponse.ok(res, "Logout successful");
};
const getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);
  APIResponse.ok(res, "User details fetched successfully", user);
};

//admin
const fetchAllUsers = async (req, res) => {
  const users = await authService.getAllUsers();
  APIResponse.ok(res, "Users fetched successfully", users);
};
const getOneUser = async (req, res) => {
  const userId = req.params.id;
  const user = await authService.getUserById(userId);
  APIResponse.ok(res, "User details fetched successfully", user);
};
const removeUser = async (req, res) => {
  const userId = req.params.id;
  const user = await authService.deleteUser(userId);
  APIResponse.ok(res, "User deleted successfully", user);
};
export {
  register,
  login,
  getMe,
  logout,
  fetchAllUsers,
  getOneUser,
  removeUser,
};

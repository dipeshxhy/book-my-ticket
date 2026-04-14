import APIResponse from "../../common/utils/apiRespnse.js";
import * as authService from "./authService.js";
const register = async (req, res) => {
  const user = await authService.register(req.body);
  APIResponse.created(res, "User registered successfully", {
    id: user.id,
    name: user.name,
    email: user.email,
  });
};

const login = async (req, res) => {
  const { user, token } = await authService.login(req.body);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  APIResponse.ok(res, "Login successful", { ...user, token });
};
const getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);
  APIResponse.ok(res, "User details fetched successfully", user);
};
export { register, login, getMe };

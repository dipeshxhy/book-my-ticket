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
export { register };

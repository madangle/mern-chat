import axios from "axios";
import type { UserLogin, UserRegister } from "../Types/user";

export const login = (payload: UserLogin) => axios.post("/api/users/login", payload);

export const register = (payload: UserRegister) => axios.post("/api/users/login", payload)

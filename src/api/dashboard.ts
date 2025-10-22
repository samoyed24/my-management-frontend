import { SignUpData } from "types/dashboard";
import request from "./wrapper";

export function postSignUp() {
    return request.post<SignUpData>('/api/signUp')
}
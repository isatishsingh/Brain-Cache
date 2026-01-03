import { useRef } from "react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function Signin() {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
 

    async function signin() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/user/api/v1/signin", {
            email,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={emailRef} placeHolder="Email" />
            <Input reference={passwordRef} placeHolder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
            </div>
        </div>
    </div>
}
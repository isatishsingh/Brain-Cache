import { useRef } from "react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";


export function Signup() {
    const navigate = useNavigate();
    const firstNameRef = useRef<HTMLInputElement>();
    const lastNameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    async function signup() {
        console.log("bwhvevvecjew");
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/user/api/v1/signup", {
            firstName,
            lastName,
            email,
            password
        })
        navigate("/signin")
        alert("You have signed up!")
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={firstNameRef} placeHolder="First Name" />
            <Input reference={lastNameRef} placeHolder="Last Name" />
            <Input reference={emailRef} placeHolder="Email" />
            <Input reference={passwordRef}placeHolder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signup} variant="primary" loading={false} text="Signup" fullWidth={true} />
            </div>
        </div>
    </div>
}
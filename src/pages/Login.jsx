import { useContext, useEffect } from "react";
import { FaYoutube } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Context } from "../context/contextApi";
import { useNavigate } from "react-router-dom";



const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/')
    }, [])

    const { googleSignIn } = useContext(Context);
    return (
        <div className="w-full h-full  text-white flex justify-center  ">
            <div className=" mt-[5rem]  ">
                <div className="flex items-center gap-5 justify-center   ">
                    <FaYoutube className="text-6xl" />
                    <p className="text-4xl font-bold tracking-wider">YOUTUBE</p>
                </div>

                <div className="flex items-center  bg-slate-700 rounded-lg  cursor-pointer mt-10 justify-center lg:gap-5 gap-3 tracking-wider py-1 max-[300px]:w-[250px] max-[400px]:w-[300px] w-[400px] select-none" onClick={googleSignIn}>
                    <FcGoogle className="text-4xl lg:text-5xl" />
                    <p className="md:text-[1.6rem] font-bold text-[1rem]" >Sign in with Google</p>
                </div>
            </div>
        </div>
    )
}

export default Login

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { toast } from "react-toastify";
import { axiosAPI } from '../api/axiosAPI';
import { login as authLogin } from '../store/authSlice';
import './AuthForm.css';

function LoginForm() {



    const authstatus = useSelector((state) => state.auth.status)
    const userStoreData = useSelector((state) => state.auth.userData)
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if(userStoreData?.user.role === "admin"){
            navigate("/dashboard")
        }else if(userStoreData?.user.role === "user"){
            navigate("/user")
        }
    }, [authstatus])

    const loginUser = async(data) => {
        setLoading(true)
        try{
            
            const response = await axiosAPI.post('/users/login', data)
            console.log(response.data);

            if(response.data.data) dispatch(authLogin(response.data.data));
            setLoading(false)
            toast.success("LoggedIn");
            
            
        }catch(err){
            console.log(err.response.data);
            toast.error("Login Failed, Try Again");

        }
    }




    return (
        <div className="bg-gray-50 flex flex-col gap-3 justify-center border border-gray-300 border-solid  pt-16 rounded-lg shadow-lg align-middle min-w-96 w-1/3 h-fit">
            <h1 className="text-black font-bold text-4xl">Login</h1>
            
            
            <div className="py-8 px-8">
            <form  className="flex flex-col gap-3" onSubmit={handleSubmit(loginUser)}>
                <div className="flex flex-col">
                    <label className="text-gray-500 font-medium text-left"
                    htmlFor="email">Email
                    </label>
                    <input className= 'p-2 rounded-lg border-gray-300 border-solid border text-base hover:bg-gray-100 focus:bg-gray-100 outline-gray-300'
                        {...register('email')}
                        type="email"  />
                    
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-500 font-medium text-left"
                    htmlFor="password">Password
                    </label>
                    <input className= 'p-2 rounded-lg border-gray-300 border-solid border text-base hover:bg-gray-100 focus:bg-gray-100 outline-gray-300'
                        {...register('password')}
                        type="password"  />
                    
                </div>
                <input className="p-3 rounded-lg text-white font-medium text-xl bg-zinc-800 drop-shadow-md my-4 hover:bg-black focus:bg-black focus:shadow-xl"

                    type="submit"
                    value="Login" />
            </form>
            <p>Not registered yet? then <Link to="/signup" className='font-bold'>Register</Link></p>
            </div>
            {loading && <BarLoader width={"100%"}/>}
            {!loading && <div className="h-1"></div>}

        </div>
    );
}

export default LoginForm;
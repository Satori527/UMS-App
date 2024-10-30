
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { axiosAPI } from '../api/axiosAPI';
import './AuthForm.css';

//const phoneRegExp = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

// const schema = z.object({
//     firstName: z.string(),
//     lastName: z.string(),
//     email: z.string().email({message: "Email is not valid"}),
//     password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
//     address: z.string(),
//     phone: z.string().regex(phoneRegExp, {message: "Phone number is not valid"}
//     )

// })

function SignupForm() {



    // console.log(schema.parse({
    //     firstName: "sdf",
    //     lastName: "sdf",
    //     email: "sdf",
    //     password: "sdf",
    //     address: "sdf",
    //     phone: "sdf"
    // }))

    const {register, handleSubmit,formState: {errors}} = useForm({
        
    })

    // const validateObj = (obj) => {
    //     const parsed = schema.safeParse(obj);
    
    //     if (parsed.success) {
    //       return parsed.data;
    //     } else {
    //       const fieldErrors = parsed.error.flatten().fieldErrors;
    
    //       for (const field in fieldErrors) {
    //         delete obj[field];
    //       }
    //       return obj;
    //     }
    //   }
    

    const navigate = useNavigate()

    const createUser = async(data) => {

        // const safeData = schema.safeParse(data)
        // if(safeData.success===false){
        //     console.log(safeData.error);
            
        // }
        //console.log(safeData);
        try{
            const response = await axiosAPI.post('/users/register',data)
            console.log(response.data);

            if(response.status === 201){
                toast.success("SignUp Successful");
                navigate("/")
            }

            
        }catch(err){
            console.log(err);
            toast.error("SignUp Failed");
        }
    }

    return (
        <div className="bg-gray-50 flex flex-col gap-3 justify-center border border-gray-300 border-solid px-8 pb-2 pt-8 rounded-xl shadow-lg align-middle min-w-[32rem] w-2/5 h-fit">
            <h1 className="text-black font-bold text-4xl">SignUp</h1>
            
            
            <div className="py-6 ">
            <form  className="flex flex-col gap-3" onSubmit={handleSubmit(createUser)}>
                <div className="flex flex-row gap-2 justify-evenly">
                    <div className="flex flex-col w-1/2">
                        <label className="text-gray-500 font-medium text-left "
                            htmlFor="name">First Name
                        </label>
                        <input className = 'w-full p-2 rounded-lg border-gray-300 border-solid border text-base hover:bg-gray-100 focus:bg-gray-100 outline-gray-300'
                            {...register('firstName',{
                                required: {value: true, message: "First Name is required"}
                            })}
                            type="text" />
                        {errors.firstName && <p className='text-red-500 text-sm font-medium text-left px-4'>{errors.firstName.message}</p>}
                    </div>
                    
                    <div className="flex flex-col w-1/2">
                        <label className="text-gray-500 font-medium text-left"
                            htmlFor="name">Last Name
                        </label>
                        <input className = 'p-2 rounded-lg border-gray-300 border-solid border text-base hover:bg-gray-100 focus:bg-gray-100 outline-gray-300'
                            {...register('lastName',{
                                required: {value: true, message: "Last Name is required"}
                            })}
                            type="text" />
                        {errors.lastName && <p className='text-red-500 text-sm font-medium text-left px-4'>{errors.lastName.message}</p>}
                    </div>
                </div>
                
                <div className="flex flex-col">
                    <label className="text-gray-500 font-medium text-left"
                    htmlFor="email">Email
                    </label>
                    <input className= 'p-2 rounded-lg border-gray-300 border-solid border text-base hover:bg-gray-100 focus:bg-gray-100 outline-gray-300'
                        {...register('email',{
                            required: {value: true, message: "Email is required"},pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Email is not valid"}
                        })}
                        type="email"  />
                        {errors.email && <p className='text-red-500 text-sm font-medium text-left px-4'>{errors.email.message}</p>}
                    
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-500 font-medium text-left"
                    htmlFor="password">Password
                    </label>
                    <input className= 'p-2 rounded-lg border-gray-300 border-solid border text-base hover:bg-gray-100 focus:bg-gray-100 outline-gray-300'
                        {...register('password',{
                            required: {value: true, message: "Password is required"},pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password is not valid, must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"}
                        })}
                        type="password"
                        />
                    {errors.password && <p className='text-red-500 text-sm font-medium text-left px-4'>{errors.password.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-500 font-medium text-left"
                        htmlFor="name">Phone
                    </label>
                    <input className = 'p-2 rounded-lg border-gray-300 border-solid border text-base hover:bg-gray-100 focus:bg-gray-100 outline-gray-300'
                        {...register('phone',{
                            required: {value: true, message: "Phone is required"},pattern: {value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, message: "Phone is not valid"}
                        })}
                        type="text" />
                    {errors.phone && <p className='text-red-500 text-sm font-medium text-left px-4'>{errors.phone.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-500 font-medium text-left"
                        htmlFor="name">Address
                    </label>
                    <input className = 'p-2 rounded-lg border-gray-300 border-solid border text-base hover:bg-gray-100 focus:bg-gray-100 outline-gray-300'
                        {...register('address',{
                            required: {value: true, message: "Address is required"}
                        })}
                        type="text" />
                    {errors.address && <p className='text-red-500 text-sm font-medium text-left px-4'>{errors.address.message}</p>}
                </div>
                <input className="p-3 rounded-lg text-white font-medium text-xl bg-zinc-800 drop-shadow-md my-4 hover:bg-black focus:bg-black focus:shadow-xl"

                    type="submit"
                    value="Submit" />
            </form>
            </div>
            
        </div>
    )
}

export default SignupForm;


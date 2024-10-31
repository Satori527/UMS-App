/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiHome, CiMail, CiPhone } from 'react-icons/ci';
import { IoPersonAdd } from "react-icons/io5";
import { BarLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { axiosAPI } from '../../api/axiosAPI';
import "./CustomCard.css";

function CreateUserCard({ setCreate, fetchUsers, setPage, create}) {

    //const [display, setDisplay] = useState("flex");
    
    // const [sFirstName, setSFirstName] = useState("");
    // const [sLastName, setSLastName] = useState("");
    // const [sEmail, setSEmail] = useState("");
    // const [sPhone, setSPhone] = useState("");
    // const [sAddress, setSAddress] = useState("");
    // const [sRole, setSRole] = useState("user");

    const [loading, setLoading] = useState(false);

    

    // const adjustHeight = (el) => {
    //     el.target.style.height = (el.target.scrollHeight>el.target.clientHeight)?(el.target.scrollHeight) + 'px':"60px";
    // }
    const {register, handleSubmit,formState: {errors},reset} = useForm({})


    const handleCreate = async (data) => {
        setLoading(true);
        if (!data) {
            return;
        }
        // const data={
        //     firstName: sFirstName,
        //     lastName: sLastName,
        //     email: sEmail,
        //     phone: sPhone,
        //     address: sAddress,
        //     role: sRole
        // }
        console.log(data);
        try {
                    const response = await axiosAPI.post("/users/create", data)
                    if (response.status === 200) {
                        setCreate(false);
                        setPage(1);
                        fetchUsers();
                        setLoading(false);
                        toast.success("User created successfully");
                    }
                    console.log(response);
                    

        } catch (error) {
            console.log(error);
            toast.error("User creation failed");
        }
        
    }

    useEffect(() => {
        reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [create])

    return (
        <div className="expanded card" style={{  width: '90%', margin: '0 auto',border: '1px solid #707070',display: "flex", flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '24px',boxShadow: '2px 4px 4px 2px rgba(0, 0, 0, 0.2)', padding: '24px' }}>

            <form onSubmit={handleSubmit(handleCreate)}  style={{  width: '100%', margin: '0 auto',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '24px'}}>
                <div className='title-div flex flex-row w-full relative items-center justify-center gap-2'>
                    <IoPersonAdd className='h-8 w-8 text-black'/>
                    <h1 className='text-3xl font-medium text-center'>Create User</h1>
                </div>
                    
                <div className='top-div flex justify-between w-full items-center px-2 gap-4'>

                    
                    <div className='flex flex-col w-3/12 relative'>
                        <input className="bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg w-full whitespace-nowrap text-left border border-zinc-700 rounded-md" placeholder="First Name"  {...register("firstName", { required: { value: true, message: "First Name is required" } })}/>
                        {errors.firstName && <p className='absolute top-8 w-full text-left font-medium justify-evenly text-red-500 text-sm'>{errors.firstName && errors.firstName.message}</p>}
                    </div>
                    <div className='flex flex-col w-3/12 relative'>
                        <input className='bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg w-full whitespace-nowrap text-left border border-zinc-700 rounded-md ' placeholder="Last Name"  {...register("lastName", { required: { value: true, message: "Last Name is required" } })}/>
                        <p className='absolute top-8 w-full text-left font-medium justify-evenly text-red-500 text-sm'>{errors.lastName && errors.lastName.message}</p>
                    </div>
                    <div className='title-div flex flex-col w-4/12 relative'>
                        <div className='flex flex-row justify-start items-center gap-2 w-full'>
                            <CiMail className='h-6 w-6'/>
                            <input className='bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg w-full whitespace-nowrap text-left border border-zinc-700 rounded-md ' type="text"  placeholder="Email"  {...register('email',{
                            required: {value: true, message: "Email is required"},pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Email is not valid"}
                        })}/>
                        </div>
                        {errors.email &&<p className='absolute top-8 w-full text-left font-medium justify-evenly text-red-500 text-sm'>{errors.email && errors.email.message}</p>}
                    </div>
                    <select className='w-1/12 bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg  whitespace-nowrap text-left border border-zinc-700 rounded-md '  {...register("role", )}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                </div>

                <div className='middle-div flex flex-row justify-between w-full px-2 gap-8'>
                    <div className='flex flex-col items-center text-justify w-5/12 font-medium relative'>
                        <div className='flex flex-row justify-start items-center gap-2 w-full '>
                            <CiPhone className='h-6 w-6' />
                            <input type="text" className='bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg w-full whitespace-nowrap text-left border border-zinc-700 rounded-md ' placeholder='Phone No.' {...register('phone',{
                            required: {value: true, message: "Phone is required"},pattern: {value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, message: "Phone is not valid"}
                        })}/>
                        </div>
                        {errors.phone &&<p className='absolute top-8 w-full text-left font-medium justify-evenly text-red-500 text-sm'>{errors.phone && errors.phone.message}</p>}
                    </div>
                    
                    <div className='flex flex-col items-center text-justify w-7/12 gap-2 font-medium relative'>
                        <div className='flex flex-row justify-start items-center gap-2 w-full'>
                            <CiHome className='h-6 w-6' />
                            <input type="text"  className='bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg w-full whitespace-nowrap text-left border border-zinc-700 rounded-md '  placeholder='Address' {...register("address", { required: { value: true, message: "Address is required" } })}/>
                        </div>
                        <p className='absolute top-8 w-full text-left font-medium justify-evenly text-red-500'>{errors.address && errors.address.message}</p>

                    </div>
                    
                </div>
                <div className='bottom-div flex justify-between gap-8 w-full px-2'>

                    <div className='bottom-div flex flex-row-reverse w-full gap-8 pr-8'>
                    
                        <button className="py-[2px] px-3 text-red-500 font-medium text-lg border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                    onClick={() => setCreate(false)}
                    >Cancel</button>
                        <input className="py-[2px] px-3 text-green-500 font-medium text-lg border-2 border-green-500 rounded-lg hover:bg-green-500 hover:text-white" style={{fontWeight:'bold'}} type="submit" value="Create" />
                    </div>
                </div>
                {loading && <BarLoader width={'100%'}/>}
            </form>
        </div>
        // <div className="expanded card" style={{  width: '90%', margin: '0 auto',border: '1px solid #707070',display: "flex", flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '24px',boxShadow: '2px 4px 4px 2px rgba(0, 0, 0, 0.2)', }}>

        //     <div  style={{  width: '100%', margin: '0 auto',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '24px'}}>
            
        //     <div className='top-div flex justify-evenly w-full items-center gap-2'>
        //         <input className='w-3/5 text-left font-bold justify-evenly border border-black rounded-md' placeholder="First Name..." value={sFirstName} onChange={(e) => setSFirstName(e.target.value)}/>
        //         <input className='w-3/5 text-left font-bold justify-evenly border border-black rounded-md' placeholder="Last Name..." value={sLastName} onChange={(e) => setSLastName(e.target.value)}/>
        //         <div className='title-div flex justify-around flex-row gap-8'>
                        
        //             <input className='text-left font-bold justify-evenly border border-black rounded-md' placeholder="Email..." value={sEmail} onChange={(e) => setSEmail(e.target.value)}/>
        //         </div>
        //         <select className='w-3/5 text-left font-bold justify-evenly border border-black rounded-md' value={sRole} onChange={(e) => setSRole(e.target.value)}>
        //             <option value="user">User</option>
        //             <option value="admin">Admin</option>
        //         </select>
        //     </div>

            
            
            
        //     <div className='bottom-div flex justify-between gap-8 w-full px-2'>

        //         <input className='text-justify border border-black rounded-md' placeholder="Address..." value={sAddress} onChange={(e) => setSAddress(e.target.value)}/>
        //         <input className='text-justify border border-black rounded-md' placeholder="Phone No..." value={sPhone} onChange={(e) => setSPhone(e.target.value)}/>

                
        //     </div>
        //     <div className='bottom-div flex flex-row-reverse gap-8 w-full pr-8'>
        //             <button className='delete-btn text-yellow-500' style={{fontWeight:'bold'}} onClick={() => setCreate(false)}>Cancel</button>
        //             <button className='edit-btn text-blue-500' style={{fontWeight:'bold'}}
        //             onClick={handleCreate}
        //             >
        //             Save
        //             </button>
                    
        //         </div>
        //     </div>
        // </div>
    );
}

export default CreateUserCard
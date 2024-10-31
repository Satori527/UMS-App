/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiHome, CiMail, CiPhone } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { GrUser, GrUserAdmin } from "react-icons/gr";

import { BarLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { axiosAPI } from '../../api/axiosAPI';
import "./CustomCard.css";

function CustomCard({
    id,
    firstName,
    lastName,
    email,
    avatar,
    phone,
    address,
    role,
    fetchUsers,
}) {

    const [expanded, setExpanded] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [display, setDisplay] = useState("flex");
    
    // const [sFirstName, setSFirstName] = useState(firstName);
    // const [sLastName, setSLastName] = useState(lastName);
    // const [sEmail, setSEmail] = useState(email);
    // const [sPhone, setSPhone] = useState(phone);
    // const [sAddress, setSAddress] = useState(address);
    // const [sRole, setSRole] = useState(role);
    const [loading, setLoading] = useState(false);
    
    const {register, handleSubmit,formState: {errors},reset} = useForm({})
    

    // const adjustHeight = (el) => {
    //     el.target.style.height = (el.target.scrollHeight>el.target.clientHeight)?(el.target.scrollHeight) + 'px':"60px";
    // }

    const handleSave = async (formData) => {
        setLoading(true);
        if (!formData) {
            return;
        }
        const data = {...formData,id: id,avatar:avatar}
        try {
                    const response = await axiosAPI.patch("/users/update", data)
                    if (response.status === 100) {
                        setEditing(false);
                        fetchUsers();
                        setLoading(false);
                        toast.success("User updated successfully");
                    }
                    console.log(response);
                    console.log(id);
                    

                    
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const handleDelete = async () => {
        setDeleting(true);
        console.log("deleted");
        try {
            const response = await axiosAPI.delete("/users/delete", {
                user_id: id
            })
            if (response.status === 100) {
                setDisplay("none");
                fetchUsers();
                setDeleting(false);
                toast.success("User deleted successfully");
            }
            console.log(response);
            
        } catch (error) {
            console.log(error);
            toast.error("User deletion failed");
        }
    }

    useEffect(() => {
        reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editing])
    
    return (
        <div className={`${expanded ? 'expanded' : ''} card`} style={{  width: '90%', margin: '0 auto',border: '1px solid #aaaaaa',display: `${display}`, flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '16px',boxShadow: '2px 4px 4px 2px rgba(0, 0, 0, 0.24)', }}>
            {!editing && <div  style={{  width: '100%', margin: '0 auto',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '24px'}}>

                <div className='top-div flex justify-between w-full items-center px-2'>
                    <img className='h-12 w-12 border border-zinc-700 rounded-full' src={avatar} alt="avatar" />
                    
                    <h2 className='w-3/12 text-left font-bold justify-evenly'>{firstName} {lastName}</h2>
                    <div className='title-div flex justify-start flex-row gap-8 w-5/12'>
                        <h2 className='flex flex-row text-left justify-evenly items-center gap-2 font-medium'><CiMail className='h-6 w-6'/>{email}</h2>
                    </div>
                    <h2 className='w-2/12 max-w-20 text-left font-medium justify-evenly flex flex-row items-center gap-1'>
                        {(role === 'user') && <GrUser  />}
                        {(role === 'admin') && <GrUserAdmin className='text-red-500'/>}
                        {role.toUpperCase()}
                    </h2>
                        <label className='expand-btn-label'>
                            <input className='expand-btn' type="checkbox" checked={expanded} onChange={() => setExpanded(!expanded)} />
                        </label>
                    
                </div>
                <div className='middle-div flex flex-row justify-between w-full px-4'>
                    <p className='flex flex-row items-center text-justify w-[39%] gap-2 font-medium'><CiPhone className='h-6 w-6' />{phone}</p>
                    <p className='flex flex-row items-center text-justify w-[61%] gap-2 font-medium'><CiHome className='h-6 w-6' />{address}</p>
                    
                </div>
                <div className='bottom-div flex justify-between gap-8 w-full px-2'>

                    {!deleting && <div className='bottom-div flex flex-row-reverse gap-8 pr-8 w-full'>
                    
                    <button className="py-[2px] px-3 text-red-500 font-medium text-lg border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                    onClick={() => setDeleting(true)}
                    >Delete</button>
                    <button className="py-[2px] px-3 text-yellow-500 font-medium text-lg border-2 border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white" onClick={() => setEditing(!editing)}>Edit</button>
                    </div>}
                    {deleting && <div className='bottom-div flex flex-row-reverse gap-8 pr-8 w-full'>
                    
                    <button className="py-[2px] px-3 text-red-500 font-medium text-lg border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                    onClick={handleDelete}
                    >Delete For Sure</button>
                    <button className="py-[2px] px-3 text-blue-500 font-medium text-lg border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white" onClick={() => setDeleting(false)}>Cancel</button>
                    </div>}
                    
                </div>
                {loading && <BarLoader width={'100%'}/>}
            </div>}

            {editing && <form onSubmit={handleSubmit(handleSave)}  style={{  width: '100%', margin: '0 auto',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '24px'}}>
                <div className='title-div flex flex-row w-full relative items-center justify-center gap-2'>
                    <FaUserEdit className='h-8 w-8 text-black'/>
                    <h1 className='text-3xl font-medium text-center'>Edit User</h1>
                </div>
                <div className='top-div flex justify-between w-full items-center px-2 gap-4'>
                    <img className='h-8 w-8 border border-zinc-700 rounded-full' src={avatar} alt="avatar" />
                    
                    <div className='flex flex-col w-3/12 relative'>
                        <input className="bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg w-full whitespace-nowrap text-left border border-zinc-700 rounded-md" placeholder="First Name" defaultValue={firstName} {...register("firstName", { required: { value: true, message: "First Name is required" } })}/>
                        {errors.firstName && <p className='absolute top-8 w-full text-left font-medium justify-evenly text-red-500 text-sm'>{errors.firstName && errors.firstName.message}</p>}
                    </div>
                    <div className='flex flex-col w-3/12 relative'>
                        <input className='bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg w-full whitespace-nowrap text-left border border-zinc-700 rounded-md ' placeholder="Last Name" defaultValue={lastName} {...register("lastName", { required: { value: true, message: "Last Name is required" } })}/>
                        <p className='absolute top-8 w-full text-left font-medium justify-evenly text-red-500 text-sm'>{errors.lastName && errors.lastName.message}</p>
                    </div>
                    <div className='title-div flex flex-col w-4/12 relative'>
                        <div className='flex flex-row justify-start items-center gap-2 w-full'>
                            <CiMail className='h-6 w-6'/>
                            <input className='bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg w-full whitespace-nowrap text-left border border-zinc-700 rounded-md ' type="text"  placeholder="Email" defaultValue={email} {...register('email',{
                            required: {value: true, message: "Email is required"},pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Email is not valid"}
                        })}/>
                        </div>
                        {errors.email &&<p className='absolute top-8 w-full text-left font-medium justify-evenly text-red-500 text-sm'>{errors.email && errors.email.message}</p>}
                    </div>
                    <select className='w-1/12 bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg  whitespace-nowrap text-left border border-zinc-700 rounded-md ' defaultValue={role} {...register("role", )}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                        <label className='expand-btn-label'>
                            <input className='expand-btn' type="checkbox" checked={expanded} onChange={() => setExpanded(!expanded)} />
                        </label>
                </div>

                <div className='middle-div flex flex-row justify-between w-full px-2 gap-8'>
                    <div className='flex flex-col items-center text-justify w-5/12 font-medium relative'>
                        <div className='flex flex-row justify-start items-center gap-2 w-full '>
                            <CiPhone className='h-6 w-6' />
                            <input type="text" className='bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg w-full whitespace-nowrap text-left border border-zinc-700 rounded-md ' placeholder='Phone No.' defaultValue={phone} {...register('phone',{
                            required: {value: true, message: "Phone is required"},pattern: {value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, message: "Phone is not valid"}
                        })}/>
                        </div>
                        {errors.phone &&<p className='absolute top-8 w-full text-left font-medium justify-evenly text-red-500 text-sm'>{errors.phone && errors.phone.message}</p>}
                    </div>
                    
                    <div className='flex flex-col items-center text-justify w-7/12 gap-2 font-medium relative'>
                        <div className='flex flex-row justify-start items-center gap-2 w-full'>
                            <CiHome className='h-6 w-6' />
                            <input type="text"  className='bg-gray-100 hover:bg-gray-300 px-1 text-black font-medium text-lg w-full whitespace-nowrap text-left border border-zinc-700 rounded-md '  placeholder='Address' defaultValue={address} {...register("address", { required: { value: true, message: "Address is required" } })}/>
                        </div>
                        <p className='absolute top-8 w-full text-left font-medium justify-evenly text-red-500'>{errors.address && errors.address.message}</p>

                    </div>
                    
                </div>
                <div className='bottom-div flex justify-between gap-8 w-full px-2'>

                    <div className='bottom-div flex flex-row-reverse w-full gap-8 pr-8'>
                    
                        <button className="py-[2px] px-3 text-red-500 font-medium text-lg border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                    onClick={() => setEditing(false)}
                    >Cancel</button>
                        <input className="py-[2px] px-3 text-green-500 font-medium text-lg border-2 border-green-500 rounded-lg hover:bg-green-500 hover:text-white" type="submit" value="Save" />
                    </div>
                </div>
                {loading && <BarLoader width={'100%'}/>}
                </form>}
        </div>
    );
}

export default CustomCard
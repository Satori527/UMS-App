/* eslint-disable react/prop-types */
import { useState } from 'react';
import { CiHome, CiMail, CiPhone } from "react-icons/ci";
import { GrUser, GrUserAdmin } from "react-icons/gr";
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
    fetchUsers
}) {

    const [expanded, setExpanded] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [display, setDisplay] = useState("flex");
    
    const [sFirstName, setSFirstName] = useState(firstName);
    const [sLastName, setSLastName] = useState(lastName);
    const [sEmail, setSEmail] = useState(email);
    const [sPhone, setSPhone] = useState(phone);
    const [sAddress, setSAddress] = useState(address);
    const [sRole, setSRole] = useState(role);

    

    

    // const adjustHeight = (el) => {
    //     el.target.style.height = (el.target.scrollHeight>el.target.clientHeight)?(el.target.scrollHeight) + 'px':"60px";
    // }

    const handleSave = async () => {
        console.log("saved");
        try {
                    const response = await axiosAPI.patch("/users/update", {
                        id,
                        first_name: sFirstName,
                        last_name: sLastName,
                        email: sEmail,
                        avatar,
                        phone: sPhone,
                        address: sAddress,
                        role: sRole
                    })
                    if (response.status === 200) {
                        setEditing(false);
                        fetchUsers();
                        toast.success("User updated successfully");
                    }
                    console.log(response);
                    console.log(id);
                    

                    
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const handleDelete = async () => {
        console.log("deleted");
        try {
            const response = await axiosAPI.delete("/users/delete", {
                user_id: id
            })
            if (response.status === 200) {
                setDisplay("none");
                fetchUsers();
                toast.success("User deleted successfully");
            }
            console.log(response);
            
        } catch (error) {
            console.log(error);
            toast.error("User deletion failed");
        }
    }
    
    return (
        <div className={`${expanded ? 'expanded' : ''} card`} style={{  width: '90%', margin: '0 auto',border: '1px solid #aaaaaa',display: `${display}`, flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '16px',boxShadow: '2px 4px 4px 2px rgba(0, 0, 0, 0.24)', }}>
            {!editing && <div  style={{  width: '100%', margin: '0 auto',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '24px'}}>

                <div className='top-div flex justify-between w-full items-center px-2'>
                    <img className='h-12 w-12 border border-zinc-700 rounded-full' src={avatar} alt="avatar" />
                    
                    <p>{deleting.toString()}</p>
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
                <div className='middle-div flex flex-row justify-between w-full px-2'>
                    <p className='flex flex-row items-center text-justify w-5/12 gap-2 font-medium'><CiPhone className='h-6 w-6' />{phone}</p>
                    <p className='flex flex-row items-center text-justify w-8/12 gap-2 font-medium'><CiHome className='h-6 w-6' />{address}</p>
                    
                </div>
                <div className='bottom-div flex justify-between gap-8 w-full px-2'>

                    {!deleting && <div className='bottom-div flex flex-row-reverse gap-8 pr-8 w-full'>
                    
                    <button className='delete-btn text-red-500' style={{fontWeight:'bold'}}
                    onClick={() => setDeleting(true)}
                    >Delete</button>
                    <button className='edit-btn text-blue-500' style={{fontWeight:'bold'}} onClick={() => setEditing(!editing)}>Edit</button>
                    </div>}
                    {deleting && <div className='bottom-div flex flex-row-reverse gap-8 pr-8 w-full'>
                    
                    <button className='delete-btn text-red-500' style={{fontWeight:'bold'}}
                    onClick={handleDelete}
                    >Delete For Sure</button>
                    <button className='edit-btn text-blue-500' style={{fontWeight:'bold'}} onClick={() => setDeleting(false)}>Cancel</button>
                    </div>}
                    
                </div>
                
            </div>}

            {editing && <div  style={{  width: '100%', margin: '0 auto',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '24px'}}>

                <div className='top-div flex justify-between w-full items-center px-2 gap-4'>
                    <img className='h-8 w-8 border border-zinc-700 rounded-full' src={avatar} alt="avatar" />
                    
                    
                    <input className='w-3/12 text-left font-bold justify-evenly border border-zinc-400 rounded-md' placeholder={firstName} value={sFirstName} onChange={(e) => setSFirstName(e.target.value)}/>
                    <input className='w-3/12 text-left font-bold justify-evenly border border-zinc-400 rounded-md' placeholder={lastName} value={sLastName} onChange={(e) => setSLastName(e.target.value)}/>
                    <div className='title-div flex justify-start flex-row gap-2 w-4/12'>
                        <CiMail className='h-6 w-6'/>
                        <input type="text" className='flex flex-row text-left justify-evenly items-center gap-2 font-medium w-full border border-zinc-400 rounded-md' placeholder={email} value={sEmail} onChange={(e) => setSEmail(e.target.value)}/>
                    </div>
                    <select className='role-select w-1/12 border border-zinc-700 rounded-md font-medium' value={sRole} onChange={(e) => setSRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                        <label className='expand-btn-label'>
                            <input className='expand-btn' type="checkbox" checked={expanded} onChange={() => setExpanded(!expanded)} />
                        </label>
                    
                </div>
                <div className='middle-div flex flex-row justify-between w-full px-2 gap-8'>
                    <div className='flex flex-row items-center text-justify w-5/12 gap-2 font-medium'>
                        <CiPhone className='h-6 w-6' />
                        <input type="text" className='flex flex-row items-center text-justify w-full gap-2 font-medium border border-zinc-400 rounded-md' placeholder={phone} value={sPhone} onChange={(e) => setSPhone(e.target.value)}/>
                    </div>
                    
                    <div className='flex flex-row items-center text-justify w-7/12 gap-2 font-medium'>
                        <CiHome className='h-6 w-6' />
                        <input type="text" className='flex flex-row items-center text-justify w-full gap-2 font-medium border border-zinc-400 rounded-md' placeholder={address} value={sAddress} onChange={(e) => setSAddress(e.target.value)}/>
                    </div>
                    
                </div>
                <div className='bottom-div flex justify-between gap-8 w-full px-2'>

                    <div className='bottom-div flex flex-row-reverse w-full gap-8 pr-8'>
                    
                        <button className='delete-btn text-red-500' style={{fontWeight:'bold'}}
                    onClick={() => setEditing(false)}
                    >Cancel</button>
                        <button className='edit-btn text-green-500' style={{fontWeight:'bold'}} onClick={handleSave}>Save</button>
                    </div>
                </div>

                </div>}
        </div>
    );
}

export default CustomCard
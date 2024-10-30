/* eslint-disable react/prop-types */
import { useState } from 'react';

import { toast } from 'react-toastify';
import { axiosAPI } from '../../api/axiosAPI';
import "./CustomCard.css";

function CreateUserCard({ setCreate, fetchUsers, setPage}) {

    //const [display, setDisplay] = useState("flex");
    
    const [sFirstName, setSFirstName] = useState("");
    const [sLastName, setSLastName] = useState("");
    const [sEmail, setSEmail] = useState("");
    const [sPhone, setSPhone] = useState("");
    const [sAddress, setSAddress] = useState("");
    const [sRole, setSRole] = useState("user");


    

    // const adjustHeight = (el) => {
    //     el.target.style.height = (el.target.scrollHeight>el.target.clientHeight)?(el.target.scrollHeight) + 'px':"60px";
    // }



    const handleCreate = async () => {
        const data={
            firstName: sFirstName,
            lastName: sLastName,
            email: sEmail,
            phone: sPhone,
            address: sAddress,
            role: sRole
        }
        console.log(data);
        try {
                    const response = await axiosAPI.post("/users/create", data)
                    if (response.status === 200) {
                        setCreate(false);
                        setPage(1);
                        fetchUsers();
                        toast.success("User created successfully");
                    }
                    console.log(response);
                    

        } catch (error) {
            console.log(error);
            toast.error("User creation failed");
        }
        
    }

    return (
        <div className="expanded card" style={{  width: '90%', margin: '0 auto',border: '1px solid #707070',display: "flex", flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '24px',boxShadow: '2px 4px 4px 2px rgba(0, 0, 0, 0.2)', }}>

            <div  style={{  width: '100%', margin: '0 auto',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',  borderRadius: '24px'}}>
            
            <div className='top-div flex justify-evenly w-full items-center gap-2'>
                <input className='w-3/5 text-left font-bold justify-evenly border border-black rounded-md' placeholder="First Name..." value={sFirstName} onChange={(e) => setSFirstName(e.target.value)}/>
                <input className='w-3/5 text-left font-bold justify-evenly border border-black rounded-md' placeholder="Last Name..." value={sLastName} onChange={(e) => setSLastName(e.target.value)}/>
                <div className='title-div flex justify-around flex-row gap-8'>
                        
                    <input className='text-left font-bold justify-evenly border border-black rounded-md' placeholder="Email..." value={sEmail} onChange={(e) => setSEmail(e.target.value)}/>
                </div>
                <select className='w-3/5 text-left font-bold justify-evenly border border-black rounded-md' value={sRole} onChange={(e) => setSRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            
            
            
            <div className='bottom-div flex justify-between gap-8 w-full px-2'>

                <input className='text-justify border border-black rounded-md' placeholder="Address..." value={sAddress} onChange={(e) => setSAddress(e.target.value)}/>
                <input className='text-justify border border-black rounded-md' placeholder="Phone No..." value={sPhone} onChange={(e) => setSPhone(e.target.value)}/>

                
            </div>
            <div className='bottom-div flex flex-row-reverse gap-8 w-full pr-8'>
                    <button className='delete-btn text-yellow-500' style={{fontWeight:'bold'}} onClick={() => setCreate(false)}>Cancel</button>
                    <button className='edit-btn text-blue-500' style={{fontWeight:'bold'}}
                    onClick={handleCreate}
                    >
                    Save
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default CreateUserCard
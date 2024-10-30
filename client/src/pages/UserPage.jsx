import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosAPI } from "../api/axiosAPI";
import { login as authLogin } from '../store/authSlice';

function UserPage() {

    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    if(authStatus === false){
        navigate("/")
    }

    const userData = useSelector((state) => state.auth.userData);
    
    const dispatch = useDispatch()

    const [editing, setEditing] = useState(false)

    const [sFirstName, setSFirstName] = useState(userData?.user.first_name);
    const [sLastName, setSLastName] = useState(userData?.user.last_name);
    const [sEmail, setSEmail] = useState(userData?.user.email);
    const [sPhone, setSPhone] = useState(userData?.user.phone);
    const [sAddress, setSAddress] = useState(userData?.user.address);

    const handleSave = async () => {
        const data={
            id: userData.user._id,
            firstName: sFirstName,
            lastName: sLastName,
            email: sEmail,
            avatar: userData.user.avatar,
            phone: sPhone,
            address: sAddress,
            role: userData.user.role
        }
        try {
                const response = await axiosAPI.patch("/users/update", data)
                if (response.status === 200) {
                    setEditing(false);
                    const newUserData={
                        user:response.data.data,
                        accessToken:userData.accessToken,
                        refreshToken:userData.refreshToken
                    }

                    dispatch(authLogin(newUserData));
                    toast.success("User updated successfully");
                }
                console.log(response);
                

                
        
    } catch (error) {
        console.log(error);
        toast.error("User creation failed");
        
    }
}


    return (
        <div className="flex flex-row w-full h-svh">

            <div className="flex flex-col justify-center content-center items-center align-middle w-full h-fit min-h-[90vh] ml-52 pt-20 gap-8 "
            style={{boxShadow:  "inset 2px 4px 4px 2px rgba(0, 0, 0, 0.3)"}}>

                
                {!editing && <div  style={{  height: 'auto',width: '90%', maxWidth: '1200px', margin: '0 auto',border: '1px solid #aaaaaa',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '36px',  borderRadius: '16px',boxShadow: '2px 4px 4px 2px rgba(0, 0, 0, 0.24)', backgroundColor: "white", padding: "36px" }}>
                    <h1 className="text-black font-medium text-2xl flex flex-row items-center justify-center gap-2"><img alt="avatar" src={userData?.user.avatar} className="h-12 w-12 rounded-full border border-zinc-600 bg-zinc-100"/>Your Details</h1>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-row gap-8 justify-between">
                            <div className="bg-gray-200 px-4 py-1 rounded-md w-1/2 flex flex-row justify-between items-center ">
                                <p className=" text-black font-medium text-lg  whitespace-nowrap text-left">First Name: </p>
                                <p className=" text-black font-medium text-lg  whitespace-nowrap text-left">{userData?.user.first_name}</p>
                            </div>
                            <div className="bg-gray-200 px-4 py-1 rounded-md w-1/2 flex flex-row justify-between items-center ">
                                <p className=" text-black font-medium text-lg  whitespace-nowrap text-left">Last Name: </p>
                                <p className="text-black font-medium text-lg whitespace-nowrap text-left">{userData?.user.last_name}</p>
                            </div>
                            
                            
                        </div>
                        <div className="flex flex-row gap-8">
                            <div className="bg-gray-200 px-4 py-1 rounded-md w-8/12 flex flex-row justify-between items-center ">
                                <p className=" text-black font-medium text-lg  whitespace-nowrap text-left">Email:</p>
                                <p className=" text-black font-medium text-lg w-1/2 whitespace-nowrap text-left">{userData?.user.email}</p>
                            </div>
                            <div className="bg-gray-200 px-4 py-1 rounded-md w-4/12 flex flex-row justify-between items-center ">
                                <p className=" text-black font-medium text-lg  whitespace-nowrap text-left">Phone:</p>
                                <p className="text-black font-medium text-lg w-1/2 whitespace-nowrap text-right"> {userData?.user.phone}</p>
                            </div>
                            
                        </div>
                        <div className="bg-gray-200 px-4 py-1 rounded-md w-full flex flex-row justify-between items-center ">
                            <p className=" text-black font-medium text-lg  whitespace-nowrap text-left">Address: </p>
                            <p className="text-black font-medium text-lg  whitespace-nowrap text-left">{userData?.user.address}</p>
                        </div>
                        
                        <div className="flex flex-row-reverse gap-2">
                                    <button className="py-1 px-4 text-yellow-500 font-medium text-lg border-4 border-yellow-500 rounded-xl shadow-zinc-800 hover:bg-yellow-500 hover:text-white" onClick={() => setEditing(true)}>Edit</button>
                        </div>
                    </div>

                </div>}

                {editing && <div  style={{  height: 'auto',width: '90%', maxWidth: '1200px', margin: '0 auto',border: '1px solid #aaaaaa',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '36px',  borderRadius: '16px',boxShadow: '2px 4px 4px 2px rgba(0, 0, 0, 0.24)', backgroundColor: "white", padding: "32px" }}>
                <h1 className="text-black font-medium text-2xl flex flex-row items-center justify-center gap-2"><img alt="avatar" src={userData?.user.avatar} className="h-12 w-12 rounded-full border border-zinc-600 bg-zinc-100"/>Your Details</h1>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-row gap-2">
                            <input className="bg-gray-200 hover:bg-gray-300 p-1 text-black font-medium text-lg w-1/2 whitespace-nowrap text-left border border-zinc-700 rounded-md" type="text" placeholder="First Name..." value={sFirstName} onChange={(e) => setSFirstName(e.target.value)}/>
                            <input className="bg-gray-200 hover:bg-gray-300 p-1 text-black font-medium text-lg w-1/2 whitespace-nowrap text-left border border-zinc-700 rounded-md" type="text " placeholder="Last Name..." value={sLastName} onChange={(e) => setSLastName(e.target.value)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input className="bg-gray-200 hover:bg-gray-300 p-1  text-black font-medium text-lg w-1/2 whitespace-nowrap text-left border border-zinc-700 rounded-md" type="text" placeholder="Email..." value={sEmail} onChange={(e) => setSEmail(e.target.value)}/>
                            <input className="bg-gray-200 hover:bg-gray-300 p-1 text-black font-medium text-lg w-1/2 whitespace-nowrap text-left border border-zinc-700 rounded-md" type="text" placeholder="Phone..." value={sPhone} onChange={(e) => setSPhone(e.target.value)}/>
                        </div>
                        <input className="bg-gray-200 hover:bg-gray-300 p-1 text-black font-medium text-lg  whitespace-nowrap text-left border border-zinc-700 rounded-md" type="text" placeholder="Address..." value={sAddress} onChange={(e) => setSAddress(e.target.value)}/>
                            
                                
                            <div className="flex flex-row-reverse gap-4">
                                <button className="py-1 px-4 text-red-500 font-medium text-lg border-4 border-red-500 rounded-xl hover:bg-red-500 hover:text-white" onClick={() => setEditing(false)}>Cancel</button>
                                <button className="py-1 px-4 text-green-500 font-medium text-lg border-4 border-green-500 rounded-xl hover:bg-green-500 hover:text-white " onClick={() => handleSave()}>Save</button>
                                
                            </div>
                        
                    </div>
                </div>}

            </div>
        </div>
    );
}

export default UserPage;
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiFileUserFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { logout } from '../../store/authSlice';
import './Sidebar.css';


function Sidebar() {

    const authStatus = useSelector((state) => state.auth.status)

    const userData = useSelector((state) => state.auth.userData)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        toast.success("Logout Successful")
        navigate('/')
    }

    return (
        <>
            <div className="flex flex-col justify-start content-center gap-2 bg-zinc-700 fixed top-0 w-52 h-svh left-0 z-[999]">
                <div className="h-20 flex flex-row justify-center items-center">
                    <h1 className="text-white font-medium text-3xl"
                    style={{textShadow: "4px 4px 4px #222222"}}>UMS App</h1>
                </div>
                <div className="flex flex-col gap-2 justify-between h-full px-4 py-8">
                    {authStatus &&<div className="flex flex-col gap-2">
                        {userData?.user.role === "admin" &&<NavLink to="/dashboard" className="flex flex-row items-center justify-center gap-2 py-1 text-white font-medium text-lg border-2 border-white rounded-xl shadow-md shadow-zinc-800 hover:bg-white hover:text-black "><MdOutlineSpaceDashboard className="h-6 w-6"/>Dashboard</NavLink>}
                        <NavLink to="/user" className="flex flex-row items-center justify-center gap-2 py-1 text-white font-medium text-lg border-2 border-white rounded-xl shadow-md shadow-zinc-800 hover:bg-white hover:text-black "><RiFileUserFill className="h-6 w-6"/>Your Details</NavLink>
                    </div>}
                    
                    

                    <div className="flex flex-col px-4">
                        {!authStatus &&<Link to="/" className="flex flex-row items-center justify-center gap-2 py-1 text-white font-medium text-lg border-2 border-white rounded-xl shadow-md shadow-zinc-800 hover:bg-white hover:text-black"><IoIosLogIn className="h-6 w-6"/>Login</Link>}
                        {authStatus && <button className="flex flex-row items-center justify-center gap-2 py-1 text-white font-medium text-lg border-2 border-white rounded-xl shadow-md shadow-zinc-800 hover:bg-white hover:text-black" onClick={handleLogout}><IoIosLogOut  className="h-6 w-6"/>Logout</button>}
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Sidebar;
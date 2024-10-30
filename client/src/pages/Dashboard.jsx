import { useEffect, useState } from "react";
import CustomCard from "../components/cards/CustomCard";
//import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosAPI } from "../api/axiosAPI";
import CreateUserCard from "../components/cards/CreateUserCard";
import Header from "../components/header/Header.jsx";



function Dashboard() {

    

    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)


    // if((authStatus === false)||(userData.user.role!=='admin')){
    //     return 
    // }

    const [users, setUsers] = useState([]);


    const [create, setCreate] = useState(false)
    
    const [page, setPage] = useState(1);


    


    // const filterusersByPriority = async () => {
    //     try {
    //         const data = await axiosAPI.get("/users/filter/priority", {params:
    //             {
    //                 user: userData.user._id,
    //                 priority: priorities[priority],
    //                 page: page,
    //                 limit: 10
    //             }
    //         }, {withCredentials: true})

    //         setusers(data.data.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const filterusersByStatus = async () => {
    //     try {
    //         const data = await axiosAPI.get("/users/filter/status", {params:
    //             {
    //                 user: userData.user._id,
    //                 status: statuses[status],
    //                 page: page,
    //                 limit: 10
    //             }
    //         }, {withCredentials: true})

    //         setusers(data.data.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const sortusersByDueDate = async () => {
    //     try {
    //         const data = await axiosAPI.get("/users/sort", {params:
    //             {
    //                 user: userData.user._id,
    //                 page: page,
    //                 limit: 10
    //             }
    //         }, {withCredentials: true})

    //         setusers(data.data.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     console.log("dashboard ",userData)
    //     fetchusers();
    //     window.scrollTo(0, 0)
    // }, [userData, page])

    // useEffect(() => {
    //     switch (filter) {
    //         case 0:
    //             fetchusers();
    //             break;
    //         case 1:
    //             sortusersByDueDate();
    //             break;
    //         case 2:
    //             filterusersByPriority();
    //             break;
    //         case 3:
    //             filterusersByStatus();
    //             break;
    //         default:
    //             fetchusers();
    //             break;
    //     }
    //     window.scrollTo(0, 0)
    // },[filter, priority, status, dueDateSort, userData, page])

    // useEffect(() => {
    //     setPage(1)
    //     setDueDateSort(0)
    //     setPriority(0)
    //     setStatus(0)
    // },[filter])

    const handleNext = () => {
        setPage(page + 1)
        console.log("page ",page)
        
    }
    const handlePrev = () => {
        setPage(page - 1)
        console.log("page ",page)
        
    }

    // const handleToggle = (alignment) => {
    //     console.log(alignment)
    //     switch (filter) {
    //         case 1:
    //             setDueDateSort(alignment)
    //             break;
    //         case 2:
    //             setPriority(alignment)
    //             break;
    //         case 3:
    //             setStatus(alignment)
    //             break;
    //         default:
    //             break;
    //     }
        
    // }

    
    const fetchUsers = async () => {
        const data = await axiosAPI.get("/users/users",{params:
            {
                
                page: page,
                limit: 10
            }},
            {withCredentials: true})
        console.log(data)
        setUsers(data.data.data)
        console.log("users ",users)
    }

    useEffect(() => {
        fetchUsers();
        window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])


    return (
        
        <div className=" flex flex-row w-full h-svh">
        
        
        

            {((authStatus === false)||(userData.user.role!=='admin'))?
            (<div className="flex flex-col justify-center content-center items-center align-middle w-full h-fit min-h-[90vh] ml-52 pt-24 gap-8 "
            style={{boxShadow:  "inset 2px 4px 4px 2px rgba(0, 0, 0, 0.3)"}}>
                <div className="flex flex-col w-auto items-center shadow-md shadow-zinc-600 border border-zinc-500 rounded-lg p-12">
                    <h1 className="w-10/12 text-3xl font-bold text-black text-left">Oops, looks like you don&apos;t have admin access.</h1>
                    <ul className="w-10/12 text-xl font-medium text-black text-left p-8">
                        <li>- If you are a Admin try Logging In.</li>
                        <li>- If you should have Admin access try asking for access from other Admin.</li> 
                    </ul>
                </div>
            </div>):
            (<div className="flex flex-col justify-center content-center items-center align-middle w-full h-fit min-h-[90vh] ml-52 pt-24 gap-8 "
            style={{boxShadow:  "inset 2px 4px 4px 2px rgba(0, 0, 0, 0.3)"}}>
            
            <Header create={create} setCreate={setCreate} setUsers={setUsers} page={page}/>
            
            {create && <CreateUserCard setCreate={setCreate} setPage={setPage} fetchUsers={fetchUsers} />}

                {users.length>0 && users.map((user) => (
                        <CustomCard key={user._id} id={user._id} firstName={user.first_name} lastName={user.last_name} email={user.email} avatar={user.avatar} phone={user.phone} address={user.address} role={user.role} fetchUsers={fetchUsers}/>
                ))}

                {/* {users.map((user) => (
                    <OutlinedCard key={user.title} title={user.title} description={user.description}/>
                ))} */}
                <div className="flex flex-row py-4 justify-center align-middle gap-8">
                    {(page>=2)&&<button className="w-20 h-10 bg-gray-50 rounded-3xl text-black font-medium hover:bg-gray-200 active:bg-gray-300 shadow-black"
                    style={{boxShadow: "2px 4px 4px 2px rgba(0, 0, 0, 0.2)"}}
                    onClick={handlePrev}
                    >
                    Prev
                    </button>}
                    {users.length>0 && <h2 className="text-black font-medium w-10 h-10  bg-gray-50 rounded-3xl flex justify-center items-center"
                    style={{boxShadow: "2px 4px 4px 2px rgba(0, 0, 0, 0.2)"}}
                    >{page}</h2>}
                    {(users.length===10)&&<button className="w-20 h-10 bg-gray-50 rounded-3xl text-black font-medium hover:bg-gray-200 active:bg-gray-300 active:shadow-2 shadow-black"
                    style={{boxShadow: "2px 4px 4px 2px rgba(0, 0, 0, 0.2)"}}
                    onClick={handleNext}
                    >
                    Next
                    </button>}
                
            </div>
            
            </div>)}
        </div>
        
    );
}

export default Dashboard;
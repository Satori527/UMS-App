/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { axiosAPI } from "../../api/axiosAPI";

function Header({ setCreate, page, setUsers, setLoading }) {

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);


    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query), 500);
        return () => clearTimeout(timer);
    }, [query])


    const fetchUsersByName = async () => {
        try {
            const data = await axiosAPI.get("/users/search",{params:
                {
                    search: debouncedQuery,
                    page: page,
                    limit: 10
                }},
                {withCredentials: true})
            console.log(data)
            if(data.status === 200){
                setUsers(data.data.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchUsersByName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery])

    return (
        <>
            <div className="flex flex-row py-2 pl-48  bg-gray-400 fixed top-0 w-full left-0 h-[72px] z-10 items-center justify-center"
            style={{boxShadow:  "2px 4px 4px 2px rgba(0, 0, 0, 0.24)"}}>
                <div className="flex flex-row gap-2 w-[86%] justify-between">
                    <button className="h-10 px-8 text-black font-medium text-lg bg-white border border-white rounded-xl  hover:bg-zinc-500 hover:text-white btn" onClick={() => setCreate(true)}>+ Create User</button>
                    <input type="text" placeholder="Search" className="max-w-96 flex-grow h-10 px-4 text-black font-medium text-lg bg-white border border-white rounded-xl  hover:bg-zinc-200 hover:text-white btn" onChange={(e) => setQuery(e.target.value)}></input>
                    
                </div>
            
            </div>
            
        </>
    );
}

export default Header;

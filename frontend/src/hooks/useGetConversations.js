import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [conversations,setConversations] = useState([]);
    useEffect(()=>{
        const getConversations = async() => {
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        getConversations();
    },[]);
    return {conversations};
};
export default useGetConversations;
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
    const {messages,setMessages,selectedConversation} = useConversation();
    const sendMessage = async (message) => {
        try {
            const id = selectedConversation._id;
            const res = await fetch(`/api/messages/send/${id}`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({message})
            })
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            setMessages([...messages,data]);

        } catch (error) {
            toast.error(error.message);
        }
    };
    return {sendMessage};
};
export default useSendMessage;
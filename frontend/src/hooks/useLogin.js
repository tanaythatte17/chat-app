import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
const useLogin = () => {
    const {setAuthUser} = useAuthContext();
    const login = async ({username,password}) => {
        try {
            const res = await fetch("/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            });
            const data = await res.json();
            if(data.error){
                throw new Error(error.message);
            }
            localStorage.setItem("chat-app-user",JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return {login};
};
export default useLogin;
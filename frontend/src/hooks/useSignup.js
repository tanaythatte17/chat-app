import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useSignup = () => {
    const {setAuthUser} = useAuthContext();
    const Signup = async({username,fullName,password,confirmPassword}) => {
        const success = handleInputErrors({username,fullName,password,confirmPassword});
        if (!success) return;
        try {
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({username,fullName,password,confirmPassword})
            })
            console.log(res);
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("chat-app-user",JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        }
        
    }
    return {Signup};
};
export default useSignup;

function handleInputErrors({username,fullName,password,confirmPassword}){
    if(!username || !fullName || !password || !confirmPassword){
        toast.error("Please fill all fields");
        return false;
    }
    if(password !== confirmPassword){
        toast.error("Password and Confirm password do not match");
        return false;
    }
    return true;
}
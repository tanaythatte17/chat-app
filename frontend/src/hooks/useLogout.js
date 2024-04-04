import { useAuthContext } from "../Context/AuthContext";

const useLogout = () => {
    const {setAuthUser}=useAuthContext();
    const logout = async () => {
        try {
            const res = await fetch("/api/auth/logout",{
                method:"POST",
                headers:{"Content-type":"application/json"}
            });
            const data = await res.json();
            if(data.error){
                throw new Error(error.message);
            }
            localStorage.removeItem("chat-app-user");
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return {logout};
}
export default useLogout;
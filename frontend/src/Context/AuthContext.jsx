import { createContext, useContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
}

// AuthContextProvider component
export const AuthContextProvider = ({children}) => {
    // Initialize authUser state with the value from localStorage or null if not available
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-app-user')) || null);
    
    return (
        // Provide authUser and setAuthUser values to children components
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    );
}

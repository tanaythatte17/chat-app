import React from "react";
import Sidebar from "./Sidebar/Sidebar.jsx";
import MessageContainer from "./MessageContainer/MessageContainer.jsx";
function Home(){
    return(
        <div>
        <Sidebar />
        <MessageContainer />
        </div>
    )
}
export default Home;
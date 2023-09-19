import React from "react";
import {styled} from "@mui/system"
import SideBar from "./sideBar/SideBar";
import FriendsSideBar from "./friendsSideBar/FriendsSideBar";
import Messenger from "./messenger/Messenger";
import AppBar from "./appBar/AppBar";

const Wrapper = styled('div')({
    width:'100%',
    height:'100vh',
    display:'flex'
})
const Dashboard = (props) => {
    return <Wrapper>
        <SideBar/>
        <FriendsSideBar/>
        <Messenger/>
        <AppBar/>
    </Wrapper>
};

export default Dashboard;
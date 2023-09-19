import React, { useEffect } from "react";
import {styled} from "@mui/system"
import SideBar from "./sideBar/SideBar";
import FriendsSideBar from "./friendsSideBar/FriendsSideBar";
import Messenger from "./messenger/Messenger";
import AppBar from "./appBar/AppBar";
import { logout } from "../shared/util/auth";
import { getActions } from "../store/actions/authActions";
import { connect } from "react-redux";

const Wrapper = styled('div')({
    width:'100%',
    height:'100vh',
    display:'flex'
})
const Dashboard = ({setUserDetails}) => {
    useEffect(()=>{
        const userDetails = localStorage.getItem('user');
        if(!userDetails){
            logout();
        }

    },[])

    return <Wrapper>
        <SideBar/>
        <FriendsSideBar/>
        <Messenger/>
        <AppBar/>
    </Wrapper>
};
const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),

    }
}
export default  connect(null,mapActionsToProps)(Dashboard);
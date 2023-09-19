import React, { useState } from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import AddFriendDialog from "./AddFriendDialog";

const AdditionalStyles = {
  marginTop: "10px",
  marginLeft: "5px",
  width: "80%",
  height: "30px",
  background: "#3ba55d",
};

const AddFriendsButton = (props) => {
  const handelOpenAddFriendDialog = () => {
    setIsDialogOpen(true)
  };
  const handelCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <CustomPrimaryButton
        additionalStyles={AdditionalStyles}
        label="Add Friend"
        onClick={handelOpenAddFriendDialog}
      />
      <AddFriendDialog isDialogOpen={isDialogOpen} closeDialogHandler={handelCloseAddFriendDialog}/>
    </>
  );
};

export default AddFriendsButton;

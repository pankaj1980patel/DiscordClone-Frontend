import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";
import { validateMail } from "../../shared/util/Validators";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";

const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation = () => {},
}) => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSendInvitation = () => {};
  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };
  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);
  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>
        <Typography>Invite a Friend</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            Enter e-mail address of friend which you would like to invite
          </Typography>
        </DialogContentText>
        <InputWithLabel
          label="Mail"
          type="text"
          value={mail}
          setValue={setMail}
          palceholder="Enter mail address"
        />
      </DialogContent>
      <DialogActions>
        <CustomPrimaryButton
          onClick={handleSendInvitation}
          disable={!isFormValid}
          label="Send"
          additionalStyles={{
            marginLeft: "15px",
            marginRight: "15px",
            marginBottom: "10px",
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddFriendDialog;

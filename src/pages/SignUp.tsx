import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicAlert from "../components/Alerts/BasicAlert";
import { Card } from "../components/Card/Card";
import FormSignUp from "../components/FormSignUp/FormSignUp";
import { useAppDispatch } from "../store/hooks";
import { addAccount } from "../store/modules/AccountSlice";
import { FormValidation } from "../types";

const SignUp: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignUp = (validation: FormValidation) => {
    if (validation.valid) {
      dispatch(
        addAccount({ email: validation.email, password: validation.password })
      );
      navigate("/");
    } else {
      setIsOpen(true);
      setAlertMessage(validation.message);
    }
  };

  return (
    <Card title="Cadastro">
      <Box>
        <FormSignUp handleSignUp={handleSignUp} />
        <BasicAlert
          message={alertMessage}
          openAlert={isOpen}
          setOpenAlert={setIsOpen}
        />
      </Box>
    </Card>
  );
};

export default SignUp;

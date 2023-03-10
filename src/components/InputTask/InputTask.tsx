/* eslint-disable no-unused-vars */
import { Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { TaskValidation } from "../../types/TaskValidation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface InputTaskProps {
  handleAddTask: (validation: TaskValidation) => void;
}

const InputTask: React.FC<InputTaskProps> = ({ handleAddTask }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const validateInput = (): TaskValidation => {
    let errorMessage = "";

    const isEmpty = () => {
      if (title === "" || description === "") {
        errorMessage = "Adicione o nome e/ou a descrição da tarefa.";
        return false;
      } else {
        return true;
      }
    };
    if (isEmpty()) {
      return { valid: true, title, description };
    } else {
      return { valid: false, message: errorMessage };
    }
  };

  const task = () => {
    const taskValidation = validateInput();
    handleAddTask(taskValidation);
    handleClear();
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          mt: "20px",
          mx: "10px",
          fontFamily: "Cutive Mono",
          color: "text.secondary",
          fontSize: "45px"
        }}
      >
        Minhas Tarefas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid",
          borderColor: "text.disabled",
          borderRadius: "8px",
          padding: "10px",
          mx: "70px",
          mt: "20px"
        }}
      >
        <TextField
          variant="standard"
          id="title"
          name="title"
          autoComplete="title"
          autoFocus
          placeholder="Tarefa"
          InputProps={{
            disableUnderline: true
          }}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        ></TextField>
        <TextField
          sx={{ my: 1 }}
          id="description"
          name="description"
          autoComplete="description"
          variant="standard"
          placeholder="Descrição"
          InputProps={{
            disableUnderline: true
          }}
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          mx: "70px",
          mt: "5px",
          mb: "15px"
        }}
      >
        <Button
          onClick={() => task()}
          variant="contained"
          size="small"
          startIcon={<AddIcon sx={{ color: "background.default" }} />}
          sx={{
            fontFamily: "Poppins",
            color: "background.default",
            backgroundColor: "#4a148c"
          }}
        >
          Adicionar
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            fontFamily: "Poppins",
            color: "background.default",
            backgroundColor: "#ab47bc",
            margin: "10px"
          }}
          onClick={() => handleClear()}
        >
          Limpar
        </Button>
      </Box>
    </>
  );
};

export default InputTask;

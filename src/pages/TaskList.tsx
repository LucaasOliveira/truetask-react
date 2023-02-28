import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  addTask,
  deleteTask,
  selectTasks,
  updateTask
} from "../store/modules/TaskSlice";
import Modal from "../components/Modal/Modal";
import ModalDelete from "../components/ModalDelete/ModalDelete";
import { TaskInfo } from "../types";
import { TaskValidation } from "../types/TaskValidation";
import InputTask from "../components/InputTask/InputTask";
import TaskCard from "../components/TaskCard/TaskCard";
import BasicAlert from "../components/Alerts/BasicAlert";

const Contact: React.FC = () => {
  const [editingTask, setEditingTask] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [message, setAlertMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tasksRedux = useAppSelector(selectTasks);
  const loggedRedux = useAppSelector((state) => state.logged);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedRedux) {
      alert("Faça o login!");
      navigate("/");
    }
  }, [loggedRedux, navigate]);

  const handleAddTask = (validation: TaskValidation) => {
    if (validation.valid) {
      dispatch(
        addTask({
          title: validation.title,
          description: validation.description,
          id: Math.floor(Date.now() / 1000),
          userEmail: loggedRedux
        })
      );
    } else {
      setIsOpen(true);
      setAlertMessage(validation.message);
    }
  };

  const handleClickOpen = (id: number) => {
    setEditingTask(id);
    setOpenModal(true);
  };

  const handleClickClose = () => {
    setOpenModal(false);
  };

  const handleEdit = (task: TaskInfo) => {
    dispatch(
      updateTask({
        id: task.id,
        changes: { description: task.description, title: task.title }
      })
    );
    setOpenModal(false);
  };

  const handleDeleteTask = (id: number) => {
    setEditingTask(id);
    setOpenConfirmModal(true);
  };

  const handleConfirmModal = (id: number) => {
    dispatch(deleteTask(id));
    setOpenConfirmModal(false);
  };

  const handleConfirmClose = () => {
    setOpenConfirmModal(false);
  };

  return (
    <>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "background.default"
        }}
      >
        <Header />
        <Grid
          item
          xs={12}
          sm={6}
          md={8}
          lg={8}
          sx={{
            my: 3,
            backgroundColor: "background.default",
            borderRadius: "7px"
          }}
        >
          <>
            <InputTask handleAddTask={handleAddTask} />
            {tasksRedux
              .filter((task) => task.userEmail === loggedRedux)
              .map((item) => {
                return (
                  <TaskCard
                    key={item.id}
                    handleClickOpen={handleClickOpen}
                    handleDeleteTask={handleDeleteTask}
                    task={item}
                  />
                );
              })}

            <Modal
              id={editingTask}
              handleCloseEdit={handleClickClose}
              handleEdit={handleEdit}
              isOpen={openModal}
            />
            <ModalDelete
              id={editingTask}
              handleConfirmClose={handleConfirmClose}
              handleConfirmModal={handleConfirmModal}
              isOpen={openConfirmModal}
            />
            <BasicAlert
              message={message}
              openAlert={isOpen}
              setOpenAlert={setIsOpen}
            />
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;

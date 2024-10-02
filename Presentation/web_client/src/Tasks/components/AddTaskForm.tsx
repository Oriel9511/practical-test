import React, { useEffect, useState } from "react";
import {TextField, Button, Stack, FormControlLabel, Checkbox, Box} from "@mui/material";
import { Task } from "../../../../../Core/Task.ts";
import { context } from "../../Shared/Context.ts";
import { useNavigate } from "react-router-dom";

export function AddTaskForm(
    {
        taskToEdit
    }: {
        taskToEdit: Task | null;
    }) {
    const [task, setTask] = useState<Task>(taskToEdit || new Task({ title: "", description: "", finished: false }));
    const [errors, setErrors] = useState({ title: "", description: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        }
    }, [taskToEdit]);

    const validateForm = () => {
        const newErrors = {
            title: task.title.trim() === "" ? "Title cannot be empty" : "",
            description: task.description.trim() === "" ? "Description cannot be empty" : ""
        };
        setErrors(newErrors);
        return !newErrors.title && !newErrors.description;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        let savedTask: Task | undefined;

        if (taskToEdit) {
            savedTask = await context.tasks.update(taskToEdit.id, task);
        } else {
            savedTask = await context.tasks.create(task);
        }

        if (savedTask) {
            navigate("/");
        }
    };

    useEffect(() => {
        if(errors.title || errors.description) validateForm();
    }, [task]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setTask(prevTask => (new Task({
            ...prevTask,
            [name]: type === 'checkbox' ? checked : value
        })));
    };

    return (
        <Box component="form" style={{ width: '100%' }}>
            <Stack spacing={2}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={task.description}
                    onChange={handleChange}
                    required
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="finished"
                            checked={task.finished}
                            onChange={handleChange}
                        />
                    }
                    label="Finished"
                />
                <Button onClick={() => handleSubmit()} variant="contained" color="primary">
                    {taskToEdit ? "Update Task" : "Add Task"}
                </Button>
            </Stack>
        </Box>
    );
}

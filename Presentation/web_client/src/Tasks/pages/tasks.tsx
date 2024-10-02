import React, { useEffect, useState } from "react";
import { context } from "../../Shared/Context.ts";
import { useArray } from "../../Shared/hooks.ts";
import { Task } from "../../../../../Core/Task.ts";
import { Pagination, Button } from "@mui/material";
import { TaskItem } from "../components/TaskItem.tsx";
import { useNavigate } from "react-router-dom";

export function Tasks({ ...props }: React.HTMLProps<HTMLDivElement>) {
    const [tasks, setTasks, updateTaskProperty, _addTask, deleteObject] = useArray<Task>([]);
    const [page, setPage] = useState(1);
    const tasksPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const fetchedTasks = await context.tasks.getAll();
            if (fetchedTasks) setTasks(fetchedTasks);
        })();
    }, []);

    const handleToggleComplete = async (id: string) => {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            await context.tasks.update(id, new Task({
                ...tasks[index],
                finished: !tasks[index].finished,
            }));
            updateTaskProperty(index, "finished", !tasks[index].finished);
        }
    };

    const handleDelete = async (id: string) => {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            await context.tasks.deleteTask(id);
            deleteObject(index);
        }
    };

    const handleTaskClick = (id: string) => {
        navigate(`/task/${id}`);
    };

    const handleCreateTask = () => {
        navigate('/task/0');
    };

    const indexOfLastTask = page * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div {...props}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateTask}
                sx={{ marginBottom: 2 }}
            >
                Create New Task
            </Button>
            {currentTasks.map((task) => (
            <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                completed={task.finished}
                onToggleComplete={handleToggleComplete}
                onEdit={handleTaskClick}
                onDelete={handleDelete}
            />
            ))}
            <Pagination
                count={Math.ceil(tasks.length / tasksPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            />
        </div>
    );
}

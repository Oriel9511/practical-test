import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddTaskForm } from "../components/AddTaskForm.tsx";
import {Task} from "../../../../../Core/Task.ts";
import {context} from "../../Shared/Context.ts";
import {notify} from "../../Shared/utils/notify.tsx";

export function TaskDetails() {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        if (id && id !== '0') {
            fetchTask(id);
        }
    }, [id]);

    const fetchTask = async (taskId: string) => {
        try {
            const response = await context.tasks.getById(taskId);
            if(response) setTask(response);
        } catch (_error) {
            console.error('Error fetching task:', _error);
            notify({
                message: 'Error fetching task',
                color: 'error'
            })
        }
    };

    return (
        <div style={{
            maxWidth: '800px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto'
        }}>
            <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
            <AddTaskForm
                taskToEdit={task ?? null}
            />
        </div>
    );
}

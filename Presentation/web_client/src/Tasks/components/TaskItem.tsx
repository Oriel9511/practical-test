import { Card, CardContent, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

interface TaskItemProps {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export function TaskItem(
    {
        id,
        title,
        description,
        completed,
        onToggleComplete,
        onDelete,
        onEdit,
        ...props
    }: TaskItemProps & React.HTMLAttributes<HTMLDivElement>) {
    return (
      <Card
        {...props}
        sx={{
          marginBottom: 2,
          cursor: "pointer",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={completed}
            onChange={() => onToggleComplete(id)}
            sx={{ marginRight: 2 }}
          />
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ textDecoration: completed ? "line-through" : "none" }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </div>
          <IconButton
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id)
              }}
              sx={{ marginRight: 1 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    );
}

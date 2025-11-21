import { useState } from 'react';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, isAdmin, currentUserId, showCreatedBy = false }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onDelete(task._id);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // For admins, they can edit/delete all tasks, but usually only delete
  // For regular users, they can only edit/delete their own tasks
  const canEdit = !isAdmin && (task.createdBy === currentUserId || task.createdBy?._id === currentUserId);
  const canDelete = isAdmin || task.createdBy === currentUserId || task.createdBy?._id === currentUserId;

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`badge badge-${task.status}`}>
          {task.status.replace('-', ' ')}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        <div className="task-meta">
          <span className="task-date">
            📅 {formatDate(task.createdAt)}
          </span>
          {(showCreatedBy || isAdmin) && task.createdBy?.username && (
            <span className="task-creator">
              👤 {task.createdBy.username}
            </span>
          )}
        </div>

        <div className="task-actions">
          {canEdit && onEdit && (
            <button
              className="btn-icon btn-edit"
              onClick={() => onEdit(task)}
              title="Edit task"
            >
              ✏️
            </button>
          )}
          {canDelete && onDelete && (
            <button
              className="btn-icon btn-delete"
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete task"
            >
              {isDeleting ? '⏳' : '🗑️'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
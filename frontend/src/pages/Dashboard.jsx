import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import FilterButtons from '../components/FilterButtons';
import StatCard from '../components/StatCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, searchQuery, currentPage]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {
        page: currentPage,
        limit: 9,
      };

      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const response = await taskAPI.getTasks(params);
      setTasks(response.data.data);
      setTotalPages(response.data.pages);
      setTotalTasks(response.data.total);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Fetch tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    setActionLoading(true);
    setError('');

    try {
      await taskAPI.createTask(taskData);
      setSuccess('Task created successfully!');
      setShowForm(false);
      fetchTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to create task. Please try again.'
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    setActionLoading(true);
    setError('');

    try {
      await taskAPI.updateTask(editingTask._id, taskData);
      setSuccess('Task updated successfully!');
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update task. Please try again.'
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      setSuccess('Task deleted successfully!');
      fetchTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to delete task. Please try again.'
      );
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const getTaskStats = () => {
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;

    return { pending, inProgress, completed };
  };

  const stats = getTaskStats();

  if (loading && tasks.length === 0) {
    return <Loader />;
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>
              {isAdmin ? '📊 Admin Dashboard' : '📋 My Tasks'}
            </h1>
            <p className="dashboard-subtitle">
              {isAdmin
                ? `Managing ${totalTasks} tasks across all users`
                : `You have ${totalTasks} task${totalTasks !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            ➕ New Task
          </button>
        </div>

        {/* Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatCard icon="⏳" count={stats.pending} label="Pending" variant="pending" />
          <StatCard icon="🔄" count={stats.inProgress} label="In Progress" variant="progress" />
          <StatCard icon="✅" count={stats.completed} label="Completed" variant="completed" />
        </div>

        {/* Filters */}
        <div className="dashboard-filters">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="🔍 Search tasks..."
          />

          <FilterButtons
            filters={[
              { label: 'All', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'In Progress', value: 'in-progress' },
              { label: 'Completed', value: 'completed' },
            ]}
            activeFilter={statusFilter}
            onFilterChange={handleStatusFilterChange}
          />
        </div>

        {/* Tasks Grid */}
        {loading ? (
          <div className="loading-overlay">
            <Loader />
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No tasks found</h3>
            <p>
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Create your first task to get started!'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                Create Task
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="tasks-grid">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteTask}
                  isAdmin={isAdmin}
                  currentUserId={user.id}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default Dashboard;
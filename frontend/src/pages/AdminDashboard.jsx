import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import FilterButtons from '../components/FilterButtons';
import StatCard from '../components/StatCard';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('all'); // Filter by user

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  // Users list for filter dropdown
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, searchQuery, currentPage, userFilter]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {
        page: currentPage,
        limit: 12,
      };

      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      // Note: This is for admin view - you may need to add a separate endpoint
      // that returns all tasks with user information
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

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

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
            <h1>📊 Admin Dashboard</h1>
            <p className="dashboard-subtitle">
              Managing {totalTasks} tasks across all users
            </p>
          </div>
        </div>

        {/* Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatCard icon="⏳" count={stats.pending} label="Pending" variant="pending" />
          <StatCard icon="🔄" count={stats.inProgress} label="In Progress" variant="progress" />
          <StatCard icon="✅" count={stats.completed} label="Completed" variant="completed" />
          <StatCard icon="📈" count={totalTasks} label="Total Tasks" variant="total" />
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
              { label: 'All Status', value: 'all' },
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
                : 'No tasks in the system yet'}
            </p>
          </div>
        ) : (
          <>
            <div className="tasks-grid">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  isAdmin={true}
                  currentUserId={user.id}
                  showCreatedBy={true} // Show who created the task
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
    </div>
  );
};

export default AdminDashboard;

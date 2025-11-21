import '../styles/StatCard.css';

const StatCard = ({ icon, count, label, variant = 'default' }) => {
  return (
    <div className={`stat-card stat-${variant}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{count}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default StatCard;

import '../styles/FilterButtons.css';

const FilterButtons = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
          aria-pressed={activeFilter === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;

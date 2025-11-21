import '../styles/SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = '🔍 Search...' }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-control search-input"
        aria-label="Search"
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange({ target: { value: '' } })}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;

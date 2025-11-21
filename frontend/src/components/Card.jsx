import '../styles/Card.css';

const Card = ({ type = 'default', children, className = '' }) => {
  return (
    <div className={`card card-${type} ${className}`}>
      {children}
    </div>
  );
};

export default Card;

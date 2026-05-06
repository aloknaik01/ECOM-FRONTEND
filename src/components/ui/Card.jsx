const Card = ({ children, className = '', padding = 'md', hover = false }) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm ${paddings[padding]} ${
        hover ? 'hover:shadow-md transition-shadow duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
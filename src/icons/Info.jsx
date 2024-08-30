const Info = ({ width = 16, height = 16, className = '' }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`info-icon ${className}`}
      focusable="false" 
      role="img" 
      aria-hidden="true"
    >
      <g fill="none" fillRule="evenodd" stroke="currentColor">
        <circle cx="12" cy="12" r="11" strokeWidth="2" />
        <path 
          d="M13.55 7.15a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0zm-1.232 8.735h1.163v.538c0 .595-.482 1.077-1.077 1.077h-1.077a.818.818 0 0 1-.625-.29.862.862 0 0 1-.172-.68l.883-4.415H10.25v-.538c0-.595.482-1.077 1.077-1.077h1.077c.24 0 .47.107.624.29a.865.865 0 0 1 .173.68z" 
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default Info;
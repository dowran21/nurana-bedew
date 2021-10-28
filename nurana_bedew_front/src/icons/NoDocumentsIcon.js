function NoDocuments(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
      >
        <path d="M23 1h32v62H9V15z" />
        <path d="M9 15h14V1" />
      </g>
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M39 44L25 30M25 44l14-14"
      />
    </svg>
  );
}

export default NoDocuments;

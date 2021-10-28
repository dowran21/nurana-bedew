function UserCircleIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
      <path fill="currentColor" d="M5 5.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.5 0a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM1 7.5a6.5 6.5 0 1110.988 4.702A3.5 3.5 0 008.5 9h-2a3.5 3.5 0 00-3.488 3.202A6.482 6.482 0 011 7.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default UserCircleIcon;

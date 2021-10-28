function ImageAltIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
      <path fill="currentColor" d="M11 4h-1V3h1v1z" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 1.5A1.5 1.5 0 011.5 0h12A1.5 1.5 0 0115 1.5v12.01A1.5 1.5 0 0113.5 15h-12A1.5 1.5 0 010 13.5v-12zm14 6.787l-2.5-2.498-2.959 2.956L4.5 3.696 1 8.074V1.5a.5.5 0 01.5-.5h12a.5.5 0 01.5.5v6.787z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default ImageAltIcon;

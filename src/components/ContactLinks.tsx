interface ContactLinksProps {
  className?: string;
}

function ContactLinks({ className = '' }: ContactLinksProps) {
  return (
    <ul className={`contactLinks ${className}`}>
      <li>
        <a href="https://www.linkedin.com/in/alexander-maehl" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </li>
      <li>
        <a href="https://github.com/hybrio" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </li>
      <li>
        <a href="mailto:alexander.maehl@gmail.com">Email</a>
      </li>
    </ul>
  );
}

export default ContactLinks;

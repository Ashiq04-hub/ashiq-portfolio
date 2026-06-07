import type { SVGProps } from "react";

export function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="2.139" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
    </svg>
  );
}

export function TypeScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" opacity="0.15" />
      <path d="M3 3h18v18H3V3zm10.5 10.5v-.9h-5.4v.9h2.1v5.4h1.2v-5.4h2.1zm1.2-.9h1.2c0 .6.45.9 1.2.9.66 0 1.05-.3 1.05-.75 0-.48-.3-.66-1.2-.9l-.48-.12c-1.05-.27-1.59-.81-1.59-1.68 0-1.02.84-1.68 2.1-1.68 1.32 0 2.1.69 2.1 1.8h-1.2c0-.57-.36-.87-.93-.87-.54 0-.87.27-.87.69 0 .42.27.6 1.08.81l.48.12c1.17.3 1.71.84 1.71 1.74 0 1.08-.87 1.74-2.25 1.74-1.44 0-2.4-.72-2.4-1.8z" fill="white" />
    </svg>
  );
}

export function NodeJsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 2v20M3 7l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function PostgreSQLIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="12" cy="7" rx="8" ry="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 7v5c0 2.21 3.58 4 8 4s8-1.79 8-4V7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 12v5c0 2.21 3.58 4 8 4s8-1.79 8-4v-5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function MongoDBIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2C8.5 2 6 6 6 10c0 3.5 2 5.5 5 7l1 5 1-5c3-1.5 5-3.5 5-7 0-4-2.5-8-6-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function PythonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2C9 2 7 3.5 7 6v2h5v1H6C4 9 2 10.5 2 13s2 4 4 4h1v-2.5c0-1.5 1.5-2.5 3-2.5h4c1.5 0 3-1 3-2.5V6c0-2.5-2-4-5-4zm-1 3a1 1 0 110 2 1 1 0 010-2z" fill="currentColor" opacity="0.9" />
      <path d="M12 22c3 0 5-1.5 5-4v-2h-5v-1h6c2 0 4-1.5 4-4s-2-4-4-4h-1v2.5c0 1.5-1.5 2.5-3 2.5H10c-1.5 0-3 1-3 2.5V18c0 2.5 2 4 5 4zm1-3a1 1 0 110-2 1 1 0 010 2z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function NextJsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 5h1.5v6.5l5-6.5H18.5l-5 6.5 5 6.5H17l-6.5-8.5V7z" />
    </svg>
  );
}

export function TailwindIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.09 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.51 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 17 9.49 18.15 12 18.15c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.51 12 7 12z" fill="currentColor" />
    </svg>
  );
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

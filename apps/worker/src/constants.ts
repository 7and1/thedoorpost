// Job status messages
export const JobMessages = {
  QUEUED: "Job queued",
  CONNECTING: "Connecting to target website...",
  SCREENSHOTTING: "Capturing screenshot...",
  ANALYZING: "AI analyzing visual experience...",
  GENERATING_REPORT: "Generating final report...",
} as const;

// Error messages
export const ErrorMessages = {
  UNAUTHORIZED: "Unauthorized",
  UNAUTHORIZED_ORIGIN: "Unauthorized origin",
  INVALID_REQUEST: "Invalid request",
  RATE_LIMIT_EXCEEDED: "Rate limit exceeded",
  EMAIL_RATE_LIMIT_EXCEEDED: "Email rate limit exceeded",
  INVALID_URL: "Invalid URL",
  JOB_NOT_FOUND: "Job not found",
  NOT_FOUND: "Not found",
  SERVER_ERROR: "Server error",
} as const;

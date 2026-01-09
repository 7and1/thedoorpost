DROP TABLE IF EXISTS reports;

CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  score INTEGER,
  summary TEXT,
  full_report_json TEXT,
  screenshot_path TEXT,
  created_at INTEGER,
  user_email TEXT
);

CREATE INDEX idx_url ON reports(url);
CREATE INDEX idx_created_at ON reports(created_at);
CREATE INDEX idx_score ON reports(score);

CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  ip TEXT,
  user_agent TEXT,
  referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at);

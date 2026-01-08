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

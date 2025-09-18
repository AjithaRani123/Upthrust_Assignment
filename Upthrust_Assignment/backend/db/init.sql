CREATE TABLE workflow_runs (
  id SERIAL PRIMARY KEY,
  prompt TEXT NOT NULL,
  action TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  api_response TEXT NOT NULL,
  final_result TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table (auto-populated from OAuth)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  profile_picture TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admins table (manually add admin emails)
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User-submitted videos
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  blob_url TEXT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  file_size BIGINT,
  title VARCHAR(255) NOT NULL,
  map_name VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  moderated_at TIMESTAMP,
  moderated_by INTEGER REFERENCES users(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_map_name ON videos(map_name, status);
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON videos(user_id);

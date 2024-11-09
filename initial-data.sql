-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS polls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer1 VARCHAR(255) NOT NULL,
    answer2 VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    vote VARCHAR(255) NOT NULL,
    pollId INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (pollId) REFERENCES polls(id)
);

-- Insert example users
INSERT INTO users (username, email) VALUES 
('user1', 'user1@example.com'),
('user2', 'user2@example.com');

-- Insert an example poll
INSERT INTO polls (question, answer1, answer2) VALUES 
('What is your favorite city?', 'Cork', 'Dublin');

-- Insert some example votes for the poll
INSERT INTO votes (userId, vote, pollId) VALUES
(1, 'Cork', 1),  -- user1 votes for Cork
(2, 'Dublin', 1); -- user2 votes for Dublin

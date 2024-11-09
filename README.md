# Poll Voting API

A simple Node.js application for handling a polling system. Users can vote on polls, view real-time vote tallies, and delete their votes if needed.

## Features

- **Vote on a Poll**: Users can submit their votes for the available answers.
- **View Poll Results**: After voting, users can view the current percentage of votes for each answer.
- **Delete Vote**: Users can delete their vote and reset the tally.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [POST /api/vote](#post-apivote)
  - [DELETE /api/vote](#delete-apivote)
- [Initial Data](#initial-data)

## Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 14.x)
- **npm** (Node Package Manager)
- **MySQL** (for the database)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/cilliank/poll-voting-app.git
    cd poll-voting-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your MySQL database:

    - Create a database in MySQL for storing poll and vote data.
    - Run the `initial-data.sql` file (explained below) to insert an example poll and users.

4. Configure your environment:

    - Copy the `.env.example` to `.env`:

    ```bash
    cp .env.example .env
    ```

    - Update the `.env` file with your MySQL connection details and any other environment-specific configurations.

    Example `.env`:

    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    DB_NAME=poll_voting_db
    DB_PORT=3306
    ```

5. If you're using HTTPS (with an SSL certificate), update the paths in the `server.js` file to point to the correct `privkey.pem` and `fullchain.pem` files from your certificate.

## Initial Data

To quickly set up the database with an example poll and two example users, use the `initial-data.sql` file.

1. **Save the SQL script** into a file named `initial-data.sql`.

2. **Connect to MySQL**:
   - Open a terminal and connect to your MySQL database:
   
     ```bash
     mysql -u root -p
     ```

3. **Select the database**:
   - Use the following command to select your database:
   
     ```sql
     USE poll_voting_db;
     ```

4. **Run the `initial-data.sql` file**:
   - Run the SQL script to insert the example poll and users:
   
     ```sql
     SOURCE /path/to/initial-data.sql;
     ```

This will set up the database with the necessary tables and populate it with an example poll (`"What is your favorite city?"`) and two example users (`user1` and `user2`), as well as their respective votes.

## Usage

Start the server:

```bash
npm start
```

## Endpoints

#### Example Request to Vote:

**POST** `https://localhost:3000/api/vote`

```json
{
    "userId": 1,
    "vote": "Cork",
    "poll": 1
}
```

#### Example Response:
```json
{
    "message": "Vote submitted successfully.",
    "votePercentages": [
        {
            "vote": "Cork",
            "percentage": 8,
            "count": 1
        },
        {
            "vote": "Dublin",
            "percentage": 92,
            "count": 12
        }
    ]
}
```

#### Example Request to Delete Vote:

**DELETE** `https://localhost:3000/api/vote`

```json
{
    "userId": 1,
    "pollId": 1
}
```

#### Example Response:
```json
{
    "message": "Vote deleted successfully."
}
```
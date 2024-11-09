const db = require('../data/db');

class VoteService {
    async submitVote(userId, vote, poll) {
        const [existingVote] = await db.execute(
            'SELECT * FROM votes WHERE userId = ? AND pollId = ?',
            [userId, poll]
        );

        if (existingVote.length > 0) {
            throw new Error('NO, you cannot vote on the same poll twice.');
        }

        await db.execute(
            'INSERT INTO votes (userId, vote, pollId) VALUES (?, ?, ?)',
            [userId, vote, poll]
        );
    }

    async getVotes(pollId) {
        const [results] = await db.execute(
            'SELECT vote, COUNT(*) AS totalVotes FROM votes WHERE pollId = ? GROUP BY vote',
            [pollId]
        );
        return results;
    }

    async getPoll(pollId) {
        const [results] = await db.execute(
            'SELECT * FROM polls WHERE id = ?',
            [pollId]
        );
        return results;
    }

    async deleteVote(userId, pollId) {
        const [existingVote] = await db.execute(
            'SELECT * FROM votes WHERE userId = ? AND pollId = ?',
            [userId, pollId]
        );

        if (existingVote.length === 0) {
            throw new Error('Vote does not exist for this user and poll.');
        }

        // Delete the vote if it exists
        await db.execute(
            'DELETE FROM votes WHERE userId = ? AND pollId = ?',
            [userId, pollId]
        );
    }
}

module.exports = new VoteService();

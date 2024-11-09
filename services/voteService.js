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

        return await this.getVotePercentages(poll);
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

        await db.execute(
            'DELETE FROM votes WHERE userId = ? AND pollId = ?',
            [userId, pollId]
        );

        return await this.getVotePercentages(pollId);
    }

    async getVotePercentages(pollId) {

        const [totalVotes] = await db.execute(
            'SELECT COUNT(*) AS totalVotes FROM votes WHERE pollId = ?',
            [pollId]
        );
        const total = totalVotes[0].totalVotes;
    

        const [pollAnswers] = await db.execute(
            'SELECT answer1, answer2 FROM polls WHERE id = ?',
            [pollId]
        );
    
        // Assuming there are two answers: answer1 and answer2
        const answers = [pollAnswers[0].answer1, pollAnswers[0].answer2];
    
        const [voteCounts] = await db.execute(
            'SELECT vote, COUNT(*) AS count FROM votes WHERE pollId = ? GROUP BY vote',
            [pollId]
        );
    
        const voteMap = answers.reduce((acc, answer) => {
            acc[answer] = 0;  // Initialize all answers with 0 votes
            return acc;
        }, {});
    
        voteCounts.forEach(option => {
            if (voteMap.hasOwnProperty(option.vote)) {
                voteMap[option.vote] = option.count;
            }
        });
    
        const percentages = answers.map(answer => {
            const count = voteMap[answer];
            const percentage = total === 0 ? 0 : Math.round((count / total) * 100);
            return {
                vote: answer,
                percentage: percentage,
                count: count
            };
        });
    
        return percentages;
    }
    
}

module.exports = new VoteService();

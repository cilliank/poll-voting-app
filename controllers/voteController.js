const voteService = require('../services/voteService');

class VoteController {
    async submitVote(req, res) {
        const { userId, vote, poll } = req.body;

        if (!userId || !vote || !poll) {
            return res.status(400).json({ message: 'Missing userId, vote, or poll' });
        }

        try {
            const percentages = await voteService.submitVote(userId, vote, poll);
            res.status(201).json({
                message: 'Vote submitted successfully.',
                votePercentages: percentages
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getVotes(req, res) {
        const pollId = req.params.pollId;

        try {
            const results = await voteService.getVotes(pollId);
            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while retrieving votes.' });
        }
    }

    async getPoll(req, res) {
        const pollId = req.params.pollId;

        try {
            const results = await voteService.getPoll(pollId);
            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while retrieving poll.' });
        }
    }

    async deleteVote(req, res) {
        const { userId, pollId } = req.body;

        if (!userId || !pollId) {
            return res.status(400).json({ message: 'Missing userId or pollId' });
        }

        try {
            const percentages = await voteService.deleteVote(userId, pollId);
            res.status(200).json({
                message: 'Vote deleted successfully.',
                votePercentages: percentages
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new VoteController();

// __tests__/voteController.test.js
const voteController = require('../controllers/voteController');
const voteService = require('../services/voteService');

jest.mock('../services/voteService');

describe('VoteController', () => {
    const req = {
        body: {
            userId: 1,
            vote: 'Option A',
            poll: 1,
        },
        params: {
            pollId: 1,
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should submit a vote successfully', async () => {
        voteService.submitVote.mockResolvedValue();

        await voteController.submitVote(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Vote submitted successfully.' });
    });

    test('should handle error when submitting a vote', async () => {
        voteService.submitVote.mockRejectedValue(new Error('NO, you cannot vote on the same poll twice.'));

        await voteController.submitVote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'NO, you cannot vote on the same poll twice.' });
    });

    test('should retrieve votes for a poll', async () => {
        const mockResults = [{ vote: 'Option A', totalVotes: 5 }];
        voteService.getVotes.mockResolvedValue(mockResults);

        await voteController.getVotes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResults);
    });

    test('should handle error when retrieving votes', async () => {
        voteService.getVotes.mockRejectedValue(new Error('Database error'));

        await voteController.getVotes(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'An error occurred while retrieving votes.' });
    });
});

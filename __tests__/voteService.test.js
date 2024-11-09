
const voteService = require('../services/voteService');
const db = require('../data/db');

jest.mock('../data/db');

describe('VoteService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should submit a vote successfully', async () => {
        db.execute.mockResolvedValueOnce([[]]);
        db.execute.mockResolvedValueOnce();

        await voteService.submitVote(1, 'Option A', 1);

        expect(db.execute).toHaveBeenCalledTimes(2);
        expect(db.execute).toHaveBeenCalledWith(
            'INSERT INTO votes (userId, vote, pollId) VALUES (?, ?, ?)',
            [1, 'Option A', 1]
        );
    });

    test('should throw an error if user tries to vote again on the same poll', async () => {
        db.execute.mockResolvedValueOnce([[{ id: 1 }]]);

        await expect(voteService.submitVote(1, 'Option A', 1)).rejects.toThrow(
            'NO, you cannot vote on the same poll twice.'
        );

        expect(db.execute).toHaveBeenCalledTimes(1);
    });

    test('should retrieve votes for a poll', async () => {
        const mockResults = [{ vote: 'Option A', totalVotes: 5 }];
        db.execute.mockResolvedValueOnce([mockResults]);

        const results = await voteService.getVotes(1);
        
        expect(results).toEqual(mockResults);
        expect(db.execute).toHaveBeenCalledWith(
            'SELECT vote, COUNT(*) AS totalVotes FROM votes WHERE pollId = ? GROUP BY vote',
            [1]
        );
    });
});

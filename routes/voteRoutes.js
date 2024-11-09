const express = require('express');
const voteController = require('../controllers/voteController');

const router = express.Router();

router.post('/vote', (req, res) => voteController.submitVote(req, res));
router.get('/votes/:pollId', (req, res) => voteController.getVotes(req, res));
router.get('/polls/:pollId', (req, res) => voteController.getPoll(req, res));

router.delete('/vote', (req, res) => voteController.deleteVote(req, res));

module.exports = router;

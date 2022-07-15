const Score = require("./score.model");

const getScore = gameId => Score.find({ gameId });

function postScore({ gameId, userId, score }) {
    const newScore = new Score({ gameId, userId, score })
    return newScore.save()
}

function updateScore(gameId, userId, score) {
    return Score.findOneAndUpdate({ gameId, userId }, { score }, { new: true });
}

const deleteScore = (gameId, userId) => Score.findOneAndDelete({ gameId, userId });

module.exports = { getScore, postScore, updateScore, deleteScore }
const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
    gameId: { type: String, required: true, trim: true },
    userId: { type: String, required: true, trim: true },
    score: { type: Number, required: true, trim: true }
})
scoreSchema.index({ gameId: 1, userId: 1 }, { unique: true });

const Score = model('Score', scoreSchema);

module.exports = Score;
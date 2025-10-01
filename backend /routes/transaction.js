const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newTransaction = new Transaction({ ...req.body, user: req.user.id });
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Transaction.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

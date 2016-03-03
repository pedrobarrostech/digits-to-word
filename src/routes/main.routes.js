import express from 'express';
const router = express.Router();
import DigitsToWord from '../digits-to-word';

const test = new DigitsToWord;

router.get('/', (req, res) => {
  res.send(console.log(test.spellItOut(45)));
});

export default router;

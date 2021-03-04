import express from 'express';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

// Get all restaurants
router.get('/', (_, res) => {
  res.json('works');
});

// Get restaurant by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ requested_id: `${id}` });
});

// Create new restaurant
router.post('/', (req, res) => {
  const { name, location, price_range } = req.body;

  res.status(201).json({ restaurant: { name, location, price_range } });
});

router.put('/', (req, res) => {
  const { name, location, price_range } = req.body;

  res.status(201).json({ restaurant: { name, location, price_range } });
});

router.delete('/', (req, res) => {
  const { name, location, price_range } = req.body;

  res.status(204);
});

export default router;

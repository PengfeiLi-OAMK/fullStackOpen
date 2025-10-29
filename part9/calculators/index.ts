import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello, world!');
});
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(height, weight);
  return res.json({
    weight, 
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  const { dailyExercises, target } = req.body as { dailyExercises: unknown; target: unknown };
  if (dailyExercises == undefined || target == undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (typeof target === 'string' && target.trim() === '') {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  if (
    !Array.isArray(dailyExercises) ||
    !dailyExercises.length ||
    !Number.isFinite(Number(target))||
    Number(target) < 0
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  if (dailyExercises.some((v) => typeof v === 'string' && v.trim() === '')) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const dailyExercisesNumbers = dailyExercises.map((v) => Number(v));
  if (dailyExercisesNumbers.some(n=>!Number.isFinite(n) || n < 0)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const result = calculateExercises(dailyExercisesNumbers, Number(target));
  return res.json(result);

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

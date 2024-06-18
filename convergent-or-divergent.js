const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

random.setSeed(random.getRandomSeed());
const settings = {
    suffix: random.getSeed(),
    dimensions: [2048, 2048],
};

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  const symbols = ['=', '.', '-', ];

  const createGrid = () => {
    const points = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const u = count < 1 ? 0.5 : i / (count - 1);
        const v = count < 1 ? 0.5 : j / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.2;
        points.push({
          position: [u, v],
          radius,
          color: random.pick(palette),
          rotation: random.noise2D(u, v),
          symbol: random.pick(symbols),
        });
      }
    }
    return points;
  };

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    points.forEach((data) => {
      const {
        position,
        radius,
        color,
        rotation,
        symbol
      } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px 'Verdana'`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText(symbol, 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);

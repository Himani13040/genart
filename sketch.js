const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: 'A4',
  pixelsPerInch: 300
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width/2, height/2, 300, 0, Math.PI * 2, false);
    context.fillStyle = 'violet';
    context.fill();

    context.lineWidth = 30;
    context.strokeStyle = 'purple';
    context.stroke();
  };
};

canvasSketch(sketch, settings);

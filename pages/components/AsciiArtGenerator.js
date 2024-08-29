// components/AsciiArtGenerator.js

import React, { useState, useRef } from 'react';

const ASCII_CHARS = '@%#*+=-:. ';

// Convert a pixel's RGB to an ASCII character
const pixelToAscii = (r, g, b) => {
  const brightness = (r + g + b) / 3;
  const asciiIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
  return ASCII_CHARS[asciiIndex];
};

// Convert image data to ASCII art
const imageToAscii = (imageData) => {
  const { data, width } = imageData;
  let asciiArt = '';

  for (let y = 0; y < imageData.height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      asciiArt += pixelToAscii(r, g, b);
    }
    asciiArt += '\n';
  }

  return asciiArt;
};

const AsciiArtGenerator = () => {
  const [asciiArt, setAsciiArt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const canvasRef = useRef(null);

  // Handle image file input
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate ASCII art from the uploaded image
  const generateAsciiArt = () => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const ascii = imageToAscii(imageData);
      setAsciiArt(ascii);
    };
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={generateAsciiArt}>Generate ASCII Art</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{asciiArt}</pre>
    </div>
  );
};

export default AsciiArtGenerator;

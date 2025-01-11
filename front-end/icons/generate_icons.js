import fs from 'fs';
import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [16, 48, 128];

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#4A90E2';
    ctx.fillRect(0, 0, size, size);

    // Text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('M', size/2, size/2);

    return canvas.toBuffer('image/png');
}

// Create icons directory if it doesn't exist
if (!fs.existsSync(__dirname)) {
    fs.mkdirSync(__dirname, { recursive: true });
}

// Generate icons for each size
sizes.forEach(size => {
    const buffer = generateIcon(size);
    fs.writeFileSync(`${__dirname}/icon${size}.png`, buffer);
    console.log(`Generated icon${size}.png`);
});

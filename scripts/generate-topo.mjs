import fs from 'fs';
import { contours } from 'd3-contour';
import { createNoise2D } from 'simplex-noise';
import simplify from 'simplify-js';

const width = 600;
const height = 600;
const values = new Float64Array(width * height);

const noise2D = createNoise2D();

// Function to get noise with multiple octaves
function fbm(x, y, octaves) {
  let v = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < octaves; i++) {
    v += noise2D(x * frequency, y * frequency) * amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return v;
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    // Map x, y to a 0-1200 coordinate system to keep the same features
    let cx = (x / width) * 1200;
    let cy = (y / height) * 1200;

    // Base terrain (rolling hills)
    let nx = cx / 600;
    let ny = cy / 600;
    let elevation = fbm(nx, ny, 5) * 60 + 150;

    // Winding river path (Rocky River meanders significantly)
    let riverX = 600 
               + Math.sin(cy / 120) * 250 
               + Math.cos(cy / 50) * 60 
               + fbm(0, cy / 200, 3) * 150;
    
    // Distance to river
    let dist = Math.abs(cx - riverX);
    
    // Valley profile
    // Steep cliffs: elevation drops sharply when close to the river
    let valleyWidth = 180;
    let valleyDepth = 100;
    
    // Add some noise to the distance to make the cliffs jagged (shale)
    let cliffNoise = fbm(cx / 60, cy / 60, 4) * 40;
    let effectiveDist = dist + cliffNoise;
    
    if (effectiveDist < valleyWidth) {
      // Inside the valley
      let t = Math.max(0, effectiveDist / valleyWidth);
      // Smooth drop (smoothstep)
      let drop = t * t * (3 - 2 * t); 
      
      // Make the cliffs steeper by adjusting the drop curve
      // A power function makes the bottom flatter and walls steeper
      drop = Math.pow(drop, 0.6);
      
      elevation -= valleyDepth * (1 - drop);
      
      // Add some high-frequency noise for the shale texture on the cliffs
      if (t > 0.05 && t < 0.8) {
        elevation += fbm(cx / 15, cy / 15, 4) * 8;
      }
    }
    
    // Add a secondary smaller tributary river
    let tributaryY = 600 + Math.sin(cx / 100) * 100 + fbm(cx / 150, 0, 3) * 80;
    let distTrib = Math.abs(cy - tributaryY);
    // Only carve tributary if it's on the left side of the main river
    if (cx < riverX) {
      let tribWidth = 80;
      let tribDepth = 50;
      let tribNoise = fbm(cx / 40, cy / 40, 3) * 20;
      let effDistTrib = distTrib + tribNoise;
      
      if (effDistTrib < tribWidth) {
        let t2 = Math.max(0, effDistTrib / tribWidth);
        let drop2 = t2 * t2 * (3 - 2 * t2);
        drop2 = Math.pow(drop2, 0.7);
        
        // Blend the tributary depth with the main elevation
        let tribElevation = elevation - tribDepth * (1 - drop2);
        elevation = Math.min(elevation, tribElevation);
      }
    }

    values[y * width + x] = elevation;
  }
}

// Generate contours
const numLevels = 80; // More levels for denser topography
let min = Infinity;
let max = -Infinity;
for (let i = 0; i < values.length; i++) {
  if (values[i] < min) min = values[i];
  if (values[i] > max) max = values[i];
}
const thresholds = Array.from({length: numLevels}, (_, i) => min + (max - min) * (i / (numLevels - 1)));

const contourGenerator = contours()
  .size([width, height])
  .thresholds(thresholds);

const contourData = contourGenerator(values);

// Generate SVG
let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">\n`;
svg += `<style>
  path {
    fill: none;
    stroke: rgba(0, 0, 0, 0.15);
    stroke-width: 0.5;
    stroke-linejoin: round;
  }
  /* Index contour lines (every 5th line is thicker) */
  path:nth-child(5n) {
    stroke: rgba(0, 0, 0, 0.3);
    stroke-width: 1;
  }
</style>\n`;

contourData.forEach((contour, index) => {
  let d = "";
  for (const polygon of contour.coordinates) {
    for (const ring of polygon) {
      d += `M${ring.map(p => p.map(v => Math.round(v)).join(',')).join('L')}Z `;
    }
  }
  if (d) {
    svg += `  <path d="${d.trim()}" />\n`;
  }
});

svg += `</svg>`;

fs.writeFileSync('public/topo.svg', svg);
console.log('SVG generated at public/topo.svg');

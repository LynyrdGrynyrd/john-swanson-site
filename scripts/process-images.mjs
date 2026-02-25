import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const source = join(projectRoot, 'headshot_studio_google_enhanced.jpeg');
const publicDir = join(projectRoot, 'public');

async function processImages() {
  console.log('Processing headshot...');
  console.log('Source:', source);

  // Hero headshot: 800x1200, JPEG quality 82
  // Extracted manually to center the subject better (moved up and to the right)
  await sharp(source)
    .extract({ left: 250, top: 300, width: 3800, height: 5700 })
    .resize(800, 1200)
    .jpeg({ quality: 82 })
    .toFile(join(publicDir, 'headshot.jpg'));

  const headshotStats = await sharp(join(publicDir, 'headshot.jpg')).metadata();
  console.log(`headshot.jpg: ${headshotStats.width}x${headshotStats.height}`);

  // OpenGraph image: 1200x630, center-top crop, quality 85
  await sharp(source)
    .resize(1200, 630, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 85 })
    .toFile(join(publicDir, 'og-image.jpg'));

  const ogStats = await sharp(join(publicDir, 'og-image.jpg')).metadata();
  console.log(`og-image.jpg: ${ogStats.width}x${ogStats.height}`);

  // Report file sizes
  const { statSync } = await import('fs');
  const headshotSize = statSync(join(publicDir, 'headshot.jpg')).size;
  const ogSize = statSync(join(publicDir, 'og-image.jpg')).size;
  console.log(`\nheadshot.jpg: ${(headshotSize / 1024).toFixed(0)} KB`);
  console.log(`og-image.jpg: ${(ogSize / 1024).toFixed(0)} KB`);
  console.log('\nDone!');
}

processImages().catch(console.error);

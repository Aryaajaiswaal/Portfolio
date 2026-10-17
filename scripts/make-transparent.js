import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processCutout() {
  const inputPath = path.resolve('src/assets/images/new_aryaa_cutout_1792176799640.jpg');
  const outputPath = path.resolve('src/assets/images/aryaa_portrait_cutout.png');

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let qHead = 0;
  let qTail = 0;

  const bgThreshold = 18;
  const edgeThreshold = 40;

  function getPixelBrightness(x, y) {
    const idx = (y * width + x) * channels;
    return Math.max(data[idx], data[idx + 1], data[idx + 2]);
  }

  // Seed with border pixels along top, left, right edges
  for (let x = 0; x < width; x++) {
    if (getPixelBrightness(x, 0) <= edgeThreshold) {
      const idx = x;
      visited[idx] = 1;
      queue[qTail++] = idx;
    }
  }

  for (let y = 0; y < height; y++) {
    if (getPixelBrightness(0, y) <= edgeThreshold) {
      const idx = y * width;
      if (!visited[idx]) {
        visited[idx] = 1;
        queue[qTail++] = idx;
      }
    }
    if (getPixelBrightness(width - 1, y) <= edgeThreshold) {
      const idx = y * width + (width - 1);
      if (!visited[idx]) {
        visited[idx] = 1;
        queue[qTail++] = idx;
      }
    }
  }

  // BFS flood fill
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (qHead < qTail) {
    const curr = queue[qHead++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    for (let d = 0; d < 4; d++) {
      const nx = cx + dx[d];
      const ny = cy + dy[d];

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx]) {
          const brightness = getPixelBrightness(nx, ny);
          if (brightness <= edgeThreshold) {
            visited[nIdx] = 1;
            queue[qTail++] = nIdx;
          }
        }
      }
    }
  }

  // Now set alpha based on visited pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = y * width + x;
      const dataIndex = pixelIndex * channels;

      if (visited[pixelIndex]) {
        const brightness = Math.max(data[dataIndex], data[dataIndex + 1], data[dataIndex + 2]);
        if (brightness <= bgThreshold) {
          data[dataIndex + 3] = 0; // completely transparent
        } else {
          const alpha = Math.round(((brightness - bgThreshold) / (edgeThreshold - bgThreshold)) * 255);
          data[dataIndex + 3] = Math.min(255, Math.max(0, alpha));
        }
      } else {
        data[dataIndex + 3] = 255;
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log('Saved transparent cutout to:', outputPath);
}

processCutout().catch(console.error);

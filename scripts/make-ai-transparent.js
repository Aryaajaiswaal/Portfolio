import sharp from 'sharp';
import path from 'path';

async function makeTransparent(inputFileName, outputFileName, bgThreshold = 14, edgeThreshold = 38) {
  const inputPath = path.resolve('src/assets/images', inputFileName);
  const outputPath = path.resolve('src/assets/images', outputFileName);

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let qHead = 0;
  let qTail = 0;

  function getBrightness(x, y) {
    const idx = (y * width + x) * channels;
    return Math.max(data[idx], data[idx + 1], data[idx + 2]);
  }

  // Seed with border pixels along all 4 edges
  for (let x = 0; x < width; x++) {
    if (getBrightness(x, 0) <= edgeThreshold) {
      visited[x] = 1;
      queue[qTail++] = x;
    }
    const bIdx = (height - 1) * width + x;
    if (getBrightness(x, height - 1) <= edgeThreshold) {
      visited[bIdx] = 1;
      queue[qTail++] = bIdx;
    }
  }

  for (let y = 0; y < height; y++) {
    const lIdx = y * width;
    if (getBrightness(0, y) <= edgeThreshold) {
      if (!visited[lIdx]) {
        visited[lIdx] = 1;
        queue[qTail++] = lIdx;
      }
    }
    const rIdx = y * width + (width - 1);
    if (getBrightness(width - 1, y) <= edgeThreshold) {
      if (!visited[rIdx]) {
        visited[rIdx] = 1;
        queue[qTail++] = rIdx;
      }
    }
  }

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
          const brightness = getBrightness(nx, ny);
          if (brightness <= edgeThreshold) {
            visited[nIdx] = 1;
            queue[qTail++] = nIdx;
          }
        }
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = y * width + x;
      const dataIndex = pixelIndex * channels;

      if (visited[pixelIndex]) {
        const brightness = Math.max(data[dataIndex], data[dataIndex + 1], data[dataIndex + 2]);
        if (brightness <= bgThreshold) {
          data[dataIndex + 3] = 0;
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
    raw: { width, height, channels },
  })
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log(`Created transparent PNG: ${outputFileName}`);
}

async function run() {
  await makeTransparent('ai_neural_brain.jpg', 'ai_neural_brain.png', 12, 35);
  await makeTransparent('ai_chip_processor.jpg', 'ai_chip_processor.png', 12, 35);
  await makeTransparent('ai_vector_lattice.jpg', 'ai_vector_lattice.png', 12, 35);
  await makeTransparent('ai_agent_orb.jpg', 'ai_agent_orb.png', 12, 35);
}

run().catch(console.error);

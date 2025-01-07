import fs from 'fs-extra';
import path from 'path';

const THUMB_DIR = path.join(__dirname, '../../thumbnails');

export async function setThumb(userId: number, buffer: Buffer): Promise<boolean> {
  try {
    await fs.ensureDir(THUMB_DIR);
    const thumbPath = path.join(THUMB_DIR, `${userId}.jpg`);
    await fs.writeFile(thumbPath, buffer);
    return true;
  } catch (error) {
    throw new Error(`Failed to save thumbnail: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getThumb(userId: number): Promise<string | null> {
  try {
    const thumbPath = path.join(THUMB_DIR, `${userId}.jpg`);
    if (await fs.pathExists(thumbPath)) {
      return thumbPath;
    }
    return null;
  } catch {
    return null;
  }
}
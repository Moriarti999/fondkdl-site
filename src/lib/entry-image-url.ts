/** Keystatic image field может быть строкой или объектом с src — приводим к URL для Next/Image. */
export function entryImageUrl(image: unknown): string | null {
  if (typeof image === 'string') return image;
  if (image && typeof image === 'object' && 'src' in image) {
    const src = (image as { src?: unknown }).src;
    return typeof src === 'string' ? src : null;
  }
  return null;
}

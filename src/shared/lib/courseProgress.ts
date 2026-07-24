export function getProgress(value: number) {
  if (!value || value < 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

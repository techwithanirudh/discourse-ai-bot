export const memoriesPrompt = (memories: string) => {
  const trimmed = memories.trim();
  if (!trimmed) {
    return "";
  }

  return `<memories>${trimmed}</memories>`;
};

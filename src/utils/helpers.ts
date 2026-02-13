export const normalizeString = (str: string) => str.toLowerCase().trim();

export const normalizeStrings = (str: string[]) => str.map(normalizeString);

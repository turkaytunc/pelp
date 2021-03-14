export const convertFirstLetterToUpperCase = (word: string): string => {
  const trimmedWord = word.trim();
  const firstLetter = trimmedWord[0];

  if (trimmedWord.length < 2) return trimmedWord.toUpperCase();

  const newWord = `${firstLetter.toUpperCase()}${trimmedWord.slice(1)}`;
  return newWord;
};

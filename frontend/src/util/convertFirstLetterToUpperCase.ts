export const convertFirstLetterToUpperCase = (word: string): string => {
  if (word.length < 2) return word.toUpperCase();
  const firstLetter = word[0];
  const newWord = `${firstLetter.toUpperCase()}${word.trim().slice(1)}`;
  return newWord;
};

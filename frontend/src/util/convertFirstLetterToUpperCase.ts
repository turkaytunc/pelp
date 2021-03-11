export const convertFirstLetterToUpperCase = (word: string): string => {
  const firstLetter = word[0];
  const newWord = `${firstLetter.toUpperCase()}${word.trim().slice(1)}`;
  return newWord;
};

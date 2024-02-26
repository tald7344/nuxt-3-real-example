// Value Parameters : must be the first letter is Uppercase as 'Title'
export const useTranslate = (object, value) => {
  const word = value + '_' + useLang().value;
  return object[`${word}`]
} 
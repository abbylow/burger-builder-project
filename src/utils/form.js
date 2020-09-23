// Upper case the first letter of a sentence
export const ucFirst = value => {
  if (value === '' || value === undefined || value === null) return value;
  return value.substring(0, 1).toUpperCase() + value.substring(1);
};

// capitalise first letter of every word
export const capitalise = value => {
  if (value === '' || value === undefined || value === null) return value;
  let parts = value.split(' ');
  for (let i = 0; i < parts.length; i++) {
    parts[i] = ucFirst(parts[i]);
  }
  return parts.join(' ');
};

export const lcKeywords = value => {
  if (value === '' || value === undefined || value === null) return value;
  const keywords = ['of', 'by', 'for', 'to'];
  let parts = value.split(' ');
  for (let i = 0; i < parts.length; i++) {
    if (keywords.includes(parts[i].toLowerCase())) {
      parts[i] = parts[i].toLowerCase();
    }
  }
  return parts.join(' ');
};
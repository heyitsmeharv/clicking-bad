export const removeRange = (arr, startIndex, endIndex) => {
  if (startIndex < 0 || endIndex >= arr.length || startIndex > endIndex) {
    throw new Error('Invalid range');
  }
  
  const newArr = [...arr];
  newArr.splice(startIndex, endIndex - startIndex + 1);
  return newArr;
};

export const remove = (arr, item) => {
  const newArr = [...arr];
  newArr.splice(newArr.findIndex(i => i.id === item), 1);
  return newArr;
};

let newIndex = 0;
export const add = (arr, title, message, status) => {
  newIndex++;
  const newObj = {
    index: arr.index = newIndex++,
    title,
    message,
    status,
  }
  arr.push(newObj);
  return arr;
};

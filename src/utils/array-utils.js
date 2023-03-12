export const remove = (arr, item) => {
  const newArr = [...arr];
  newArr.splice(newArr.findIndex(i => i === item), 1);
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

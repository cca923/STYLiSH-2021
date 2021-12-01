const toHex = (int) => {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

const parseColor = (color) => {
  const arr = [];
  color.replace(/[\d+.]+/g, (v) => {
    arr.push(parseFloat(v));
  });
  return `${arr.slice(0, 3).map(toHex).join("").toUpperCase()}`;
};

export default parseColor;

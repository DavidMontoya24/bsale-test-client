const priceTransformer = (price, soles = false) => {
  const arr = price.toString().split("");
  const rev = arr.reverse();
  rev.splice(2, 0, ",");
  const res = rev.reverse().join("");
  if (arr.length <= 3) {
    return `$ ${price}`;
  } else {
    return `$ ${res}`;
  }
};

export { priceTransformer };

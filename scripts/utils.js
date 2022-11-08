const priceTransformer = (price, soles = false) => {
  const arr = price.toString().split("");
  const rev = arr.reverse();
  rev.splice(3, 0, ",");
  const res = rev.reverse().join("");
  if (arr.length <= 4) {
    return `$ ${price}`;
  } else {
    return `$ ${res}`;
  }
};

export { priceTransformer };

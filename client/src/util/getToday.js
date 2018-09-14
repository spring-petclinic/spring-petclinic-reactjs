export default () => {
  const d = new Date(Date.now());
  const month = `${d.getMonth() + 1}`;

  return `${d.getFullYear()}-${
    month.length === 1 ? `0${month}` : month
  }-${d.getDate()}`;
};

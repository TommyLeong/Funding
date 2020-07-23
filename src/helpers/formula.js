const sortAscending = (objectGroup, key) =>
  objectGroup.sort((a, b) => (a[key] > b[key] ? 1 : -1));

const sortDescending = (objectGroup, key) =>
  objectGroup.sort((a, b) => (a[key] < b[key] ? 1 : -1));

export { sortAscending, sortDescending };

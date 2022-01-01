import _ from "lodash"; // underscore. it is used to generate arrays

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
  //   _.slice(items, startIndex) // To slice the array from the starting index
  //   _.take() // take the required chunk of array from the total items
}

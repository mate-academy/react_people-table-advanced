/* eslint-disable*/
export const getSortParams = (sort: string, order: string): any => {
  if (sort && order === 'asc') {
    return { sort, order: 'desc' };
  } else if (sort && order === 'desc') {
    return { sort: null, order: null };
  } else {
    return { sort, order: 'asc' };
  }
};

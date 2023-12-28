import { Location } from 'react-router-dom';

export const getHrefForLink = (
  field: string,
  value: string,
  location: Location<any>,
) => {
  const query = location.search.slice(1);

  const filteredQuery = query.split('&')
    .filter(param => !param.includes(field));

  if (value) {
    filteredQuery.push(`${field}=${value}`);
  }

  return `${location.pathname}?${filteredQuery.join('&')}`;
};

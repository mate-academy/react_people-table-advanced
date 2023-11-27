import { useSearchParams } from 'react-router-dom';

export function updateSearch(params:{
  [key:string]:string[] | string | null }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchParams] = useSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      searchParams.delete(key);
    } else if (Array.isArray(value)) {
      if (searchParams.getAll(key).includes(value[0])) {
        const newArrParams = [...searchParams.getAll(key)
          .filter((cent) => cent !== value[0])];

        searchParams.delete(key);
        newArrParams.forEach(part => {
          searchParams.append(key, part);
        });
      } else {
        searchParams.append(key, value[0]);
      }
    } else if (key === 'sort' && !searchParams.get('sort')) {
      searchParams.set(key, value);
    } else if (key === 'sort' && (searchParams.get('sort')) === value) {
      if (!searchParams.get('order')) {
        searchParams.set('order', 'desc');
      } else if (searchParams.get('order') === 'desc') {
        searchParams.delete('sort');
        searchParams.delete('order');
      }
    } else if (key === 'sort' && (searchParams.get('sort')) !== value) {
      searchParams.delete('sort');
      searchParams.delete('order');
      searchParams.set('sort', value);
    } else {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
}

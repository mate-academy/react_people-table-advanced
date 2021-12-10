import { useHistory, useLocation } from 'react-router-dom';

export const useQueryChanger = () => {
  const history = useHistory();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (query: string) => {
    searchParams.set('query', query);

    history.push({
      search: query
        ? searchParams.toString()
        : '',
    });
  };
};

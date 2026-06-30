import { useParams, useSearchParams } from 'react-router-dom';

type SearchType = {
  sort: string | null;
  order: string | null;
  centuries: string[] | null;
  sex: string | null;
  query: string | null;
};

export const useProjectParams = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const search: SearchType = {
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
    centuries: searchParams.getAll('centuries'),
    sex: searchParams.get('sex'),
    query: searchParams.get('query'),
  };

  return { slug, search, searchParams, setSearchParams };
};

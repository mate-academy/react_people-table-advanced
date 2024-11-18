import { useParams, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const usePeopleRouting = () => {
  const { personId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const name = searchParams.get('name') || '';

  const centuries = searchParams.getAll('centuries') || [];

  const toogleCenturies = (century: string) =>
    centuries.includes(century)
      ? centuries.filter(value => value !== century)
      : [...centuries, century];

  const handleChangeName = (name: string) => {
    if (!name) {
      setSearchParams(getSearchWith(searchParams, { name: null }));
    } else {
      setSearchParams(getSearchWith(searchParams, { name }));
    }
  };

  return {
    personId,
    sex,
    centuries,
    name,
    searchParams,
    toogleCenturies,
    handleChangeName,
  };
};

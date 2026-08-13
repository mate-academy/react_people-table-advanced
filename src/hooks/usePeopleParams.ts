import { useSearchParams } from 'react-router-dom';
import { SortFields } from '../types/SortFields';
import { Genders } from '../types/Genders';
import { CENTURIES } from '../helpers/people';

interface PeopleParams {
  sort: SortFields | '';
  order: 'desc' | '';
  sex: Genders | '';
  query: string;
  centuries: string[];
}

export const usePeopleParams = (): PeopleParams => {
  const [searchParams] = useSearchParams();

  const rawSort = searchParams.get('sort');
  const sort = Object.values(SortFields).includes(rawSort as SortFields)
    ? (rawSort as SortFields)
    : '';

  const rawOrder = searchParams.get('order');
  const order = rawOrder === 'desc' ? rawOrder : '';

  const rawSex = searchParams.get('sex');
  const sex = Object.values(Genders).includes(rawSex as Genders)
    ? (rawSex as Genders)
    : '';

  const rawCenturies = searchParams.getAll('centuries');
  const centuries = rawCenturies.filter(century =>
    CENTURIES.includes(+century),
  );

  const query = searchParams.get('query') || '';

  return { sort, order, sex, query, centuries };
};

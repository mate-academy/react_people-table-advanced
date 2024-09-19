import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable, PeopleTableProps } from './PeopleTable';
import { filterPeople } from '../../utils/filterPeople';
import { sortPeople } from '../../utils/sortPeople';

interface Props extends PeopleTableProps {
  isLoading: boolean;
  error: string | null;
}

export const PeopleTableContainer: React.FC<Props> = ({
  error,
  isLoading,
  people,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  const filteredPeople = filterPeople(people, { sex, query, centuries });

  if (!filteredPeople.length) {
    <p data-cy="noPeopleMessage">
      There are no people matching the current search criteria
    </p>;
  }

  const sortedPeople = sortPeople(filteredPeople, { sort, order });

  return <PeopleTable people={sortedPeople} />;
};

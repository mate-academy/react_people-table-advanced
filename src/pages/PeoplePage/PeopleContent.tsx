import { Person } from '../../types';
import PeopleTable from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';
import { useParams, useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../../utils/peopleHelper';

interface Props {
  isLoading: boolean;
  hasError: boolean;
  people: Person[];
}

const PeopleContent = ({ people, isLoading, hasError }: Props) => {
  const [searchParams] = useSearchParams();

  const { slug } = useParams();

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  const visiblePeople = getFilteredPeople(people, searchParams);

  return (
    <>
      <PeopleTable
        people={visiblePeople}
        selectedPersonSlug={slug}
        searchParams={searchParams}
      />
      {!people.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};

export default PeopleContent;

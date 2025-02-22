import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PersonItem } from './PersonItems';
import { preparedPeopleInfo } from '../helpers/preparedPeopleInfo';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeopleList } from '../helpers/getFilteredPeopleList';
type Props = {
  onSetIsPeopleDownload: (isDownload: boolean) => void;
};

export const PeopleTableContainer: React.FC<Props> = ({
  onSetIsPeopleDownload,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .then(() => onSetIsPeopleDownload(true))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const fullPeopleInfo = useMemo(() => preparedPeopleInfo(people), [people]);

  const filteredPeopleList = useMemo(
    () => getFilteredPeopleList(fullPeopleInfo, searchParams),
    [fullPeopleInfo, searchParams],
  );

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {!!people.length ? (
        <PeopleTable>
          {filteredPeopleList.map(person => (
            <PersonItem key={person.slug} person={person} />
          ))}
        </PeopleTable>
      ) : (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};

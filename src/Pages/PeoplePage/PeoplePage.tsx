import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { getFilteredPeople, preparedPeople } from '../../utils/dataHelpers';
import { PeoplePageContent } from './PeoplePageContent';

export const PeoplePage = () => {
  const { slug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);

      try {
        const peopleFromServer = await getPeople();
        const peopleWithParents = preparedPeople(peopleFromServer);

        setPeople(peopleWithParents);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const visiblePeople = useMemo(() => (
    getFilteredPeople(searchParams, people)), [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading
            ? <Loader />
            : (
              <PeoplePageContent
                noDataOnServer={!people.length}
                hasError={hasError}
                people={visiblePeople}
                slug={slug}
              />
            )}
        </div>
      </div>
    </>
  );
};

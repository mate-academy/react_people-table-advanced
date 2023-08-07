import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../../components/PeopleFilter';
import { PeopleTable } from '../../components/PeopleTable';
import { Person, SortType } from '../../types';
import { getPeople } from '../../api';
import { filterPeople, sortPeople } from '../../utils/peopleService';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { selectedSlug } = useParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Some loading failure occured');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = filterPeople(people, centuries, query, sex);

  const visiblePeople = sortPeople(filteredPeople, sort as SortType, !!order);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="block">
              <PeopleTable
                people={visiblePeople}
                errorMessage={errorMessage}
                isLoading={isLoading}
                isNoMatchingPeople={
                  people.length > 0 && visiblePeople.length === 0
                }
                selectedSlug={selectedSlug}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

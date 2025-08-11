import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTabel/PeopleTable';
import { PeopleFilters } from '../PeopleTabel/PeopleFilters';
import { Person } from '../../types/Person';
import { ErrorTypes } from '../../types/ErrorTypes';
import * as utils from '../../utils/infoHelper';
import { filterPeople, sortPeople } from '../../utils/filterSortHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorTypes>(ErrorTypes.NO_ERROR);

  const [searchParams] = useSearchParams();

  // const [query, setQuery] = useState('');
  // const [gender, setGender] = useState(Sex.All);
  // const [centuries, setCenturies] = useState([]);

  useEffect(() => {
    const getPeopleList = async () => {
      try {
        setLoading(true);
        const peopleList = await getPeople();
        const formattedPeopleList = utils.formPeopleData(peopleList);

        setPeople(formattedPeopleList);
      } catch {
        setError(ErrorTypes.LOAD_ERROR);
      }

      setLoading(false);
    };

    getPeopleList();
  }, []);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';

  const filteredPeople = filterPeople(people, query, sex, centuries);
  const sortedPeople = sortPeople(filteredPeople, sort, order);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <PeopleFilters />

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!sortedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!sortedPeople.length && <PeopleTable people={sortedPeople} />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

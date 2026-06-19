import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = people
    .filter(person => {
      if (query) {
        const searchText = query.toLowerCase();
        const matchName = person.name.toLowerCase().includes(searchText);
        const matchMother = person.motherName
          ?.toLowerCase()
          .includes(searchText);
        const matchFather = person.fatherName
          ?.toLowerCase()
          .includes(searchText);

        if (!matchName && !matchMother && !matchFather) {
          return false;
        }
      }

      if (sex && person.sex !== sex) {
        return false;
      }

      if (
        centuries.length > 0 &&
        !centuries.includes(String(Math.ceil(person.born / 100)))
      ) {
        return false;
      }

      return true;
    })

    .sort((a, b) => {
      if (!sort) {
        return 0;
      }

      let comparison = 0;

      switch (sort) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'sex':
          comparison = a.sex.localeCompare(b.sex);
          break;
        case 'born':
          comparison = a.born - b.born;
          break;
        case 'died':
          comparison = a.died - b.died;
          break;
        default:
          break;
      }

      return order === 'desc' ? -comparison : comparison;
    });

  const peopleLoaded = !loading && !error;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : !peopleLoaded ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from '../components/PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { slug } = useParams();
  const selectedPersonSlug = slug || '';

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const centuries = searchParams.getAll('centuries');
  const search = searchParams.toString();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      // sex
      if (sex && person.sex !== sex) {
        return false;
      }

      // query
      if (query) {
        const fieldsToSearch = [
          person.name,
          person.motherName,
          person.fatherName,
        ]
          .filter(item => Boolean(item))
          .map(name => name!.toLowerCase());

        const matches = fieldsToSearch.some(name => name.includes(query));

        if (!matches) {
          return false;
        }
      }

      // centuries
      if (centuries.length) {
        const bornCentury = Math.ceil(person.born / 100).toString();

        if (!centuries.includes(bornCentury)) {
          return false;
        }
      }

      return true;
    });
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople];

    sorted.sort((a, b) => {
      switch (sort) {
        case 'name': {
          return a.name.localeCompare(b.name);
        }

        case 'sex': {
          return a.sex.localeCompare(b.sex);
        }

        case 'born': {
          return a.born - b.born;
        }

        case 'died': {
          const diedA = a.died;
          const diedB = b.died;

          if (diedA == null && diedB == null) {
            return 0;
          }

          if (diedA == null) {
            return 1;
          }

          if (diedB == null) {
            return -1;
          }

          return diedA - diedB;
        }

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredPeople, sort, order]);

  const byName = useMemo(
    () => new Map(people.map(person => [person.name, person])),
    [people],
  );
  const renderParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const person = byName.get(name);

    return person ? <PersonLink person={person} search={search} /> : name;
  };

  useEffect(() => {
    setErrorMessage('');
    setLoading(true);

    (async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !errorMessage && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
              {!loading && !errorMessage && filteredPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {!loading && !errorMessage && filteredPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  selectedPersonSlug={selectedPersonSlug}
                  renderParent={renderParent}
                  search={search}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

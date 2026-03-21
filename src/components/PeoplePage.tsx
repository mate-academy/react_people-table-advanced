import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filtered, setFiltered] = useState<Person[]>([]);
  const [paramsSearch] = useSearchParams();

  const { slug } = useParams<{ slug?: string }>();

  const query = paramsSearch.get('query') || '';
  const sex = paramsSearch.get('sex') || 'all';
  const centuries: string[] = paramsSearch.getAll('centuries');
  const sort = paramsSearch.get('sort');
  const order = paramsSearch.get('order');

  const findParents = (persones: Person[]) => {
    const peopleWithParents = persones.map(person => ({
      ...person,
      mother:
        persones.find(parent => parent.name === person.motherName) || null,
      father:
        persones.find(parent => parent.name === person.fatherName) || null,
    }));

    return peopleWithParents;
  };

  const fetchPeoples = async () => {
    try {
      setLoading(true);

      const response = await getPeople();

      const peopleWithParents = findParents(response);

      if (peopleWithParents.length > 0) {
        setPeople(peopleWithParents);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeoples();
  }, []);

  const filteredPeople = () => {
    let filter = [...people];

    if (filtered !== undefined) {
      if (query !== '') {
        filter = filter.filter(
          person =>
            person.name.includes(query) ||
            person.fatherName?.includes(query) ||
            person.motherName?.includes(query),
        );
      }

      if (sex !== 'all') {
        filter = filter.filter(person => person.sex === sex);
      }

      if (centuries.length !== 0) {
        filter = filter.filter(person => {
          const century = Math.ceil(person.born / 100).toString();

          return centuries.includes(century);
        });
      }

      switch (sort) {
        case 'name':
        case 'sex':
          filter = filter.sort((firstPerson, secondPerson) => {
            if (order === 'desc') {
              return secondPerson[sort].localeCompare(firstPerson[sort]);
            } else {
              return firstPerson[sort].localeCompare(secondPerson[sort]);
            }
          });
          break;

        case 'born':
        case 'died':
          filter = filter.sort((firstPerson, secondPerson) => {
            if (order === 'desc') {
              return secondPerson[sort] - firstPerson[sort];
            } else {
              return firstPerson[sort] - secondPerson[sort];
            }
          });
          break;

        default:
          break;
      }
    }

    setFiltered(filter);
  };

  useEffect(() => {
    filteredPeople();
  }, [paramsSearch, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
                <PeopleTable people={filtered} activeSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

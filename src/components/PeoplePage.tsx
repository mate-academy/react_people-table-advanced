import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState, useMemo } from 'react';
import { Person } from '../types/Person';
import { useParams, useSearchParams } from 'react-router-dom';
import * as api from '../api';

export type Sex = 'm' | 'f' | null;

export type Century = 16 | 17 | 18 | 19 | 20 | null;

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { slug: selectedSlug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      // Filter by sex
      if (sex && person.sex !== sex) {
        return false;
      }

      // Filter by query (search in name, motherName, fatherName - case insensitive)
      if (query) {
        const searchTerm = query.toLowerCase();
        const matchesName = person.name.toLowerCase().includes(searchTerm);
        const matchesMotherName =
          person.motherName?.toLowerCase().includes(searchTerm) || false;
        const matchesFatherName =
          person.fatherName?.toLowerCase().includes(searchTerm) || false;

        if (!matchesName && !matchesMotherName && !matchesFatherName) {
          return false;
        }
      }

      // Filter by centuries (multiple selection)
      if (centuries.length > 0) {
        const personCentury = Math.ceil(person.born / 100);

        if (!centuries.includes(personCentury.toString())) {
          return false;
        }
      }

      return true;
    });
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    switch (sort) {
      case 'name':
        if (order && order === 'desc') {
          return [...filteredPeople].sort((a: Person, b: Person) =>
            b.name.localeCompare(a.name),
          );
        }

        return [...filteredPeople].sort((a: Person, b: Person) =>
          a.name.localeCompare(b.name),
        );
      case 'sex':
        if (order && order === 'desc') {
          return [...filteredPeople].sort((a: Person, b: Person) =>
            b.sex.localeCompare(a.sex),
          );
        }

        return [...filteredPeople].sort((a: Person, b: Person) =>
          a.sex.localeCompare(b.sex),
        );
      case 'born':
        if (order && order === 'desc') {
          return [...filteredPeople].sort(
            (a: Person, b: Person) => b.born - a.born,
          );
        }

        return [...filteredPeople].sort(
          (a: Person, b: Person) => a.born - b.born,
        );
      case 'died':
        if (order && order === 'desc') {
          return [...filteredPeople].sort(
            (a: Person, b: Person) => b.died - a.died,
          );
        }

        return [...filteredPeople].sort(
          (a: Person, b: Person) => a.died - b.died,
        );
      default:
        return filteredPeople;
    }
  }, [filteredPeople, sort, order]);

  useEffect(() => {
    api
      .getPeople()
      .then(data => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (queryValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (queryValue !== '') {
      params.set('query', queryValue);
      setSearchParams(params);
    } else {
      params.delete('query');
      setSearchParams(params);
    }
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters handleChange={handleChange} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && error !== '' && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && error === '' && sortedPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && error === '' && sortedPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  selectedSlug={selectedSlug}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

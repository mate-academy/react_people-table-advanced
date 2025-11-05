import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<PeopleTableProps> = ({
  isLoading,
  setIsLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { slug } = useParams<{ slug?: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    const lowerQuery = query.toLowerCase();

    const matchedQuery =
      person.name.toLowerCase().includes(lowerQuery) ||
      (person.motherName &&
        person.motherName.toLowerCase().includes(lowerQuery)) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().includes(lowerQuery));

    const matchedSex = sex ? person.sex === sex : true;

    const bornCentury = Math.floor((person.born - 1) / 100) + 1;
    const matchedCentury =
      centuries.length === 0 || centuries.includes(String(bornCentury));

    return matchedQuery && matchedSex && matchedCentury;
  });

  let sortedPeople = filteredPeople;

  if (sort) {
    sortedPeople = [...filteredPeople].sort((a, b) => {
      let fieldA: string | number = a[sort as keyof Person] as string | number;
      let fieldB: string | number = b[sort as keyof Person] as string | number;

      if (typeof fieldA === 'string') {
        fieldA = fieldA.toLowerCase();
      }

      if (typeof fieldB === 'string') {
        fieldB = fieldB.toLowerCase();
      }

      if (fieldA < fieldB) {
        if (order === 'asc') {
          return -1;
        }

        return 1;
      }

      if (fieldA > fieldB) {
        if (order === 'asc') {
          return 1;
        }

        return -1;
      }

      return 0;
    });
  }

  function handleSort(field: string) {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!currentOrder) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    getPeople()
      .then(data => {
        if (isMounted) {
          setPeople(data);
        }
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));

    return () => {
      isMounted = false;
    };
  }, [setIsLoading]);

  useEffect(() => {
    setSelectedPerson(slug || null);
  }, [slug]);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isLoading && !error && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading && !error && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')}>
                      {`Name${sort === 'name' ? (order === 'asc' ? ' ▲' : ' ▼') : ''}`}
                    </th>
                    <th onClick={() => handleSort('sex')} data-cy="sortBySex">
                      {`Sex${sort === 'sex' ? (order === 'asc' ? ' ▲' : ' ▼') : ''}`}
                    </th>
                    <th onClick={() => handleSort('born')} data-cy="sortByBorn">
                      {`Born${sort === 'born' ? (order === 'asc' ? ' ▲' : ' ▼') : ''}`}
                    </th>
                    <th onClick={() => handleSort('died')} data-cy="sortByDied">
                      {`Died${sort === 'died' ? (order === 'asc' ? ' ▲' : ' ▼') : ''}`}
                    </th>

                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedPeople.map(person => (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={
                        selectedPerson === person.slug
                          ? 'has-background-warning'
                          : ''
                      }
                      onClick={() =>
                        navigate({
                          pathname: `/people/${person.slug}`,
                          search: searchParams.toString(),
                        })
                      }
                    >
                      <td>
                        <PersonLink people={people} name={person.name} />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died || '-'}</td>
                      <td>
                        <PersonLink people={people} name={person.motherName} />
                      </td>
                      <td>
                        <PersonLink people={people} name={person.fatherName} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

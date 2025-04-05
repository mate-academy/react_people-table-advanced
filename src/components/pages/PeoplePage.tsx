import { Person } from '../types';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';
import { PeopleFilters } from '../Navbar/PeopleFilters';
import { useEffect, useState } from 'react';
import { getPeople } from '../types/api';

export const PeoplePage: React.FC = () => {
  const tableClassName = 'table is-striped is-hoverable is-narrow is-fullwidth';
  const [people, setPeople] = useState<Person[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const peopleWithParents = people?.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));
  const thead = ['name', 'sex', 'born', 'died', 'mother', 'father'];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const location = useLocation();

  const mergeSortParams = (newParams: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === '' || value == null) {
        params.delete(key);

        return;
      }

      if (sort === value) {
        if (order !== 'desc') {
          params.set('order', 'desc');
        } else {
          params.delete('order');
          params.delete('sort');

          return;
        }
      }

      params.set('sort', value);
    });

    return `${location.pathname}?${params.toString()}`;
  };

  const peopleFilter = (peopleToFilter: Person[]) => {
    let copy = [...(peopleToFilter || [])];

    if (query) {
      copy = copy.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sex) {
      copy = copy.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      copy = copy.filter(person =>
        centuries.some(century => Math.ceil(person.born / 100) === +century),
      );
    }

    const multiply = order === 'desc' ? -1 : 1;

    if (sort) {
      if (people && typeof people[0][sort as keyof Person] === 'number') {
        copy.sort(
          (a: Person, b: Person) =>
            multiply *
            ((a[sort as keyof Person] as number) -
              (b[sort as keyof Person] as number)),
        );
      } else {
        copy.sort(
          (a: Person, b: Person) =>
            multiply *
            (a[sort as keyof Person] as string).localeCompare(
              b[sort as keyof Person] as string,
            ),
        );
      }
    }

    return copy;
  };

  const peopleFiltered = peopleWithParents
    ? peopleFilter(peopleWithParents)
    : [];

  useEffect(() => {
    setError(false);
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true));

    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !error && peopleWithParents?.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && peopleWithParents?.length !== 0 && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="column">
              <div className="block">
                <div className="box table-container">
                  <table data-cy="peopleTable" className={tableClassName}>
                    <thead>
                      <tr>
                        {thead.map(element => (
                          <th key={element}>
                            <span className="is-flex is-flex-wrap-nowrap">
                              {element.charAt(0).toUpperCase() +
                                element.slice(1)}
                              {element !== 'mother' && element !== 'father' && (
                                <Link to={mergeSortParams({ sort: element })}>
                                  <span className="icon">
                                    <i className="fas fa-sort" />
                                  </span>
                                </Link>
                              )}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {peopleFiltered?.map(person => (
                        <PersonLink person={person} key={person.name} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

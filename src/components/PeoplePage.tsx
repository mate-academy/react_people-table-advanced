import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from '../components/Loader/Loader';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const q = query.toLowerCase();

    const nameMatch =
      person.name.toLowerCase().includes(q) ||
      person.motherName?.toLowerCase().includes(q) ||
      person.fatherName?.toLowerCase().includes(q);

    const personCentury = Math.ceil(person.born / 100);
    const centuryMatch =
      centuries.length === 0 || centuries.includes(String(personCentury));

    return nameMatch && centuryMatch;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    switch (sort) {
      case 'name':
        return order === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);

      case 'sex':
        return order === 'desc'
          ? b.sex.localeCompare(a.sex)
          : a.sex.localeCompare(b.sex);

      case 'born':
        return order === 'desc' ? b.born - a.born : a.born - b.born;

      case 'died':
        return order === 'desc' ? b.died - a.died : a.died - b.died;
      default:
        return 0;
    }
  });

  const handleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (sort === field && order === 'desc') {
      newParams.delete('sort');
      newParams.delete('order');
    } else if (sort === field) {
      newParams.set('order', 'desc');
    } else {
      newParams.set('sort', field);
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const noPeople = !loading && !error && people.length === 0;
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="columns">
        <div className="column is-8">
          <div className="box table-container">
            {loading && <Loader />}
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {noPeople && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
            {!loading && !error && people.length > 0 && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSort('name')}
                      className="is-clickable"
                    >
                      <span className="is-flex is-align-items-center">
                        Name
                        <span className="icon is-small">
                          <i
                            className={`fas fa-sort${sort === 'name' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                          />
                        </span>
                      </span>
                    </th>

                    <th
                      onClick={() => handleSort('sex')}
                      className="is-clickable"
                    >
                      <span className="is-flex is-align-items-center">
                        Sex
                        <span className="icon is-small">
                          <i
                            className={`fas fa-sort${sort === 'sex' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                          />
                        </span>
                      </span>
                    </th>
                    <th
                      onClick={() => handleSort('born')}
                      className="is-clickable"
                    >
                      <span className="is-flex is-align-items-center">
                        Born
                        <span className="icon is-small">
                          <i
                            className={`fas fa-sort${sort === 'born' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                          />
                        </span>
                      </span>
                    </th>
                    <th
                      onClick={() => handleSort('died')}
                      className="is-clickable"
                    >
                      <span className="is-flex is-align-items-center">
                        Died
                        <span className="icon is-small">
                          <i
                            className={`fas fa-sort${sort === 'died' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                          />
                        </span>
                      </span>
                    </th>
                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedPeople.map(person => {
                    const mother = people.find(
                      p => p.name === person.motherName,
                    );
                    const father = people.find(
                      p => p.name === person.fatherName,
                    );

                    return (
                      <tr
                        key={person.slug}
                        data-cy="person"
                        className={
                          person.slug === slug ? 'has-background-warning' : ''
                        }
                      >
                        <td>
                          <PersonLink person={person} />
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          <PersonLink
                            person={mother}
                            originalName={person.motherName}
                          />
                        </td>
                        <td>
                          <PersonLink
                            person={father}
                            originalName={person.fatherName}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="column is-4">
          <div className="box">{!loading && !error && <PeopleFilters />}</div>
        </div>
      </div>
    </>
  );
};
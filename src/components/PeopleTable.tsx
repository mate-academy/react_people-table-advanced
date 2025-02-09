import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { selectPerson } from '../utils/selectPerson';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const { slug } = useParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase();
  const sort = searchParams.get('sort');
  const orderParam = searchParams.get('order');
  const centuries = searchParams.getAll('century');

  const sortOrder = useCallback(() => {
    setFilteredPeople(
      people.sort((a, b) => {
        const normalizedA = String(a[sort as keyof Person]);
        const normalizedB = String(b[sort as keyof Person]);

        return orderParam === 'asc'
          ? normalizedA?.localeCompare(normalizedB)
          : normalizedB.localeCompare(normalizedA);
      }),
    );
  }, [people, sort, orderParam]);

  useEffect(() => {
    // const sex = searchParams.get('sex');

    if (query) {
      setFilteredPeople(
        people.filter(person => {
          const { name, motherName, fatherName } = person;

          const normalize = (str: string | null) => str?.toLowerCase();

          return (
            normalize(name)?.includes(query) ||
            normalize(motherName)?.includes(query) ||
            normalize(fatherName)?.includes(query)
          );
        }),
      );
    }

    if (centuries.length) {
      setFilteredPeople(
        people.filter(person => {
          const normalizedBorn = String(Math.ceil(person.born / 100));

          return centuries.includes(normalizedBorn);
        }),
      );
    }

    if (sort && !orderParam) {
      sortOrder();
    }

    if (orderParam === 'desc') {
      sortOrder();
    }
  }, [searchParams, people, query, centuries, sort, orderParam, sortOrder]);

  useEffect(() => {
    if (slug) {
      setSelectedPerson(prev => people.find(p => p.slug === slug) || prev);
    }
  }, [slug, people]);

  const sortBy = (by: 'name' | 'sex' | 'born' | 'died') => {
    const params = new URLSearchParams(searchParams);

    if (searchParams.get('order')) {
      params.delete('order');
      params.delete('sort');
    } else if (searchParams.get('sort') === by) {
      params.set('order', 'desc');
    } else {
      params.set('sort', by);
    }

    setSearchParams(params);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a onClick={() => sortBy('name')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => sortBy('sex')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => sortBy('born')}>
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => sortBy('died')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const { motherName, fatherName, sex, born, died } = person;
          const currentMother = people.find(p => p.name === motherName);
          const currentFather = people.find(p => p.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': selectedPerson === person,
              })}
            >
              <td>
                <Link
                  onClick={() => setSelectedPerson(person)}
                  to={`${person.slug}`}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              {currentMother ? (
                <td>
                  <Link
                    to={currentMother.slug}
                    className={classNames({
                      'has-text-danger': currentMother.sex === 'f',
                    })}
                    onClick={() =>
                      selectPerson(people, setSelectedPerson, currentMother)
                    }
                  >
                    {motherName}
                  </Link>
                </td>
              ) : (
                <td>{motherName || '-'}</td>
              )}

              {currentFather ? (
                <td>
                  <Link
                    to={currentFather.slug}
                    onClick={() =>
                      selectPerson(people, setSelectedPerson, currentFather)
                    }
                  >
                    {fatherName}
                  </Link>
                </td>
              ) : (
                <td>{fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

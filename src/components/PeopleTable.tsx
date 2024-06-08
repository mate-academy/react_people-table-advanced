import { useContext } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { StateContext } from '../Store';
import classNames from 'classnames';
import { Person } from '../types';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const state = useContext(StateContext);
  const { people } = state;
  const { personSlug } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  function Parent(parentName: string | null) {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={parent.sex === 'f' ? 'has-text-danger' : ''}
        >
          {parent.name}
        </Link>
      );
    }

    return parentName;
  }

  let allPeople = [...people];

  if (query) {
    allPeople = allPeople.filter(
      item =>
        item.name.toUpperCase().includes(query.toUpperCase()) ||
        item.motherName?.toUpperCase().includes(query.toUpperCase()) ||
        item.fatherName?.toUpperCase().includes(query.toUpperCase()),
    );
  }

  if (sort === 'name') {
    if (order === 'desc') {
      allPeople = allPeople.sort((a, b) =>
        b.name.toUpperCase().localeCompare(a.name.toUpperCase()),
      );
    } else {
      allPeople = allPeople.sort((a, b) =>
        a.name.toUpperCase().localeCompare(b.name.toUpperCase()),
      );
    }
  }

  if (sort === 'sex') {
    if (order === 'desc') {
      allPeople = allPeople.sort((a, b) =>
        b.sex.toUpperCase().localeCompare(a.sex.toUpperCase()),
      );
    } else {
      allPeople = allPeople.sort((a, b) =>
        a.sex.toUpperCase().localeCompare(b.sex.toUpperCase()),
      );
    }
  }

  if (sort === 'born') {
    if (order === 'desc') {
      allPeople = allPeople.sort((a, b) => b.born - a.born);
    } else {
      allPeople = allPeople.sort((a, b) => a.born - b.born);
    }
  }

  if (sort === 'died') {
    if (order === 'desc') {
      allPeople = allPeople.sort((a, b) => b.died - a.died);
    } else {
      allPeople = allPeople.sort((a, b) => a.died - b.died);
    }
  }

  if (sex === 'm') {
    allPeople = allPeople.filter(person => person.sex === 'm');
  } else if (sex === 'f') {
    allPeople = allPeople.filter(person => person.sex === 'f');
  }

  const allFilteredPeople: Person[] = centuries.length === 0 ? allPeople : [];

  if (centuries.includes('16')) {
    allFilteredPeople.push(
      ...allPeople.filter(person => person.born >= 1500 && person.born <= 1599),
    );
  }

  if (centuries.includes('17')) {
    allFilteredPeople.push(
      ...allPeople.filter(person => person.born >= 1600 && person.born <= 1699),
    );
  }

  if (centuries.includes('18')) {
    allFilteredPeople.push(
      ...allPeople.filter(person => person.born >= 1700 && person.born <= 1799),
    );
  }

  if (centuries.includes('19')) {
    allFilteredPeople.push(
      ...allPeople.filter(person => person.born >= 1800 && person.born <= 1899),
    );
  }

  if (centuries.includes('20')) {
    allFilteredPeople.push(
      ...allPeople.filter(person => person.born >= 1900 && person.born <= 1999),
    );
  }

  if (!allFilteredPeople.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

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
              <Link
                to={
                  sort !== 'name'
                    ? '.?sort=name'
                    : order !== 'desc'
                      ? '.?sort=name&order=desc'
                      : ''
                }
              >
                <span className="icon">
                  <i
                    className={classNames('fa', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && order === '',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={
                  sort !== 'sex'
                    ? '.?sort=sex'
                    : order !== 'desc'
                      ? '.?sort=sex&order=desc'
                      : ''
                }
              >
                <span className="icon">
                  <i
                    className={classNames('fa', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && order === '',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={
                  sort !== 'born'
                    ? '.?sort=born'
                    : order !== 'desc'
                      ? '.?sort=born&order=desc'
                      : ''
                }
              >
                <span className="icon">
                  <i
                    className={classNames('fa', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && order === '',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={
                  sort !== 'died'
                    ? '.?sort=died'
                    : order !== 'desc'
                      ? '.?sort=died&order=desc'
                      : ''
                }
              >
                <span className="icon">
                  <i
                    className={classNames('fa', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && order === '',
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {allFilteredPeople.map(person => (
          <tr
            key={person.name}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{Parent(person.motherName)}</td>
            <td>{Parent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

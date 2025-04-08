import { useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useParams, useSearchParams } from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
type PeopleTablePros = {
  people: Person[];
};

export const PeopleTable = ({ people }: PeopleTablePros) => {
  const listWithParentsSlug = useMemo(() => {
    return people.map(person => ({
      ...person,
      mother: people.find(item => item.name === person.motherName),
      father: people.find(item => item.name === person.fatherName),
    }));
  }, [people]);

  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const filteredList = useMemo(() => {
    const list = [...listWithParentsSlug];

    if (sortParam === 'name') {
      list.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (orderParam === 'desc') {
          return nameB.localeCompare(nameA);
        }

        return nameA.localeCompare(nameB);
      });
    }

    return list;
  }, [listWithParentsSlug, sortParam, orderParam]);

  const getNextSortParams = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (sortParam !== 'name') {
      newParams.set('sort', 'name');
      newParams.delete('order');
    } else if (orderParam !== 'desc') {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    if (slug) {
      return `/people/${slug}?${newParams.toString()}`;
    }

    return `/people?${newParams.toString()}`;
  };

  const getSortIcon = () => {
    if (sortParam === 'name' && orderParam === 'desc') {
      return 'fa-sort-down';
    }

    if (sortParam === 'name') {
      return 'fa-sort-up';
    }

    return 'fa-sort';
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
              <Link to={getNextSortParams()}>
                <span className="icon">
                  <i className={`fas ${getSortIcon()}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
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
        {filteredList.map(person => (
          <PersonLink key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};

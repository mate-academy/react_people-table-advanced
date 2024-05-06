import React from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { TableTitles } from '../../types/TableTitles';
import { sortPeople } from '../../helpers/sortPeople';

type PersonListProps = {
  people: Person[];
};

export const PersonList: React.FC<PersonListProps> = ({ people }) => {
  const { name } = useParams();
  const [searchParams, setSeachParams] = useSearchParams();

  const column = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const male = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const handleSort = (prop: TableTitles) => {
    const params = new URLSearchParams(searchParams);

    if (column) {
      if (order) {
        if (column === prop) {
          params.delete('order');
          params.delete('sort');
        } else {
          params.delete('order');
          params.set('sort', prop);
        }
      } else if (column === prop) {
        params.set('order', 'desc');
      } else {
        params.set('sort', prop);
      }
    } else {
      params.set('sort', prop);
    }

    setSeachParams(params);
  };

  const arrowDirection = (prop: TableTitles) => {
    if (prop === column && !order) {
      return (
        <span className="icon">
          <i className="fas fa-sort-up" />
        </span>
      );
    }

    if (prop === column && order) {
      return (
        <span className="icon">
          <i className="fas fa-sort-down" />
        </span>
      );
    }

    return (
      <span className="icon">
        <i className="fas fa-sort" />
      </span>
    );
  };

  // console.log(centuries);
  const sortedPeople = sortPeople(people, {
    column,
    male,
    centuries,
    query,
    order,
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(TableTitles).map(([title, prop]) => {
            if (prop === TableTitles.Father || prop === TableTitles.Mother) {
              return <th key={prop}>{title}</th>;
            }

            return (
              <th key={prop}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <a onClick={() => handleSort(prop)}>{arrowDirection(prop)}</a>
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={`${name === person.slug && 'has-background-warning'}`}
          >
            <td>
              <NavLink
                to={`/people/${person.slug}`}
                className={`${person.sex === 'f' && 'has-text-danger'}`}
              >
                {person.name}
              </NavLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother ? (
              <td>
                <NavLink
                  to={`/people/${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </NavLink>
              </td>
            ) : (
              <td>{person.motherName || '-'}</td>
            )}
            {person.father ? (
              <td>
                <NavLink to={`/people/${person.father.slug}`}>
                  {person.fatherName}
                </NavLink>
              </td>
            ) : (
              <td>{person.fatherName || '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

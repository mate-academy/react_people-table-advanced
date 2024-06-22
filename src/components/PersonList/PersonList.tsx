import React from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { Person, SearchParamsKeys } from '../../types';
import { TableTitles } from '../../types/TableTitles';
import { sortPeople } from '../../helpers/sortPeople';
import { useChangeSearchParams } from '../../helpers/useChangeSearchParams';

type PersonListProps = {
  people: Person[];
};

const { SORT, ORDER, SEX, CENTURIES, QUERY } = SearchParamsKeys;

export const PersonList: React.FC<PersonListProps> = ({ people }) => {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const [setSearhParams] = useChangeSearchParams();

  const column = searchParams.get(SORT) || '';
  const order = searchParams.get(ORDER) || '';
  const male = searchParams.get(SEX) || '';
  const centuries = searchParams.getAll(CENTURIES) || [];
  const query = searchParams.get(QUERY) || '';

  const handleSort = (prop: TableTitles) => {
    setSearhParams(prop);
  };

  const arrowDirection = (prop: TableTitles) => {
    let vector = 'fa-sort';

    if (prop === column && !order) {
      vector = 'fa-sort-up';
    }

    if (prop === column && order) {
      vector = 'fa-sort-down';
    }

    return (
      <span className="icon">
        <i className={`fas ${vector}`} />
      </span>
    );
  };

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

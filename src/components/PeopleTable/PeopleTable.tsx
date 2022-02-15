/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const sortBoth = '../../images/sort_both.png';
const sortAsc = '../../images/sort_asc.png';
const sortDesc = '../../images/sort_desc.png';

type Props = {
  people: Person[],
  onChange: (event: never) => void,
  selectedId: string;
  sortOrder: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  onChange,
  selectedId,
  sortOrder,
}) => {
  const location = useLocation();

  const searchParams = location.search;
  const active = location.pathname;

  const searchFilter = (person: string) => {
    const finded = people.find(human => human.name === person);

    return finded?.slug;
  };

  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th
            id="name"
            className={selectedId === 'name' ? 'has-background-grey-light' : ''}
            onClick={onChange}
          >
            <img
              src={
                (sortOrder === 'asc' && selectedId === 'name')
                  ? sortAsc
                  : (sortOrder === 'desc' && selectedId === 'name')
                    ? sortDesc
                    : sortBoth
              }
              alt="sort"
            />
            Name
          </th>
          <th
            id="sex"
            className={selectedId === 'sex' ? 'has-background-grey-light' : ''}
            onClick={onChange}
          >
            <img
              src={
                (sortOrder === 'asc' && selectedId === 'sex')
                  ? sortAsc
                  : (sortOrder === 'desc' && selectedId === 'sex')
                    ? sortDesc
                    : sortBoth
              }
              alt="sort"
            />
            Sex
          </th>
          <th
            id="born"
            className={selectedId === 'born' ? 'has-background-grey-light' : ''}
            onClick={onChange}
          >
            <img
              src={
                (sortOrder === 'asc' && selectedId === 'born')
                  ? sortAsc
                  : (sortOrder === 'desc' && selectedId === 'born')
                    ? sortDesc
                    : sortBoth
              }
              alt="sort"
            />
            Born
          </th>
          <th
            id="died"
            className={selectedId === 'died' ? 'has-background-grey-light' : ''}
            onClick={onChange}
          >
            <img
              src={
                (sortOrder === 'asc' && selectedId === 'died')
                  ? sortAsc
                  : (sortOrder === 'desc' && selectedId === 'died')
                    ? sortDesc
                    : sortBoth
              }
              alt="sort"
            />
            Died
          </th>
          <th>
            Mother
          </th>
          <th>
            Father
          </th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            key={person.name}
            className={classNames({ 'is-selected': active.includes(person.slug) })}
          >
            <td>
              <Link
                to={{ pathname: `${person.slug}`, search: searchParams }}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {searchFilter(person.motherName) ? (
                <Link
                  className="has-text-danger"
                  to={{ pathname: `${searchFilter(person.motherName)}`, search: searchParams }}
                >
                  {person.motherName}
                </Link>
              )
                : <p>{person.motherName || 'Unknown'}</p>}
            </td>
            <td>
              {searchFilter(person.fatherName) ? (
                <Link
                  className="has-text-link"
                  to={{ pathname: `${searchFilter(person.fatherName)}`, search: searchParams }}
                >
                  {person.fatherName}
                </Link>
              )
                : <p>{person.fatherName || 'Unknown'}</p>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

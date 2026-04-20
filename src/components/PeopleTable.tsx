import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';

type SortIconType = {
  icon: string | null;
  order: string | null;
  sort: string | null;
};

const SortIcon: React.FC<SortIconType> = ({ icon, order, sort }) => {
  let srt = 'fas fa-sort';

  if (sort === icon) {
    srt = order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  }

  return (
    <span className="icon">
      <i className={srt} />
    </span>
  );
};

type PersonLinkType = { person: Person };
const PersonLink: React.FC<PersonLinkType> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={`/people/${person.slug}?${searchParams.toString()}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};

type Props = {
  selected: string;
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ selected, people }) => {
  function peopleByName(name: string) {
    return people.find(person => person.name === name);
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const onSortClick = (field: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (sort !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!order) {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams.toString());
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
              <a onClick={() => onSortClick('name')}>
                <SortIcon icon={'name'} order={order} sort={sort} />
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => onSortClick('sex')}>
                <SortIcon icon={'sex'} order={order} sort={sort} />
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => onSortClick('born')}>
                <SortIcon icon={'born'} order={order} sort={sort} />
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => onSortClick('died')}>
                <SortIcon icon={'died'} order={order} sort={sort} />
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? peopleByName(person.motherName)
            : null;
          const father = person.fatherName
            ? peopleByName(person.fatherName)
            : null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                selected === person.name ? 'has-background-warning' : ''
              }
            >
              <td>
                <Link
                  to={`/people/${person.slug}?${searchParams.toString()}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

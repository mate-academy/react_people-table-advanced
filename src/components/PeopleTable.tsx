import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { TableTitles } from '../types/TableTitles';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const renderParent = (name: string | null, parent: Person | undefined) => {
  if (parent) {
    return <PersonLink person={parent} />;
  }

  if (name) {
    return name;
  }

  return '-';
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function getNextSortParam(value: string) {
    if (sort === value && order) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sort === value) {
      return {
        sort: value,
        order: 'desc',
      };
    }

    return {
      sort: value,
      order: null,
    };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(TableTitles).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink params={getNextSortParam(value)}>
                  <span className="icon">
                    <i
                      className={
                        sort === value && order
                          ? 'fas fa-sort-down'
                          : sort === value
                            ? 'fas fa-sort-up'
                            : 'fas fa-sort'
                      }
                    ></i>
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.name}
              data-cy="person"
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParent(person.motherName, mother)}</td>
              <td>{renderParent(person.fatherName, father)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const titleArr = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = (newSort: string) => {
    if (sort === newSort && order !== 'desc') {
      return { sort: newSort, order: 'desc' };
    }

    if (sort === newSort && order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: newSort, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {titleArr.map(title => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink
                  params={getSortParams(title.toLowerCase())}
                  className="icon"
                >
                  <i className="fas fa-sort" role="button" />
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person: Person) => {
          const renderParent = (parentName: string | null) => {
            if (!parentName) {
              return '-';
            }

            const parent = people.find(p => p.name === parentName);

            if (parent) {
              return <PersonLink person={parent} />;
            }

            return parentName;
          };

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParent(person.motherName)}</td>
              <td>{renderParent(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

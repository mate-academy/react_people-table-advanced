import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  visiblePeople: Person[];
};
export const PeopleTable: React.FC<Props> = ({ people, visiblePeople }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const curentSort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const perent = people.find(person => person.name === parentName);

    if (!perent) {
      return parentName;
    }

    return <PersonLink person={perent} />;
  };

  const getSortOption = (newSort: string) => {
    if (newSort !== curentSort) {
      return { sort: newSort, order: null };
    }

    if (newSort === curentSort && !order) {
      return { sort: newSort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortClass = (sort: string) => {
    return classNames('fas', {
      'fa-sort': sort !== curentSort,
      'fa-sort-up': sort === curentSort && !order,
      'fa-sort-down': sort == curentSort && !!order,
    });
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
              <SearchLink params={{ ...getSortOption('name') }}>
                <span className="icon">
                  <i className={getSortClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ ...getSortOption('sex') }}>
                <span className="icon">
                  <i className={getSortClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ ...getSortOption('born') }}>
                <span className="icon">
                  <i className={getSortClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ ...getSortOption('died') }}>
                <span className="icon">
                  <i className={getSortClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {/* {visiblePeople.map(person => {
          console.log(person.slug === slug)
        })} */}
        {visiblePeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getParent(person.motherName)}</td>
            <td>{getParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

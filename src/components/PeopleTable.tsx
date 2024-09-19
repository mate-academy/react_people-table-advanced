import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { ParentLink } from './ParentLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (sortValue: string) => {
    if (sort === sortValue && !order) {
      return { sort: sortValue, order: 'desc' };
    } else if (sort === sortValue && order) {
      return { sort: null, order: null };
    } else {
      return { sort: sortValue, order: null };
    }
  };

  const getIconClass = (sortValue: string) =>
    cn('fas', {
      'fa-sort': sort !== sortValue,
      'fa-sort-up': sort === sortValue && !order,
      'fa-sort-down': sort === sortValue && order,
    });

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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getIconClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getIconClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getIconClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getIconClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({ 'has-background-warning': slug === person.slug })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <ParentLink parentName={person.motherName} people={people} />
            <ParentLink parentName={person.fatherName} people={people} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

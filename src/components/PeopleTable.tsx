import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';

type Props = {
  visiblePeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ visiblePeople }) => {
  const [searchParams] = useSearchParams();

  const sortSearchParam = searchParams.get('sort');
  const orderSearchParam = searchParams.get('order');

  const addNewSortParams = (newSortParam: string): SearchParams => {
    if (!sortSearchParam) {
      return { sort: newSortParam };
    }

    if (sortSearchParam !== newSortParam) {
      return { sort: newSortParam, order: null };
    }

    if (!orderSearchParam) {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const addClassForSortLink = (sortParam: string) => {
    if (sortSearchParam === sortParam && orderSearchParam === 'desc') {
      return classNames('fas', 'fa-sort-down');
    }

    if (sortSearchParam === sortParam) {
      return classNames('fas', 'fa-sort-up');
    }

    return classNames('fas', 'fa-sort');
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
              <SearchLink params={addNewSortParams('name')}>
                <span className="icon">
                  <i className={addClassForSortLink('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={addNewSortParams('sex')}>
                <span className="icon">
                  <i className={addClassForSortLink('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={addNewSortParams('born')}>
                <span className="icon">
                  <i className={addClassForSortLink('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={addNewSortParams('died')}>
                <span className="icon">
                  <i className={addClassForSortLink('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};

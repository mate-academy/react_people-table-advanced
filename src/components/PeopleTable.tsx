import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { useState } from 'react';
import { PersonLink } from './Person';
import { SearchLink } from './SearchLink';

const SORTING_FILTERS = [
  { label: 'Name', value: 'name' },
  { label: 'Sex', value: 'sex' },
  { label: 'Born', value: 'born' },
  { label: 'Died', value: 'died' },
];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people }: { people: Person[] | undefined }) => {
  const { slug } = useParams();
  const [focusedSlug, setFocusedSlug] = useState(slug || null);
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') ?? '';
  const orderParam = searchParams.get('order');

  const getSortParams = (value: string) => {
    if (value !== sortParam) {
      return { sort: value, order: null };
    }

    if (!orderParam) {
      return { sort: value, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (value: string) => {
    if (sortParam === value && !orderParam) {
      return 'fa-sort-up';
    }

    if (sortParam === value && orderParam) {
      return 'fa-sort-down';
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
          {SORTING_FILTERS.map(({ label, value }) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={getSortParams(value)}>
                  <span className="icon">
                    <i className={`fas ${getSortIcon(value)}`} />
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
        {people?.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            people={people}
            focusedSlug={focusedSlug}
            onSelect={setFocusedSlug}
          ></PersonLink>
        ))}
      </tbody>
    </table>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonDetails } from './PersonDetails';

type Props = {
  people: Person[];
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchField = searchParams.get('sort');
  const searchOrder = searchParams.get('order');

  const findPersonByName = (name: string | undefined): Person | undefined => {
    return people.find(person => person.name === name);
  };

  function handleSortClick(
    field: keyof Person,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    event.preventDefault();
    const currentField = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentField !== field) {
      searchParams.set('sort', field);
      searchParams.delete('order');
    } else if (!currentOrder) {
      searchParams.set('order', 'desc');
    } else {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  }

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
              <a
                href="#/people?sort=name"
                onClick={e => handleSortClick('name', e)}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchField !== 'name',
                      'fa-sort-up':
                        searchField === 'name' && searchOrder !== 'desc',
                      'fa-sort-down':
                        searchField === 'name' && searchOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={e => handleSortClick('sex', e)}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchField !== 'sex',
                      'fa-sort-up':
                        searchField === 'sex' && searchOrder !== 'desc',
                      'fa-sort-down':
                        searchField === 'sex' && searchOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born"
                onClick={e => handleSortClick('born', e)}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchField !== 'born',
                      'fa-sort-up':
                        searchField === 'born' && searchOrder !== 'desc',
                      'fa-sort-down':
                        searchField === 'born' && searchOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={e => handleSortClick('died', e)}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchField !== 'died',
                      'fa-sort-up':
                        searchField === 'died' && searchOrder !== 'desc',
                      'fa-sort-down':
                        searchField === 'died' && searchOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonDetails
            key={person.slug}
            person={person}
            isSelected={slug === person.slug}
            findPersonByName={findPersonByName}
          />
        ))}
      </tbody>
    </table>
  );
};

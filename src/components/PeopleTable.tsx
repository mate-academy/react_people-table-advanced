import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { PersonLink } from './PersonLink';

type Props = {
  visiblePeople: Person[],
  setSortingParam: (value: string) => { search: string },
  sortParam: string | null,
  orderParam: string | null,
};

export const PeopleTable: React.FC<Props> = ({
  visiblePeople,
  setSortingParam,
  sortParam,
  orderParam,
}) => {
  const { selectedPerson = '' } = useParams();

  const findRelative = (relativeName: string | null) => {
    if (!relativeName) {
      return '-';
    }

    const relative = visiblePeople.find(person => person.name === relativeName);

    if (!relative) {
      return relativeName;
    }

    return <PersonLink person={relative} />;
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
              <Link to={setSortingParam('name')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortParam !== 'name',
                    'fa-sort-up': sortParam === 'name' && !orderParam,
                    'fa-sort-down': sortParam === 'name' && orderParam,
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={setSortingParam('sex')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortParam !== 'sex',
                    'fa-sort-up': sortParam === 'sex' && !orderParam,
                    'fa-sort-down': sortParam === 'sex' && orderParam,
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={setSortingParam('born')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortParam !== 'born',
                    'fa-sort-up': sortParam === 'born' && !orderParam,
                    'fa-sort-down': sortParam === 'born' && orderParam,
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={setSortingParam('died')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortParam !== 'died',
                    'fa-sort-up': sortParam === 'died' && !orderParam,
                    'fa-sort-down': sortParam === 'died' && orderParam,
                  })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            selectedPerson={selectedPerson}
            findRelative={findRelative}
          />
        ))}
      </tbody>
    </table>
  );
};

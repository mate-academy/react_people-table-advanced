import React from 'react';
import classNames from 'classnames';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink/PersonLink';
import { SearchLink } from '../helpers/SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getPreparedParams = (value: string) => {
    if (sort === value && !order) {
      return {
        sort: value,
        order: 'desc',
      };
    }

    if (sort === value && order) {
      return {
        sort: null,
        order: null,
      };
    }

    return {
      sort: value,
      order: null,
    };
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
              <SearchLink params={getPreparedParams('name')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort-up': sort === 'name' && !order,
                    'fa-sort-down': sort === 'name' && !!order,
                    'fa-sort': sort !== 'name',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getPreparedParams('sex')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort-up': sort === 'sex' && !order,
                    'fa-sort-down': sort === 'sex' && !!order,
                    'fa-sort': sort !== 'sex',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getPreparedParams('born')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort-up': sort === 'born' && !order,
                    'fa-sort-down': sort === 'born' && !!order,
                    'fa-sort': sort !== 'born',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getPreparedParams('died')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort-up': sort === 'died' && !order,
                    'fa-sort-down': sort === 'died' && !!order,
                    'fa-sort': sort !== 'died',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {
          people.map(person => {
            const {
              sex,
              born,
              died,
              fatherName,
              motherName,
              slug,
            } = person;

            const mother = people
              .find(mom => mom.name === motherName);
            const father = people
              .find(dad => dad.name === fatherName);

            const isSelectedSlug
              = slug === selectedSlug
              && location.pathname.includes(selectedSlug);

            return (
              <tr
                key={slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': isSelectedSlug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {
                    mother ? (
                      <PersonLink person={mother} />
                    )
                      : motherName || '-'
                  }
                </td>
                <td>
                  {
                    father ? (
                      <PersonLink person={father} />
                    )
                      : fatherName || '-'
                  }
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

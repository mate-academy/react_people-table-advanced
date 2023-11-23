import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { PersonItem } from './PersonItem';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { Person } from '../types/Person/Person';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleSortButton = (
    ch: string,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();

    if (sort === ch && order) {
      setSearchWith({
        sort: null,
        order: null,
      });
    } else if (sort === ch) {
      setSearchWith({ order: 'desc' });
    } else {
      setSearchWith({
        sort: ch,
        order: null,
      });
    }
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
              <a
                href="#/"
                onClick={(e) => handleSortButton('name', e)}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== 'name',
                    'fa-sort-up': sort === 'name' && !order,
                    'fa-sort-down': sort === 'name' && order,
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
                href="#/"
                onClick={(e) => handleSortButton('sex', e)}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== 'sex',
                    'fa-sort-up': sort === 'sex' && !order,
                    'fa-sort-down': sort === 'sex' && order,
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
                href="#/"
                onClick={(e) => handleSortButton('born', e)}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== 'born',
                    'fa-sort-up': sort === 'born' && !order,
                    'fa-sort-down': sort === 'born' && order,
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
                href="#/"
                onClick={(e) => handleSortButton('died', e)}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== 'died',
                    'fa-sort-up': sort === 'died' && !order,
                    'fa-sort-down': sort === 'died' && order,
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
          <PersonItem
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};

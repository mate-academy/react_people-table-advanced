import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  selectedPersonSlug: string;
  renderParent: (name: string | null) => React.ReactNode;
  search: string;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
  renderParent,
  search,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortIcons = (field: SortField) => ({
    'fa-sort': sort !== field,
    'fa-sort-up': sort === field && !order,
    'fa-sort-down': sort === field && order === 'desc',
  });

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!currentOrder) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
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
                href="#/people"
                onClick={event => {
                  event.preventDefault();
                  handleSort('name');
                }}
              >
                <span className="icon">
                  <i className={classNames('fas', sortIcons('name'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people"
                onClick={event => {
                  event.preventDefault();
                  handleSort('sex');
                }}
              >
                <span className="icon">
                  <i className={classNames('fas', sortIcons('sex'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people"
                onClick={event => {
                  event.preventDefault();
                  handleSort('born');
                }}
              >
                <span className="icon">
                  <i className={classNames('fas', sortIcons('born'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people"
                onClick={event => {
                  event.preventDefault();
                  handleSort('died');
                }}
              >
                <span className="icon">
                  <i className={classNames('fas', sortIcons('died'))} />
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
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': selectedPersonSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} search={search} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(person.motherName)}</td>
            <td>{renderParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

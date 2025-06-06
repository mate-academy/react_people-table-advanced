import { FC } from 'react';
import { usePeople } from '../../providers/PeopleProvider';
import { PersonPage } from '../PersonPage/PersonPage';
import classNames from 'classnames';
import { Person } from '../../types';

export const PeopleTable: FC = () => {
  const { people, activePerson, handleSortFilter, sort, sortOrder } =
    usePeople();

  const getSortIconClass = (type: string) => {
    if (sort === type) {
      if (sortOrder === 'asc') {
        return ' fa-sort-up';
      }

      if (sortOrder === 'desc') {
        return ' fa-sort-down';
      }
    }

    return '';
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
              <a onClick={() => handleSortFilter('name')}>
                <span className="icon">
                  <i className={`fas fa-sort${getSortIconClass('name')}`} />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSortFilter('sex')}>
                <span className="icon">
                  <i className={`fas fa-sort${getSortIconClass('sex')}`} />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSortFilter('born')}>
                <span className="icon">
                  <i className={`fas fa-sort${getSortIconClass('born')}`} />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSortFilter('died')}>
                <span className="icon">
                  <i className={`fas fa-sort${getSortIconClass('died')}`} />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((p: Person) => {
          return (
            <tr
              key={p.slug}
              className={classNames({
                'has-background-warning': p.slug === activePerson?.slug,
              })}
              data-cy="person"
            >
              <td className="has-text-danger">
                <PersonPage person={p} />
              </td>
              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>
              <td>
                {p.mother ? (
                  <PersonPage person={p.mother} />
                ) : (
                  p.motherName || '-'
                )}
              </td>
              <td>
                {p.father ? (
                  <PersonPage person={p.father} />
                ) : (
                  p.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

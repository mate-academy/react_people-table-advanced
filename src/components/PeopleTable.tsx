import React from 'react';
import cn from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid';
import { Person } from '../types';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { getIconClass } from '../utils/getIconClass';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSearchWith = (newParam: SearchParams): void | string => {
    const newSearch = getSearchWith(searchParams, newParam);

    setSearchParams(newSearch);
  };

  const handleSort = (sortField: string) => {
    if (sort === sortField) {
      if (order) {
        setSearchWith({ sort: null, order: null });

        return;
      }

      setSearchWith({ order: 'desc' });

      return;
    }

    setSearchWith({ sort: sortField });
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
                href={`#${pathname}?${searchParams.toString()}`}
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i className={`fas ${getIconClass('name', sort, order)}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href={`#${pathname}?${searchParams.toString()}`}
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i className={`fas ${getIconClass('sex', sort, order)}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href={`#${pathname}?${searchParams.toString()}`}
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i className={`fas ${getIconClass('born', sort, order)}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href={`#${pathname}?${searchParams.toString()}`}
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i className={`fas ${getIconClass('died', sort, order)}`} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const { sex, born, died, motherName, fatherName, slug } = person;
          const mother = people.find(mom => mom.name === motherName);
          const father = people.find(dad => dad.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={uuid()}
              className={cn({ 'has-background-warning': slug === personSlug })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  <p>{motherName || '-'}</p>
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  <p>{fatherName || '-'}</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

import classNames from 'classnames';
import React from 'react';
import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { Parameter } from '../types/Parameter';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSearchWith = (params: SearchParams): void | string => {
    const newSearch = getSearchWith(searchParams, params);

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

  const peopleWithParents = people.map(person => {
    const mother = people.find(moth => moth.name === person.motherName) || null;
    const father = people.find(fath => fath.name === person.fatherName) || null;

    return { ...person, mother, father };
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(Parameter).map(parameter => (
            <th key={parameter}>
              <span className="is-flex is-flex-wrap-nowrap">
                {parameter}
                <NavLink
                  to={`${pathname}?${getSearchWith(searchParams, { sort: parameter.toLowerCase() })}`}
                  onClick={event => {
                    event.preventDefault();
                    handleSort(parameter.toLowerCase());
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-up':
                          searchParams.get('sort') === parameter &&
                          !searchParams.has('order'),
                        'fa-sort-down':
                          searchParams.get('sort') === parameter &&
                          searchParams.has('order'),
                        'fa-sort': !(searchParams.get('sort') === parameter),
                      })}
                    />
                  </span>
                </NavLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleWithParents.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <NavLink
                to={`${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </NavLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <NavLink
                  to={`${person.mother?.slug}`}
                  className={'has-text-danger'}
                >
                  {person.motherName}
                </NavLink>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <NavLink to={`${person.father?.slug}`}>
                  {person.fatherName}
                </NavLink>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

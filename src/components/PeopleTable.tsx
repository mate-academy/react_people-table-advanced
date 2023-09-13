import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { QueryParams } from '../types/QueryParams';
import { SortParams } from '../types/SortParams';
import { SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(QueryParams.Sort) || '';
  const order = searchParams.get(QueryParams.Order) || '';

  const handleSortingChange = (type: SortParams): SearchParams => {
    if (!sort || sort !== type) {
      return { sort: type, order: null };
    }

    if (!order) {
      return { sort: type, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  function getPersonByName(name: string) {
    return people.find(pers => pers.name === name);
  }

  useEffect(() => {
    const selectedPerson = document.querySelector('.has-background-warning');

    if (selectedPerson) {
      selectedPerson.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [slug]);

  const sortTable = () => {
    return (
      <tr>
        {Object.values(SortParams).map(param => (
          <th key={param}>
            <span className="is-flex is-flex-wrap-nowrap">
              {param.charAt(0).toUpperCase() + param.substring(1)}
              <SearchLink params={handleSortingChange(param)}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== param,
                      'fa-sort-up': sort === param && !order,
                      'fa-sort-down': sort === param && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
        ))}
        <th>Mother</th>
        <th>Father</th>
      </tr>
    );
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          {sortTable()}
        </thead>

        <tbody>
          {people.map(person => {
            const {
              motherName, fatherName, sex, born, died,
            } = person;
            const mother = motherName ? getPersonByName(motherName) : undefined;
            const father = fatherName ? getPersonByName(fatherName) : undefined;

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={cn({
                  'has-background-warning': person.slug === slug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {(motherName
                    && (mother ? <PersonLink person={mother} /> : motherName))
                    || '-'}
                </td>
                <td>
                  {(fatherName
                    && (father ? <PersonLink person={father} /> : fatherName))
                    || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

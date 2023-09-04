import React, { useEffect } from 'react';

import classNames from 'classnames';

import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PeopleLink } from '../PeopleLink/PeopleLink';

import { Person } from '../../../types';
import { QueryParams } from '../../../types/QueryParams';
import { SortTypes } from '../../../types/SortTypes';
import { getSearchWith } from '../../../utils/searchHelper';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(QueryParams.Sort) || '';
  const order = searchParams.get(QueryParams.Order) || '';

  function getSearchWithSort(sortType: SortTypes) {
    if (!sort || sort !== sortType) {
      return getSearchWith(searchParams, { sort: sortType, order: null });
    }

    if (!order) {
      return getSearchWith(searchParams, { sort: sortType, order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  }

  const findPersonByName = (name: string) => {
    return people.find(currentPerson => currentPerson.name === name);
  };

  useEffect(() => {
    const selectedPerson = document.querySelector('.has-background-warning');

    if (selectedPerson) {
      selectedPerson.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [slug]);

  const getParent = (
    personParent: string,
    parent?: Person,
  ) => {
    return parent
      ? <PeopleLink person={parent} />
      : personParent;
  };

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortTypes).map(currentType => (
            <th key={currentType}>
              <span className="
                is-flex
                is-flex-wrap-nowrap"
              >
                {currentType.slice(0, 1).toUpperCase() + currentType.slice(1)}

                <Link
                  to={{ search: getSearchWithSort(currentType) }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': !sort || sort !== currentType,
                        'fa-sort-up': sort === currentType && !order,
                        'fa-sort-down': sort === currentType && order,
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? findPersonByName(person.motherName)
            : undefined;
          const father = person.fatherName
            ? findPersonByName(person.fatherName)
            : undefined;

          const isPersonSelected = person.slug === slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': isPersonSelected,
              })}
            >
              <td>
                <PeopleLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName
                  ? getParent(person.motherName, mother)
                  : '-'}
              </td>
              <td>
                {person.fatherName
                  ? getParent(person.fatherName, father)
                  : '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

import classNames from 'classnames';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const queryParam = searchParams.get('query') || '';
  const centuriesParam = searchParams.getAll('centuries') || [];
  const sexParam = searchParams.get('sex');

  const sortChangeHandler = (param: string) => {
    if (searchParams.toString().includes(param)
      && searchParams.toString().includes('desc')) {
      return {
        sort: null,
        order: null,
      };
    }

    if (searchParams.toString().includes(param)) {
      return {
        sort: param,
        order: 'desc',
      };
    }

    return {
      sort: param,
      order: null,
    };
  };

  const sorting = () => {
    let newPeople = [...people];

    if (searchParams.has('query')) {
      newPeople = newPeople.filter(
        person => person.name.toLowerCase().includes(queryParam.toLowerCase())
        || person.motherName?.toLowerCase().includes(queryParam.toLowerCase())
        || person.fatherName?.toLowerCase().includes(queryParam.toLowerCase()),
      );
    }

    if (searchParams.has('centuries')) {
      newPeople = newPeople.filter(person => centuriesParam
        .includes(String(Math.ceil(person.born / 100))));
    }

    if (searchParams.has('sex')) {
      newPeople = newPeople.filter(person => person.sex === sexParam);
    }

    switch (sort) {
      case 'name':
      case 'sex':
        if (searchParams.has('order')) {
          newPeople.sort((a, b) => b[sort].localeCompare(a[sort]));
        } else {
          newPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
        }

        break;

      case 'born':
      case 'died':
        if (searchParams.has('order')) {
          newPeople.sort((a, b) => b[sort] - a[sort]);
        } else {
          newPeople.sort((a, b) => a[sort] - b[sort]);
        }

        break;
      default:
    }

    return newPeople;
  };

  const getSortIconClass = (sortParam: string) => {
    return classNames(
      'fas',
      {
        'fa-sort-down': sort === sortParam
      && searchParams.has('order'),
      },
      { 'fa-sort': sort !== sortParam },
      {
        'fa-sort-up': sort === sortParam
          && !searchParams.has('order'),
      },
    );
  };

  const visiblePeople = sorting();

  return (
    <>
      {!visiblePeople.length
        ? <p>There are no people matching the current search criteria</p>
        : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink
                      params={sortChangeHandler('name')}
                    >
                      <span className="icon">
                        <i className={getSortIconClass('name')} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink
                      params={sortChangeHandler('sex')}
                    >
                      <span className="icon">
                        <i className={getSortIconClass('sex')} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink
                      params={sortChangeHandler('born')}
                    >
                      <span className="icon">
                        <i className={getSortIconClass('born')} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink
                      params={sortChangeHandler('died')}
                    >
                      <span className="icon">
                        <i className={getSortIconClass('died')} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {visiblePeople.map(person => {
                const mother = people
                  .find(currPerson => currPerson.name === person.motherName);
                const father = people
                  .find(currPerson => currPerson.name === person.fatherName);

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames(
                      { 'has-background-warning': person.slug === slug },
                    )}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    {mother
                      ? <td><PersonLink person={mother} /></td>
                      : <td>{person.motherName ? person.motherName : '-'}</td>}
                    {father
                      ? <td><PersonLink person={father} /></td>
                      : <td>{person.fatherName ? person.fatherName : '-'}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
    </>
  );
};

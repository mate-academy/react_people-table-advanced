import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PeopleTableProps } from '../types/props';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ peopleList }: PeopleTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tempPeopleList, setTempPeopleList] = useState<Person[]>(peopleList);
  const { slug } = useParams();

  const sortField = searchParams.get('sort');
  const sexField = searchParams.get('sex'); // ;)
  const order = searchParams.get('order');
  const searchQuery = searchParams.get('query');
  const centuriesFilter = useMemo(
    () => searchParams.getAll('centuries'),
    [searchParams],
  );

  useEffect(() => {
    // copy of people list, so i do not mutate original list
    let listCopy = [...peopleList];

    if (centuriesFilter.length > 0) {
      listCopy = listCopy.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuriesFilter.includes(personCentury.toString());
      });
    }

    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();

      listCopy = listCopy.filter(person => {
        const nameMatch = person.name?.toLowerCase().includes(queryLower);
        const motherMatch = person.motherName
          ?.toLowerCase()
          .includes(queryLower);
        const fatherMatch = person.fatherName
          ?.toLowerCase()
          .includes(queryLower);

        return nameMatch || motherMatch || fatherMatch;
      });
    }

    if (sexField) {
      listCopy = listCopy.filter(person => person.sex === sexField);
    }

    if (sortField) {
      listCopy.sort((a: Person, b: Person) =>
        typeof a[sortField] === 'string'
          ? a[sortField].localeCompare(b[sortField])
          : a[sortField] - b[sortField],
      );
      if (order === 'desc') {
        listCopy.reverse();
      }
    }

    setTempPeopleList(listCopy);
  }, [sortField, order, peopleList, sexField, searchQuery, centuriesFilter]);

  const handleSortOnClick = (clickeColumn: string) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');
    // currentSex has to stay, so it will not be replaced/erased
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const currentSex = params.get('sex');

    if (currentSort !== clickeColumn) {
      params.set('sort', clickeColumn);
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
          <th onClick={() => handleSortOnClick('name')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    sort: null,
                  }),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'name',
                      'fa-sort-up': sortField === 'name' && order !== 'desc',
                      'fa-sort-down': sortField === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th onClick={() => handleSortOnClick('sex')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{ search: getSearchWith(searchParams, { sort: null }) }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'sex',
                      'fa-sort-up': sortField === 'sex' && order !== 'desc',
                      'fa-sort-down': sortField === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th onClick={() => handleSortOnClick('born')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{ search: getSearchWith(searchParams, { sort: null }) }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'born',
                      'fa-sort-up': sortField === 'born' && order !== 'desc',
                      'fa-sort-down': sortField === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th onClick={() => handleSortOnClick('died')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{ search: getSearchWith(searchParams, { sort: null }) }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'died',
                      'fa-sort-up': sortField === 'died' && order !== 'desc',
                      'fa-sort-down': sortField === 'died' && order === 'desc',
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
        {tempPeopleList?.map(person => {
          const mother = peopleList.find(
            p =>
              p.name.toLocaleLowerCase() ===
              person.motherName?.toLocaleLowerCase(),
          );
          const father = peopleList.find(
            p =>
              p.name.toLocaleLowerCase() ===
              person.fatherName?.toLocaleLowerCase(),
          );

          return (
            // highlight here
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={mother} name={person.motherName} />
              </td>
              <td>
                <PersonLink person={father} name={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

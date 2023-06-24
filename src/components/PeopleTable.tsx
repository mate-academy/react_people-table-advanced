import { FC, useEffect } from 'react';
import classNames from 'classnames';
import {
  Link, useLocation, useResolvedPath, useSearchParams,
} from 'react-router-dom';

import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  slugPerson: string | undefined,
  visiblePeople: Person[],
  setVisiblePeople: React.Dispatch<React.SetStateAction<Person[]>>
};

export const PeopleTable: FC<Props> = ({
  people, slugPerson, setVisiblePeople, visiblePeople,
}) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const [seachParams] = useSearchParams();
  const sort = seachParams.get('sort');
  const order = seachParams.get('order');
  const sexParam = seachParams.get('sex');
  const centuriesParams = seachParams.getAll('centuries') || [];
  const queryParam = seachParams.get('query') || '';

  function handleFiltering(peopleFromSever: Person[]) {
    let peopleResult = [...peopleFromSever];

    // filtering by sex
    switch (sexParam) {
      case 'f':
        peopleResult = peopleResult.filter(p => p.sex === 'f');
        break;
      case 'm':
        peopleResult = peopleResult.filter(p => p.sex === 'm');
        break;
      default:
        break;
    }
    // end filtering by sex

    // filtering by century
    if (centuriesParams.length > 0) {
      const resultArr: Person[] = [];

      centuriesParams.forEach((cent) => {
        peopleResult.forEach(per => {
          if (per.born >= +`${cent}00` && per.died <= +`${+cent + 1}00`) {
            resultArr.push(per);
          }
        });
      });
      peopleResult = resultArr;
    }
    // end filtering by century

    // filtering by query
    if (queryParam !== '') {
      peopleResult = peopleResult.filter(
        p => {
          return p.name.toLocaleLowerCase().includes(
            queryParam.toLocaleLowerCase(),
          );
        },
      );
    }
    // end filtering by query

    return peopleResult;
  }

  const handleSorting = (peopleForSort: Person[]) => {
    switch (sort) {
      case 'name':
        return peopleForSort.sort((a, b) => (a.name.localeCompare(b.name)));

      case 'sex':
        return peopleForSort.sort((a, b) => (a.sex.localeCompare(b.sex)));

      case 'born':
        return peopleForSort.sort((a, b) => (a.born - b.born));

      case 'died':
        return peopleForSort.sort((a, b) => (a.died - b.died));

      default:
        return peopleForSort;
    }
  };

  const getQueryParams = (sortName: string) => {
    if (sort === sortName || sortName === 'born') {
      return {
        sort: sortName,
        order: 'desc',
      };
    }

    return {
      sort: sortName,
      order: null,
    };
  };

  let peopleForFiltering = handleFiltering(visiblePeople);

  peopleForFiltering = order === 'desc'
    ? handleSorting(peopleForFiltering).reverse()
    : handleSorting(peopleForFiltering);

  useEffect(() => {
    setVisiblePeople(visiblePeople);
  }, [visiblePeople.length]);

  return (
    <>
      {people && people.length > 0 && (
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
                    params={getQueryParams('name')}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    params={getQueryParams('sex')}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    params={getQueryParams('born')}
                  >
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    params={getQueryParams('died')}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {peopleForFiltering.map((person: Person) => {
              const {
                name,
                sex,
                born,
                died,
                fatherName,
                motherName,
                slug,
              } = person;
              const mother = people.find(
                (child) => (child.motherName === person.name),
              );
              const father = people.find(
                (child) => (child.fatherName === person.name),
              );

              return (
                <tr
                  data-cy="person"
                  className={
                    classNames(
                      { 'has-background-warning': person.slug === slugPerson },
                    )
                  }
                >
                  <td>
                    <Link
                      to={{
                        pathname: parentPath + slug,
                        search: location.search,
                      }}
                      className={classNames(
                        { 'has-text-danger': sex === 'f' },
                      )}
                    >
                      {name}
                    </Link>
                  </td>
                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother ? (
                      <Link
                        to={{
                          pathname: parentPath + mother?.slug,
                          search: location.search,
                        }}
                        className="has-text-danger"
                      >
                        {motherName}
                      </Link>
                    ) : (
                      <p>{motherName || '-'}</p>
                    )}
                  </td>
                  <td>
                    {father ? (
                      <Link
                        to={{
                          pathname: parentPath + father?.slug,
                          search: location.search,
                        }}
                      >
                        {fatherName}
                      </Link>
                    ) : (
                      <p>{fatherName || '-'}</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

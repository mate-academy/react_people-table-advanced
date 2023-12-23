/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';
import { convertToSlug } from '../components/function/convertToSlug';
import { usePeopleContext } from '../components/PeopleContext/PeopleContext';
import { SearchLink } from '../components/SearchLink';

export enum SortType {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export const TablePeople = () => {
  const {
    isLoading,
    people,
    errorMessage,
    isMotherInArray,
    isFatherInArray,
    filteredPeople,
    searchByName,
  } = usePeopleContext();

  const [searchParams] = useSearchParams();

  const sortSearch = useMemo(
    () => searchParams.get('sort'), [searchParams],
  );
  const orderSearch = useMemo(
    () => searchParams.get('order'), [searchParams],
  );

  const { slug } = useParams();

  const handleSort = (field: string | null) => {
    if (!sortSearch || sortSearch !== field) {
      return field;
    }

    if (sortSearch === field && !orderSearch) {
      return [field];
    }

    return null;
  };

  const handleOrder = (field: string | null) => {
    if (!sortSearch || sortSearch !== field) {
      return null;
    }

    if (!orderSearch) {
      return 'desc';
    }

    return null;
  };

  function getPersonByName(name: string, peopleArray: Person[]): Person {
    const person = peopleArray.find(p => p.name === name) || {
      name: '',
      sex: '',
      born: 0,
      died: 0,
      fatherName: null,
      motherName: null,
      slug: '',
    };

    return person;
  }

  function getRowClassName(
    person: Person,
    slugTag: string | undefined,
  ) {
    const { name, born } = person;

    const checkSelectedChild = convertToSlug(name, born) === slugTag?.slice(1);

    return classNames({
      'has-background-warning': checkSelectedChild,
    });
  }

  const getSortIcon = (field: string) => {
    if (sortSearch === field) {
      return orderSearch === 'desc' ? (
        <i className="fas fa-sort-down" />
      ) : (
        <i className="fas fa-sort-up" />
      );
    }

    return <i className="fas fa-sort" />;
  };

  // const compareByField = (a: Person, b: Person, field: SortType) => {
  //   if (orderSearch === 'desc') {
  //     return b[field] > a[field] ? 1 : -1;
  //   }

  //   return a[field] > b[field] ? 1 : -1;
  // };

  // const sortedPeople = (peopleArray: Person[]) => {
  //   if (!sortSearch) {
  //     return peopleArray;
  //   }

  //   const compareFunction = (a: Person, b: Person) => {
  //     const field = sortSearch as SortType;

  //     switch (field) {
  //       case SortType.Name:
  //       case SortType.Sex:
  //       case SortType.Born:
  //       case SortType.Died:
  //         return compareByField(a, b, field);
  //       default:
  //         return 0;
  //     }
  //   };

  //   return [...peopleArray].sort(compareFunction);
  // };

  // useEffect(() => {
  //   let sorted = [];
  //   console.log(!sortSearch);

  //   if (!sortSearch) {
  //         console.log("1", isFiltering);

  //     sorted = isFiltering ? filteredPeople : [...people];
  //   }
  //   //   } else if (filteredPeople.length === 0) {
  //   //     console.log("2");

  //   //     sorted = sortedPeople(people);
  //   //   } else {
  //   //     console.log("3");

  //   //     sorted = sortedPeople(filteredPeople);
  //   setFilteredPeople([...sorted]);
  // }, [searchParams, people]);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !errorMessage && people.length === 0 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!isLoading && !errorMessage && (
          filteredPeople.length === 0 && searchByName.length > 0 ? (
            <p>There are no people matching the current search criteria</p>
          ) : (
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
                        params={{
                          sort: handleSort(SortType.Name),
                          order: handleOrder(SortType.Name),
                        }}
                      >
                        <span className="icon">
                          {getSortIcon(SortType.Name)}
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Sex
                      <SearchLink params={{
                        sort: handleSort(SortType.Sex),
                        order: handleOrder(SortType.Sex),
                      }}
                      >
                        <span className="icon">
                          {getSortIcon(SortType.Sex)}
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Born
                      <SearchLink params={{
                        sort: handleSort(SortType.Born),
                        order: handleOrder(SortType.Born),
                      }}
                      >
                        <span className="icon">
                          {getSortIcon(SortType.Born)}
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Died
                      <SearchLink params={{
                        sort: handleSort(SortType.Died),
                        order: handleOrder(SortType.Died),
                      }}
                      >
                        <span className="icon">
                          {getSortIcon(SortType.Died)}
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>
              <tbody>

                {(filteredPeople.length > 0
                  ? filteredPeople
                  : people).map(person => {
                  const {
                    name, sex, born, died, motherName, fatherName,
                  } = person;

                  return (
                    <tr
                      key={name}
                      data-cy="person"
                      className={getRowClassName(person, slug)}
                    >
                      <td aria-label="CHOOSE">
                        <PersonLink person={person} />
                      </td>
                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {isMotherInArray(motherName) ? (
                          <PersonLink person={
                            getPersonByName(motherName!, people)
                          }
                          />
                        ) : (
                          motherName ?? '-'
                        )}
                      </td>
                      <td>
                        {isFatherInArray(fatherName) ? (
                          <PersonLink person={
                            getPersonByName(fatherName!, people)
                          }
                          />
                        ) : (
                          fatherName ?? '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>

  );
};

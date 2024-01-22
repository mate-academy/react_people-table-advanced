/* eslint-disable max-len */
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person, Sex, SortType } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { SearchLink } from '../SearchLink';

interface Props {
  people: Person[]
  setPeople: Dispatch<SetStateAction<Person[]>>
  sortSex: Sex
  searchQuery: string
  centuriesFilter: number[]
}

const getPersonString = (name: string, born: number) => {
  return `${name.toLocaleLowerCase().replaceAll(' ', '-')}-${born}`;
};

export const PeopleTable: React.FC<Props> = (props) => {
  const {
    people,
    setPeople,
    sortSex,
    searchQuery,
    centuriesFilter,
  } = props;

  const [loader, setLoader] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const { personName } = useParams();

  const [searchParams] = useSearchParams();

  const sortType = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setLoader(false));
  }, []);

  const getPeopleArray = (): Person[] => {
    let peopleArray = people;

    if (sortSex !== '') {
      peopleArray = peopleArray.filter(person => person.sex === sortSex);
    }

    if (centuriesFilter.length > 0) {
      peopleArray = peopleArray.filter(person => centuriesFilter.includes(Math.ceil(person.born / 100)));
    }

    if (searchQuery !== '') {
      peopleArray = peopleArray.filter(person => {
        if (person.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
          || person.motherName?.toLocaleLowerCase()?.includes(searchQuery.toLocaleLowerCase())
          || person.fatherName?.toLocaleLowerCase()?.includes(searchQuery.toLocaleLowerCase())) {
          return true;
        }

        return false;
      });
    }

    if (sortType === SortType.NAME) {
      peopleArray = peopleArray.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortType === SortType.SEX) {
      peopleArray = peopleArray.sort((a, b) => a.sex.localeCompare(b.sex));
    }

    if (sortType === SortType.BORN) {
      peopleArray = peopleArray.sort((a, b) => a.born - b.born);
    }

    if (sortType === SortType.DIED) {
      peopleArray = peopleArray.sort((a, b) => a.died - b.died);
    }

    return sortOrder === 'desc' ? peopleArray.reverse() : peopleArray;
  };

  const getSortParams = (field: string) => {
    if (field === sortType && !sortOrder) {
      return { sort: field, order: 'desc' };
    }

    if (field === sortType && sortOrder) {
      return { sort: null, order: null };
    }

    return { sort: field, order: null };
  };

  const displayPeople = getPeopleArray();

  return (
    <div className="box table-container">
      {loader ? <Loader /> : null}
      {hasError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : null}

      {
        people.length === 0 && !loader
          ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) : null
      }

      {
        displayPeople.length === 0 && !loader
          ? (
            <p>
              There are no people matching the current search criteria
            </p>
          ) : null
      }

      {
        displayPeople.length > 0 ? (
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
                      params={getSortParams(SortType.NAME)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sortType !== SortType.NAME,
                            'fa-sort-up': sortType === SortType.NAME && !sortOrder,
                            'fa-sort-down': sortType === SortType.NAME && sortOrder,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink
                      params={getSortParams(SortType.SEX)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sortType !== SortType.SEX,
                            'fa-sort-up': sortType === SortType.SEX && !sortOrder,
                            'fa-sort-down': sortType === SortType.SEX && sortOrder,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink
                      params={getSortParams(SortType.BORN)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sortType !== SortType.BORN,
                            'fa-sort-up': sortType === SortType.BORN && !sortOrder,
                            'fa-sort-down': sortType === SortType.BORN && sortOrder,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink
                      params={getSortParams(SortType.DIED)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sortType !== SortType.DIED,
                            'fa-sort-up': sortType === SortType.DIED && !sortOrder,
                            'fa-sort-down': sortType === SortType.DIED && sortOrder,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {displayPeople.map(person => (
                <PersonLink
                  person={person}
                  className={classNames({ 'has-background-warning': personName === getPersonString(person.name, person.born) })}
                  motherBirth={people.find(mother => mother.name === person.motherName)?.born || null}
                  fatherBirth={people.find(father => father.name === person.fatherName)?.born || null}
                />
              ))}
            </tbody>
          </table>
        ) : null
      }
    </div>
  );
};

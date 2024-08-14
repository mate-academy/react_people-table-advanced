import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person as PersonType } from '../../types';
import { Person } from '../Person';
import { PeopleFilters } from '../PeopleFilter/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const People: React.FC = () => {
  const [originPeopleList, setOriginPeopleList] = useState<PersonType[]>([]);
  const [people, setPeople] = useState<PersonType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const sortPeople = (
    list: PersonType[],
    sort: string | null,
    order: string | null,
  ) => {
    if (!sort) {
      return list;
    }

    const sortedList = [...list];

    if (sort === 'died' || sort === 'born') {
      sortedList.sort((a, b) => Number(a[sort]) - Number(b[sort]));
    } else {
      sortedList.sort((a, b) => a[sort].localeCompare(b[sort]));
    }

    if (order === 'desc') {
      sortedList.reverse();
    }

    return sortedList;
  };

  const fetchPeople = async () => {
    try {
      const list = await getPeople();

      setOriginPeopleList(list);
      setPeople(sortPeople(list, sortParam, orderParam));
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const setParams = (param: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (newParams.get('sort') === param) {
      if (newParams.get('order') === 'desc') {
        newParams.delete('sort');
        newParams.delete('order');
      } else {
        newParams.set('order', 'desc');
      }
    } else {
      newParams.set('sort', param);
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const nameColor = (parentName: string | null) => {
    if (!parentName) {
      return;
    }

    const parent = originPeopleList.find(el => el.name === parentName);

    return parent?.sex;
  };

  const findSlug = (parentName: string | null) =>
    originPeopleList.find(el => el.name === parentName)?.slug;

  return (
    <React.Fragment>
      <h1 className="title">People Page</h1>
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                originPeopleList={originPeopleList}
                setPeople={setPeople}
                sortPeople={sortPeople}
              />
            </div>
            <div className="column">
              <div className="box table-container">
                {people.length ? (
                  <table
                    data-cy="peopleTable"
                    // eslint-disable-next-line max-len
                    className="table is-striped is-hoverable is-narrow is-fullwidth"
                  >
                    <thead>
                      <tr>
                        {['name', 'sex', 'born', 'died'].map(header => (
                          <th key={header}>
                            <span className="is-flex is-flex-wrap-nowrap">
                              {header.charAt(0).toUpperCase() + header.slice(1)}
                              <a
                                href="#"
                                onClick={event => {
                                  event.preventDefault();
                                  setParams(header);
                                }}
                                aria-label={`Sort by ${header}`}
                              >
                                <span className="icon">
                                  <i
                                    className={`fas fa-sort${sortParam === header ? (orderParam === 'desc' ? '-down' : '-up') : ''}`}
                                  />
                                </span>
                              </a>
                            </span>
                          </th>
                        ))}
                        <th>Mother</th>
                        <th>Father</th>
                      </tr>
                    </thead>
                    <tbody>
                      {people.map(el => (
                        <Person
                          key={el.slug}
                          name={el.name}
                          sex={el.sex}
                          born={el.born}
                          died={el.died}
                          mother={el.motherName}
                          father={el.fatherName}
                          slug={el.slug}
                          nameColor={nameColor}
                          findSlug={findSlug}
                        />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p data-cy="noPeopleMessage">На сервері немає людей</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

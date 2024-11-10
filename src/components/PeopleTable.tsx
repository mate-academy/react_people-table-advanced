/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type People = {
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
  slug: string;
};

type SortByWhat = 'sex' | 'born' | 'died' | 'name';

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<People[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const [filteredPeople, setFilteredPeople] = useState<People[]>([]);
  const [currentIsReverse, setCurrentIsReverse] = useState<boolean>();
  const [currentSortParam, setCurrentSortParam] = useState('');
  const [errorText, setErrorTest] = useState('');
  const getHref = (name: string) => {
    return people.find(person => person.name === name)?.slug
      ? people.find(person => person.name === name)?.slug
      : '';
  };

  const getLink = (sortByWhat: SortByWhat) => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Если уже сортируем по этому полю, переключаем порядок сортировки
    if (currentSortParam === sortByWhat) {
      const isCurrentlyDesc = newSearchParams.get('order') === 'desc';

      // Переключаем порядок сортировки
      if (isCurrentlyDesc) {
        newSearchParams.delete('order'); // Если `desc`, удаляем для `asc`
      } else {
        newSearchParams.set('order', 'desc'); // Если `asc`, ставим `desc`
      }
    } else {
      // Если сортируем по новому полю, задаем сортировку по возрастанию
      newSearchParams.set('sort', sortByWhat);
      newSearchParams.delete('order'); // Сбрасываем на `asc`
    }

    return `?${newSearchParams.toString()}`;
  };

  useEffect(() => {
    getPeople()
      .then(peopleArray => {
        setPeople(peopleArray);
        setFilteredPeople(peopleArray);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorTest('Something went wrong');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const sexParam = searchParams.get('sex');
    const sortParam = searchParams.get('sort');
    const centuriesParams = searchParams.getAll('centuries').map(Number);
    const queryParam = searchParams.get('query')?.toLowerCase() || '';
    const isReverse = searchParams.get('order') === 'desc';

    // Копируем исходный массив, чтобы начать с полного списка
    const sortedPeople = [...people];

    // Сортировка
    if (sortParam) {
      if (sortParam === 'sex') {
        sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
      } else if (sortParam === 'name') {
        sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortParam === 'born') {
        sortedPeople.sort((a, b) => a.born - b.born);
      } else if (sortParam === 'died') {
        sortedPeople.sort((a, b) => a.died - b.died);
      }
    }

    // Если нужно отсортировать в обратном порядке
    if (isReverse) {
      sortedPeople.reverse();
    }

    // Фильтрация
    const filtered = sortedPeople.filter(person => {
      if (sexParam && person.sex !== (sexParam === 'male' ? 'm' : 'f')) {
        return false;
      }

      if (centuriesParams.length > 0) {
        const personCentury = Math.ceil(person.born / 100);

        if (!centuriesParams.includes(personCentury)) {
          return false;
        }
      }

      if (queryParam && !person.name.toLowerCase().includes(queryParam)) {
        return false;
      }

      return true;
    });

    setFilteredPeople(filtered);

    // Обновляем текущие параметры состояния
    setCurrentSortParam(sortParam || '');
    setCurrentIsReverse(isReverse);
  }, [searchParams, people]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {errorText && <p data-cy="peopleLoadingError">{errorText}</p>}

          {people.length === 0 && errorText === '' && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {filteredPeople.length === 0 &&
            people.length > 0 &&
            errorText === '' && (
              <p>There are no people matching the current search criteria</p>
            )}
        </>
      )}

      {!isLoading && people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <Link to={getLink('name')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSortParam !== 'name',
                          'fa-sort-up':
                            currentSortParam === 'name' && !currentIsReverse,
                          'fa-sort-down':
                            currentSortParam === 'name' && currentIsReverse,
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <Link to={getLink('sex')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSortParam !== 'sex',
                          'fa-sort-up':
                            currentSortParam === 'sex' && !currentIsReverse,
                          'fa-sort-down':
                            currentSortParam === 'sex' && currentIsReverse,
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <Link to={getLink('born')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSortParam !== 'born',
                          'fa-sort-up':
                            currentSortParam === 'born' && !currentIsReverse,
                          'fa-sort-down':
                            currentSortParam === 'born' && currentIsReverse,
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <Link to={getLink('died')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSortParam !== 'died',
                          'fa-sort-up':
                            currentSortParam === 'died' && !currentIsReverse,
                          'fa-sort-down':
                            currentSortParam === 'died' && currentIsReverse,
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
            {filteredPeople.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': pathname.endsWith(person.slug),
                })}
              >
                <td>
                  <Link
                    className={classNames({
                      'has-text-danger': person.sex === 'f',
                    })}
                    to={person.slug}
                  >
                    {person.name}
                  </Link>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    getHref(person.motherName) ? (
                      <Link
                        className="has-text-danger"
                        to={getHref(person.motherName)}
                      >
                        {person.motherName}
                      </Link>
                    ) : (
                      person.motherName
                    )
                  ) : (
                    `-`
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    getHref(person.fatherName) ? (
                      <Link to={getHref(person.fatherName)}>
                        {person.fatherName}
                      </Link>
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    `-`
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

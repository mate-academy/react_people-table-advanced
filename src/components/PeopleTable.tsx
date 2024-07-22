import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person, SexType, SortType } from '../types';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
type PeopleTableProps = {
  people: Person[];
  allPeople: Person[];
};

type SelectedSlugParams = {
  currentSlug: string;
};

export const PeopleTable = ({ people, allPeople }: PeopleTableProps) => {
  const { currentSlug } = useParams<SelectedSlugParams>();
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState<string | null>(searchParams.get('sort'));
  const [order, setOrder] = useState<string | null>(searchParams.get('order'));
  const [sortedPeople, setsortedPeople] = useState<Person[]>([]);

  const lookForParent = (parentName: string) => {
    const foundParent = allPeople.find(person => person.name === parentName);

    if (foundParent) {
      return (
        <Link
          to={`/people/${foundParent.slug}?${searchParams.toString()}`}
          className={classNames({
            'has-text-danger': foundParent.sex === SexType.FEMALE,
          })}
        >
          {foundParent.name}
        </Link>
      );
    } else {
      return parentName;
    }
  };

  useEffect(() => {
    setsortedPeople(() => [...people]);

    if (sort) {
      switch (sort) {
        case SortType.NAME:
          if (order) {
            setsortedPeople(prev =>
              prev.sort((personA, personB) =>
                personB.name.localeCompare(personA.name),
              ),
            );
          } else {
            setsortedPeople(prev =>
              prev.sort((personA, personB) =>
                personA.name.localeCompare(personB.name),
              ),
            );
          }

          break;
        case SortType.SEX:
          if (order) {
            setsortedPeople(prev =>
              prev.sort((personA, personB) =>
                personB.sex.localeCompare(personA.sex),
              ),
            );
          } else {
            setsortedPeople(prev =>
              prev.sort((personA, personB) =>
                personA.sex.localeCompare(personB.sex),
              ),
            );
          }

          break;
        case SortType.BORN:
          if (order) {
            setsortedPeople(prev =>
              prev.sort((personA, personB) => personB.born - personA.born),
            );
          } else {
            setsortedPeople(prev =>
              prev.sort((personA, personB) => personA.born - personB.born),
            );
          }

          break;
        case SortType.DIED:
          if (order) {
            setsortedPeople(prev =>
              prev.sort((personA, personB) => personB.died - personA.died),
            );
          } else {
            setsortedPeople(prev =>
              prev.sort((personA, personB) => personA.died - personB.died),
            );
          }

          break;
      }
    } else {
      setsortedPeople(() => [...people]);
    }
  }, [order, people, sort]);

  useEffect(() => {}, []);

  const handleSort = (sortBy: string) => {
    if (sort === sortBy) {
      if (order === 'desc') {
        setSort(null);
        setOrder(null);
      } else {
        setOrder('desc');
      }
    } else {
      setSort(sortBy);
      setOrder(null);
    }
  };

  return (
    <>
      {sortedPeople.length > 0 ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        // eslint-disable-next-line no-nested-ternary
                        sort:
                          sort !== 'name'
                            ? 'name'
                            : order === 'desc'
                              ? null
                              : 'name',
                        order:
                          sort === 'name' && order !== 'desc' ? 'desc' : null,
                      }),
                    }}
                    onClick={() => handleSort('name')}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          { 'fa-sort': sort !== 'name' },
                          { 'fa-sort-up': sort === 'name' && !order },
                          { 'fa-sort-down': sort === 'name' && order },
                        )}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        // eslint-disable-next-line no-nested-ternary
                        sort:
                          sort !== 'sex'
                            ? 'sex'
                            : order === 'desc'
                              ? null
                              : 'sex',
                        order:
                          sort === 'sex' && order !== 'desc' ? 'desc' : null,
                      }),
                    }}
                    onClick={() => handleSort('sex')}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          { 'fa-sort': sort !== 'sex' },
                          { 'fa-sort-up': sort === 'sex' && !order },
                          { 'fa-sort-down': sort === 'sex' && order },
                        )}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        // eslint-disable-next-line no-nested-ternary
                        sort:
                          sort !== 'born'
                            ? 'born'
                            : order === 'desc'
                              ? null
                              : 'born',
                        order:
                          sort === 'born' && order !== 'desc' ? 'desc' : null,
                      }),
                    }}
                    onClick={() => handleSort('born')}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          { 'fa-sort': sort !== 'born' },
                          { 'fa-sort-up': sort === 'born' && !order },
                          { 'fa-sort-down': sort === 'born' && order },
                        )}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        // eslint-disable-next-line no-nested-ternary
                        sort:
                          sort !== 'died'
                            ? 'died'
                            : order === 'desc'
                              ? null
                              : 'died',
                        order:
                          sort === 'died' && order !== 'desc' ? 'desc' : null,
                      }),
                    }}
                    onClick={() => handleSort('died')}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          { 'fa-sort': sort !== 'died' },
                          { 'fa-sort-up': sort === 'died' && !order },
                          { 'fa-sort-down': sort === 'died' && order },
                        )}
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
            {sortedPeople.map(
              ({ slug, name, sex, born, died, motherName, fatherName }) => (
                <tr
                  data-cy="person"
                  key={slug}
                  className={classNames({
                    'has-background-warning': slug === currentSlug,
                  })}
                >
                  <td>
                    <Link
                      to={`/people/${slug}?${searchParams.toString()}`}
                      className={classNames({ 'has-text-danger': sex === 'f' })}
                    >
                      {name}
                    </Link>
                  </td>
                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>{motherName ? lookForParent(motherName) : '-'}</td>
                  <td>{fatherName ? lookForParent(fatherName) : '-'}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};

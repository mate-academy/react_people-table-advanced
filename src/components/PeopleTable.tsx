import {
  FC,
  memo,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { sortBy } from '../utils/sortBy';
import { criteriaError } from './Errors';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  setErrors: React.Dispatch<React.SetStateAction<ReactNode[]>>;
};

export const PeopleTable: FC<Props> = memo(({ people, setErrors }) => {
  const [searchParams] = useSearchParams();
  const searchString = searchParams.toString();

  const currentSortBy = searchParams.get('sortBy');
  const isCurrentlyReversed = searchParams.get('reversed');

  const { slug } = useParams();

  const filterPeople = (ppl: Person[]) => {
    const centuryFltrs = searchParams
      .getAll('centuries').map(filter => parseInt(filter, 10));
    const sexFilter = searchParams.get('sex');
    const query = searchParams.get('query');

    return ppl.filter(person => {
      if (sexFilter && sexFilter !== person.sex) {
        return false;
      }

      if (query?.length && !person.name.includes(query)) {
        return false;
      }

      if (centuryFltrs.length
        && !centuryFltrs.includes(Math.ceil(person.born / 100))
      ) {
        return false;
      }

      return true;
    });
  };

  const sortPeople = (ppl: Person[]) => {
    if (currentSortBy && !isCurrentlyReversed) {
      return sortBy([...ppl], currentSortBy);
    }

    if (currentSortBy) {
      return sortBy([...ppl], currentSortBy).reverse();
    }

    return ppl;
  };

  const handleSortClick = (nextSortBy: string) => {
    // First click
    if (!currentSortBy || nextSortBy !== currentSortBy) {
      return { sortBy: nextSortBy, reversed: null };
    }

    // Second click
    if (currentSortBy === nextSortBy && !isCurrentlyReversed) {
      return { sortBy: nextSortBy, reversed: 'yes' };
    }

    // Third click
    return { sortBy: null, reversed: null };
  };

  const [visiblePeople, setVisiblePeople] = useState(() => {
    const filteredPeople = filterPeople(people);

    if (filteredPeople.length) {
      return sortPeople(filteredPeople);
    }

    return [];
  });

  useEffect(() => {
    const preparedPeople = filterPeople(people);

    if (preparedPeople.length) {
      setErrors(prev => prev.filter(err => err !== criteriaError));
      setVisiblePeople(sortPeople(preparedPeople));
    } else {
      setErrors(prev => [...prev, criteriaError]);
      setVisiblePeople([]);
    }
  }, [searchString, people]);

  useEffect(() => {
    setErrors(prev => {
      if (visiblePeople.length === 0) {
        return [...prev, criteriaError];
      }

      return prev.filter(err => err !== criteriaError);
    });
  }, []);

  return (
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
                params={handleSortClick('name')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': currentSortBy !== 'name' },
                    {
                      'fa-sort-up': currentSortBy === 'name'
                        && isCurrentlyReversed,
                    },
                    {
                      'fa-sort-down': currentSortBy === 'name'
                        && !isCurrentlyReversed,
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={handleSortClick('sex')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': currentSortBy !== 'sex' },
                    {
                      'fa-sort-up': currentSortBy === 'sex'
                        && isCurrentlyReversed,
                    },
                    {
                      'fa-sort-down': currentSortBy === 'sex'
                        && !isCurrentlyReversed,
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={handleSortClick('born')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': currentSortBy !== 'born' },
                    {
                      'fa-sort-up': currentSortBy === 'born'
                        && isCurrentlyReversed,
                    },
                    {
                      'fa-sort-down': currentSortBy === 'born'
                        && !isCurrentlyReversed,
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={handleSortClick('died')}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': currentSortBy !== 'died' },
                    {
                      'fa-sort-up': currentSortBy === 'died'
                        && isCurrentlyReversed,
                    },
                    {
                      'fa-sort-down': currentSortBy === 'died'
                        && !isCurrentlyReversed,
                    },
                  )}
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
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames(
              { 'has-background-warning': slug === person.slug },
            )}
          >
            <td>
              <a
                className={`link${person.sex === 'f' ? ' link--red' : ''}`}
                href={`#/people/${person.slug}${searchString.length ? `?${searchString}` : ''}`}
              >
                {person.name}
              </a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother
              ? (
                <td>
                  <a
                    className="link link--red"
                    href={`#/people/${person.mother.slug}${searchString.length ? `?${searchString}` : ''}`}
                  >
                    {person.motherName}
                  </a>
                </td>
              ) : (
                <td>{person.motherName || '-'}</td>
              )}
            {person.father
              ? (
                <td>
                  <a
                    className="link"
                    href={`#/people/${person.father.slug}${searchString.length ? `?${searchString}` : ''}`}
                  >
                    {person.fatherName}
                  </a>
                </td>
              ) : (
                <td>{person.fatherName || '-'}</td>
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

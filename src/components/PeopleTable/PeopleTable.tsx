import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';
import { ErrorMassege } from '../../types/ErrorMassege';
import { Error } from '../../types/Error';
import { Person } from '../../types';
import { getSearchWith } from '../../utils/searchHelper';
// import { sorting } from '../../utils/sorting';

type Props = {
  people: Person[],
  isLoading: boolean,
  isError: Error,
  // setIsError: (error: Error) => void,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  isError,
  // setIsError,
}) => {
  const { personData = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const centuriesSearchParams = searchParams.getAll('centuries') || [];
  const querySearchParams = searchParams.get('query') || '';
  const sortingSearchParams = searchParams.get('sort') || '';
  // const [sortedParams, setSortedParams] = useState({ param: '', call: 0});

  const displayError = useCallback((error: Error) => {
    switch (error.notification) {
      case ErrorMassege.Load:
        return (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error.notification}
          </p>
        );

      case ErrorMassege.Empty:
        return (
          <p data-cy="noPeopleMessage">
            {error.notification}
          </p>
        );
      default:
        return '';
    }
  }, []);

  const findParent = useCallback((parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const possibleParent = people.find(person => person.name === parentName);

    return possibleParent
      ? <PersonLink person={possibleParent} />
      : parentName;
  }, [people]);

  const visiblePeople = useMemo(() => {
    let visible = people;

    if (sex) {
      visible = visible.filter(person => person.sex === sex);
    }

    if (centuriesSearchParams.length > 0) {
      visible = visible.filter(person => {
        const bornInCentury = (Math.floor(person.born / 100) + 1).toString();

        return centuriesSearchParams.includes(bornInCentury);
      });
    }

    if (querySearchParams.length !== 0) {
      visible = visible.filter(person => {
        const checkQuery = querySearchParams.toLowerCase();

        const isFittedName = person.name.toLowerCase().includes(checkQuery);
        const isFittedMotherName = person.motherName
          ? person.motherName.toLowerCase().includes(checkQuery)
          : false;
        const isFittedFatherName = person.fatherName
          ? person.fatherName.toLowerCase().includes(checkQuery)
          : false;

        return (isFittedName || isFittedMotherName || isFittedFatherName);
      });
    }

    // if (sortingSearchParams) {
    //   visible = sorting(visible, sortingSearchParams);
    // }
    // console.log(sortingSearchParams);

    // if (sortingSearchParams.length) {
    //   if (sortedParams.call === 0) {
    //     setSortedParams({ param: sortingSearchParams, call: 1});
    //   } else if (sortedParams.call === 1) {
    //     if (sortedParams.param === sortingSearchParams) {
    //       setSortedParams(params => ({
    //         ...params,
    //         call: params.call + 1,
    //       }));
    //     }
    //   } else if (sortedParams.call === 2) {
    //     setSortedParams({ param: '', call: 0 });
    //   }
    // }

    // console.log(sortingSearchParams);

    return visible;
  }, [sex,
    people,
    centuriesSearchParams,
    querySearchParams,
    sortingSearchParams,
  ]);

  return (
    <>
      {isLoading
        ? <Loader />
        : (isError.status && displayError(isError))}
      {(!isLoading && !isError.status && !visiblePeople.length) && (
        `${ErrorMassege.Search}`
      )}
      {(!isLoading && !isError.status && visiblePeople.length !== 0) && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {/* <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <a href="#/people?sort=name">
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th> */}

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <Link
                    // href="#/people?sort=name"
                    to={{
                      search: getSearchWith(searchParams, { sort: 'name' }),
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a href="#/people?sort=sex">
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a href="#/people?sort=born&amp;order=desc">
                    <span className="icon">
                      <i className="fas fa-sort-down" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a href="#/people?sort=died">
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visiblePeople.map((person) => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames(
                  { 'has-background-warning': person.slug === personData },
                )}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {findParent(person.motherName)}
                </td>
                <td>
                  {findParent(person.fatherName)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

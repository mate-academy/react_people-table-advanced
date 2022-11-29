import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';
import { ErrorMassege } from '../../types/ErrorMassege';
import { Error } from '../../types/Error';
import { Person } from '../../types';
import { SortLink } from '../SortLink';
import { SortBy } from '../../types/SortBy';

type Props = {
  people: Person[],
  isLoading: boolean,
  isError: Error,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  isError,
}) => {
  const { personData = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const centuriesParams = searchParams.getAll('centuries') || [];
  const queryParams = searchParams.get('query') || '';
  const sortingParams = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

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

    if (centuriesParams.length) {
      visible = visible.filter(person => {
        const bornInCentury = (Math.floor(person.born / 100) + 1).toString();

        return centuriesParams.includes(bornInCentury);
      });
    }

    if (queryParams.length) {
      visible = visible.filter(person => {
        const checkQuery = queryParams.toLowerCase();

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

    if (sortingParams.length) {
      const sortedList = [...visible].sort((person1, person2) => {
        switch (sortingParams) {
          case SortBy.Name:
          case SortBy.Sex:

            return person1[sortingParams].localeCompare(person2[sortingParams]);
          case SortBy.Born:
          case SortBy.Died:

            return person1[sortingParams] - person2[sortingParams];

          default:
            return 0;
        }
      });

      visible = sortOrder ? sortedList.reverse() : sortedList;
    }

    return visible;
  }, [sex,
    people,
    centuriesParams,
    queryParams,
    sortingParams,
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
              <th>
                <SortLink title={SortBy.Name} />
              </th>

              <th>
                <SortLink title={SortBy.Sex} />
              </th>

              <th>
                <SortLink title={SortBy.Born} />
              </th>

              <th>
                <SortLink title={SortBy.Died} />
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

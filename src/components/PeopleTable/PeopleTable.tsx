import React, { useContext, useEffect, useMemo } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Actions, DispatchContext, StateContext } from '../../Store';
import { Person } from '../../types';
import { PersonLink } from '../Person';
import { SortBy } from '../../utils/variables';
import { TableHead } from '../TableHead';
import { useSearchParams } from 'react-router-dom';

export const PeopleTable: React.FC = () => {
  const { people, errorMessage, isLoading } = useContext(StateContext);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const orderBy = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';

  const dispatch = useContext(DispatchContext);

  const getCenturyFromYear = (year: string) =>
    Math.ceil(+year / 100).toString();

  useEffect(() => {
    dispatch({ type: Actions.setIsLoading, status: true });
    getPeople()
      .then(response => {
        dispatch({ type: Actions.getPeople, people: response });
        dispatch({ type: Actions.setIsLoading, status: false });
      })
      .catch(error => {
        dispatch({
          type: Actions.setErrorMessage,
          errorMessage: 'Something went wrong',
        });

        throw error;
      });
  }, [dispatch]);

  const filteredPeople = useMemo(() => {
    const centuries = searchParams.getAll('centuries') || [];
    let sortedPeople = [...people];

    if (centuries.length > 0) {
      sortedPeople = sortedPeople.filter(person => {
        return centuries.includes(getCenturyFromYear(person.born.toString()));
      });
    }

    if (sex) {
      sortedPeople = sortedPeople.filter(person => {
        return sex === person.sex;
      });
    }

    if (query) {
      sortedPeople = sortedPeople.filter(person => {
        return (
          (person.name && person.name.toLowerCase()) ||
          (person.fatherName && person.fatherName.toLowerCase()) ||
          (person.motherName && person.motherName.toLowerCase())
        )?.includes(query.toLowerCase());
      });
    }

    sortedPeople = sortedPeople.sort((a, b) => {
      switch (sortBy) {
        case SortBy.Name:
        case SortBy.Sex:
          return orderBy
            ? b[sortBy].localeCompare(a[sortBy])
            : a[sortBy].localeCompare(b[sortBy]);
        case SortBy.Born:
        case SortBy.Died:
          return orderBy ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
        default:
          return 0;
      }
    });

    return sortedPeople;
  }, [orderBy, people, query, searchParams, sex, sortBy]);

  return (
    <>
      {query && filteredPeople.length === 0 && (
        <p>There are no people matching the current search criteria</p>
      )}

      {isLoading && !errorMessage && <Loader />}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {people.length === 0 && !isLoading && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {people.length > 0 && !isLoading && (
        <div className="block">
          {filteredPeople.length > 0 && (
            <div className="box table-container">
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>{<TableHead />}</thead>

                <tbody>
                  {filteredPeople.map((person: Person) => {
                    const { slug } = person;

                    return <PersonLink key={slug} person={person} />;
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

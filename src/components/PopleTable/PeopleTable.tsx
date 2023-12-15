/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';
import { findParent } from '../../services/findParent';
import { filterPeople } from '../../utils/filterPeople';
import { SortLink } from '../SortLink/SortLink';
import { sortPeople } from '../../utils/sortPeople';
import { PeopleContext } from '../PeopleProvider/PeopleProvider';

export const PeopleTable = () => {
  const {
    people,
    isLoading,
    isError,
    isEmpty,
  } = useContext(PeopleContext);

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const preparingPeopleForRending = useMemo(() => {
    const peopleWithParents = people.map(person => ({
      ...person,
      mother: findParent(person.motherName, people),
      father: findParent(person.fatherName, people),
    }));

    return peopleWithParents;
  }, [people]);

  const filteredPeople = useMemo(() => {
    return filterPeople(preparingPeopleForRending, query, sex, centuries);
  }, [preparingPeopleForRending, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filteredPeople, sort, order);
  }, [filteredPeople, sort, order]);

  return (
    <div className="column">
      <div className="box table-container">
        {isLoading && (<Loader />)}

        {(!isLoading && isError) && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(!isLoading && !isError && isEmpty) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!filteredPeople.length && !isLoading && (
          <p>There are no people matching the current search criteria</p>
        )}

        {(!isLoading && !isError && filteredPeople.length > 0) && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SortLink sortField="name" />
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SortLink sortField="sex" />
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SortLink sortField="born" />
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SortLink sortField="died" />
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {sortedPeople.map(person => {
                const {
                  born,
                  died,
                  fatherName,
                  motherName,
                  father,
                  mother,
                } = person;

                return (
                  <tr
                    key={person.name}
                    data-cy="person"
                    className={cn({
                      'has-background-warning': slug === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    <td>
                      {mother
                        ? <PersonLink person={mother} />
                        : (motherName || '-')}
                    </td>
                    <td>
                      {father
                        ? <PersonLink person={father} />
                        : (fatherName || '-')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

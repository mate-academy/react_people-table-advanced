import React from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  allPeople: Person[];
  isLoading: boolean;
  errorMessage: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
  isLoading,
  errorMessage,
}) => {
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findPersonByName = (name: string | null) => {
    if (!name) {
      return null;
    }

    return allPeople.find(person => person.name === name) || null;
  };

  const showNoPeopleMessage =
    !isLoading && !errorMessage && people.length === 0;

  const getSortParams = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (!order) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {showNoPeopleMessage && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people.length > 0 && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink params={getSortParams('name')}>
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== 'name',
                            'fa-sort-up': sort === 'name' && !order,
                            'fa-sort-down': sort === 'name' && order === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink params={getSortParams('sex')}>
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== 'sex',
                            'fa-sort-up': sort === 'sex' && !order,
                            'fa-sort-down': sort === 'sex' && order === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink params={getSortParams('born')}>
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== 'born',
                            'fa-sort-up': sort === 'born' && !order,
                            'fa-sort-down': sort === 'born' && order === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink params={getSortParams('died')}>
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== 'died',
                            'fa-sort-up': sort === 'died' && !order,
                            'fa-sort-down': sort === 'died' && order === 'desc',
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
              {people.map(person => {
                const mother = findPersonByName(person.motherName);
                const father = findPersonByName(person.fatherName);

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': person.slug === selectedSlug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>

                    <td>
                      {mother ? (
                        <PersonLink person={mother} />
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>

                    <td>
                      {father ? (
                        <PersonLink person={father} />
                      ) : (
                        person.fatherName || '-'
                      )}
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

import classNames from 'classnames';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const findPerson = (list: Person[], targetName: string) => {
    return list.find(person => person.name === targetName) || null;
  };

  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');
  const orderBy = searchParams.get('order');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  let tempPeopleList = [...people];

  const sortByCriteria = (tempPeople: Person[]) => {
    tempPeople.sort((a, b) => {
      let p1 = a;
      let p2 = b;

      if (orderBy === 'desc') {
        [p1, p2] = [p2, p1];
      }

      switch (sortBy) {
        case 'name':
          return p1.name.localeCompare(p2.name);
        case 'sex':
          return p1.sex.localeCompare(p2.sex);
        case 'born':
          return p1.born - p2.born;
        case 'died':
          return p1.died - p2.died;

        default:
          return 0;
      }
    });
  };

  const filteringPeopleList = (queryProp: string | null) => {
    if (centuries.length) {
      tempPeopleList = [...tempPeopleList].filter(person => (
        centuries.includes((Math.floor(person.born / 100) + 1).toString())
      ));
    }

    if (sex) {
      tempPeopleList = [...tempPeopleList].filter(person => person.sex === sex);
    }

    if (queryProp) {
      tempPeopleList = [...tempPeopleList].filter(person => (
        person.name.toLowerCase().includes(queryProp.toLowerCase())
        || person.motherName?.toLowerCase().includes(queryProp.toLowerCase())
        || person.fatherName?.toLowerCase().includes(queryProp.toLowerCase())
      ));
    }
  };

  filteringPeopleList(query);
  sortByCriteria(tempPeopleList);
  const setParamsToLink = (sortCriteria: string) => {
    if (sortCriteria === sortBy && orderBy === 'desc') {
      return { sort: null, order: null };
    }

    if (sortCriteria === sortBy) {
      return { sort: sortCriteria, order: 'desc' };
    }

    return { sort: sortCriteria, order: null };
  };

  return (
    <>
      {tempPeopleList.length
        ? (
          <table
            data-cy="peopleTable"
            className="
                    table is-striped
                    is-hoverable
                    is-narrow
                    is-fullwidth
                  "
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink
                      params={setParamsToLink('name')}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas fa-sort', {
                            'fa-sort-down': sortBy === 'name',
                            'fa-sort-up': orderBy === 'desc'
                              && sortBy === 'name',
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
                      params={setParamsToLink('sex')}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas fa-sort', {
                            'fa-sort-down': sortBy === 'sex',
                            'fa-sort-up': orderBy === 'desc'
                              && sortBy === 'sex',
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
                      params={setParamsToLink('born')}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas fa-sort', {
                            'fa-sort-down': sortBy === 'born',
                            'fa-sort-up': orderBy === 'desc'
                              && sortBy === 'born',
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
                      params={setParamsToLink('died')}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas fa-sort', {
                            'fa-sort-down': sortBy === 'died',
                            'fa-sort-up': orderBy === 'desc'
                              && sortBy === 'died',
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
              {tempPeopleList.map(person => (
                <tr
                  data-cy="person"
                  key={person.name}
                  className={classNames({
                    'has-background-warning': person.slug === slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>

                  <td>{person.born}</td>

                  <td>{person.died}</td>

                  <td>
                    {person.motherName ? (
                      <PersonLink
                        person={
                          findPerson([...people], person.motherName)
                        }
                        parentName={person.motherName}
                      />
                    ) : (
                      '-'
                    )}
                  </td>

                  <td>
                    {person.fatherName ? (
                      <PersonLink
                        person={
                          findPerson([...people], person.fatherName)
                        }
                        parentName={person.fatherName}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>
            There are no people matching the current search criteria
          </p>
        )}

    </>

  );
};

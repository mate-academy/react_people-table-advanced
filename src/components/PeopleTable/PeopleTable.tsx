import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const { userSlug } = useParams();

  const [searchParams] = useSearchParams();

  const peopleSort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortedPeople = useMemo(() => (
    [...people].sort((a, b) => {
      switch (peopleSort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'sex':
          return a.sex.localeCompare(b.sex);
        case 'born':
          return a.born - b.born;
        case 'died':
          return a.died - b.died;
        default:
          return 0;
      }
    })
  ), [people, peopleSort]);

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {
                ['Name', 'Sex', 'Born', 'Died'].map((item) => {
                  const newSort = item.toLowerCase();

                  const sortValue = peopleSort === newSort ? null : newSort;

                  return (
                    <th key={item}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {item}
                        <SearchLink
                          params={{
                            sort: (
                              order
                                ? sortValue
                                : newSort
                            ),
                            order: (
                              peopleSort === newSort && !order
                                ? 'desc'
                                : null
                            ),
                          }}
                        >
                          <span className="icon">
                            <i
                              className={classNames(
                                'fas',
                                'fa-sort',
                                {
                                  'fa-sort-up': (
                                    peopleSort === newSort && !order
                                  ),
                                  'fa-sort-down': (
                                    peopleSort === newSort && order
                                  ),
                                },
                              )}
                            />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                  );
                })
              }
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {
              sortedPeople.map((person) => {
                const {
                  slug,
                  sex,
                  born,
                  died,
                  motherName,
                  fatherName,
                } = person;

                const mother = people.find((human) => (
                  human.name === motherName
                ));

                const father = people.find((human) => (
                  human.name === fatherName
                ));

                const isSelected = userSlug === slug;

                return (
                  <tr
                    data-cy="person"
                    key={slug}
                    className={classNames(
                      { 'has-background-warning': isSelected },
                    )}
                  >
                    <td>
                      <PersonLink
                        person={person}
                      />
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>

                    <td>
                      {
                        mother
                          ? (
                            <PersonLink
                              person={mother}
                            />
                          ) : (
                            <span>{motherName || '-'}</span>
                          )
                      }
                    </td>

                    <td>
                      {
                        father
                          ? (
                            <PersonLink
                              person={father}
                            />
                          ) : (
                            <span>{fatherName || '-'}</span>
                          )
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

      </div>
    </div>
  );
};

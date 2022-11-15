import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { ModifiedPerson } from '../../../types';
import { SearchLink } from '../../SearchLink';

type Props = {
  personLink: string;
  people: ModifiedPerson[] | null;
};

export const PeopleTable: FC<Props> = ({
  personLink,
  people,
}) => {
  const [peopleList, setPeopleList] = useState<ModifiedPerson[] | null>(people);
  const [searchParams] = useSearchParams();
  const centuries = useMemo(
    () => searchParams.getAll('century') || [], [searchParams],
  );
  const sexFilter = useMemo(
    () => searchParams.get('sex') || '', [searchParams],
  );
  const queryFilter = useMemo(
    () => searchParams.get('query') || '', [searchParams],
  );

  const sortType = useMemo(
    () => searchParams.get('sort') || '', [searchParams],
  );

  const orderType = useMemo(
    () => searchParams.get('order') || '', [searchParams],
  );

  const location = useLocation();

  const filterPeopleByCentury = (visiblePeople: ModifiedPerson[] | null) => {
    return visiblePeople?.filter(person => (
      centuries.includes(person.century)));
  };

  const filterPeopleBySex = (visiblePeople: ModifiedPerson[] | null) => {
    return visiblePeople?.filter(person => person.sex === sexFilter);
  };

  const filterPeopleByQuery = (visiblePeople: ModifiedPerson[] | null) => {
    return visiblePeople?.filter(person => (
      person.name.toLowerCase().includes(queryFilter)
        || person.motherName?.toLowerCase().includes(queryFilter)
        || person.fatherName?.toLowerCase().includes(queryFilter)
    ));
  };

  const sortPeople = (visiblePeople: ModifiedPerson[] | null) => {
    if (visiblePeople) {
      return [...visiblePeople].sort((personA, personB) => {
        switch (sortType) {
          case 'born':
          case 'died':
            return !orderType
              ? personA[sortType] - personB[sortType]
              : personB[sortType] - personA[sortType];

          case 'name':
          case 'sex':
            return !orderType
              ? personA[sortType].localeCompare(personB[sortType])
              : personB[sortType].localeCompare(personA[sortType]);

          default:
            return 0;
        }
      });
    }

    return visiblePeople;
  };

  const sortingDirection = useCallback(
    (type: string) => sortType === type && !orderType, [orderType, sortType],
  );
  const sortingType = useCallback(
    (type: string) => sortType !== type || (sortType === type && !orderType),
    [orderType, sortType],
  );
  const shouldSort = useCallback(
    (type: string) => (sortType !== type), [sortType],
  );
  const shouldSortUp = useCallback(
    (type: string) => sortType === type && !orderType, [sortType, orderType],
  );
  const shouldSortDown = useCallback(
    (type: string) => sortType === type && orderType, [sortType, orderType],
  );

  useEffect(() => {
    let visiblePeople = people;

    if (people && centuries.length > 0) {
      visiblePeople = filterPeopleByCentury(visiblePeople) || null;
    }

    if (people && sexFilter) {
      visiblePeople = filterPeopleBySex(visiblePeople) || null;
    }

    if (people && queryFilter) {
      visiblePeople = filterPeopleByQuery(visiblePeople) || null;
    }

    visiblePeople = sortPeople(visiblePeople);

    setPeopleList(() => visiblePeople);
  }, [people, centuries, sexFilter, queryFilter, sortType, orderType]);

  return (
    <>
      {peopleList?.length === 0
        ? <p>There are no people matching the current search criteria</p>
        : (
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
                      params={{
                        sort: sortingType('name')
                          ? 'name'
                          : null,
                        order: sortingDirection('name')
                          ? 'desc'
                          : null,
                      }}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas',
                          {
                            'fa-sort': shouldSort('name'),
                            'fa-sort-up': shouldSortUp('name'),
                            'fa-sort-down': shouldSortDown('name'),
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
                      params={{
                        sort: sortingType('sex')
                          ? 'sex'
                          : null,
                        order: sortingDirection('sex')
                          ? 'desc'
                          : null,
                      }}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas',
                          {
                            'fa-sort': shouldSort('sex'),
                            'fa-sort-up': shouldSortUp('sex'),
                            'fa-sort-down': shouldSortDown('sex'),
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
                      params={{
                        sort: sortingType('born')
                          ? 'born'
                          : null,
                        order: sortingDirection('born')
                          ? 'desc'
                          : null,
                      }}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas',
                          {
                            'fa-sort': shouldSort('born'),
                            'fa-sort-up': shouldSortUp('born'),
                            'fa-sort-down': shouldSortDown('born'),
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
                      params={{
                        sort: sortingType('died')
                          ? 'died'
                          : null,
                        order: sortingDirection('died')
                          ? 'desc'
                          : null,
                      }}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas',
                          {
                            'fa-sort': shouldSort('died'),
                            'fa-sort-up': shouldSortUp('died'),
                            'fa-sort-down': shouldSortDown('died'),
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
              {peopleList && peopleList.map(person => {
                const {
                  name,
                  sex,
                  born,
                  died,
                  fatherName,
                  motherName,
                  slug,
                  mother,
                  father,
                } = person;
                const isWomen = sex === 'f';
                const isSelected = personLink === slug;

                return (
                  <tr
                    data-cy="person"
                    key={slug}
                    className={classNames({
                      'has-background-warning': isSelected,
                    })}
                  >
                    <td
                      className={classNames(
                        { 'has-text-danger': isWomen },
                      )}
                    >
                      <PersonLink
                        to={{
                          pathname: `/people/${slug}`,
                          search: location.search,
                        }}
                        text={name}
                        className={isWomen ? 'has-text-danger' : ''}
                      />
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    {mother
                      ? (
                        <td>
                          <PersonLink
                            to={{
                              pathname: `/people/${mother.slug}`,
                              search: location.search,
                            }}
                            text={mother.name}
                            className="has-text-danger"
                          />
                        </td>

                      )
                      : (
                        <td>
                          {motherName || '-'}
                        </td>
                      )}

                    {father
                      ? (
                        <td>
                          <PersonLink
                            to={{
                              pathname: `/people/${father.slug}`,
                              search: location.search,
                            }}
                            text={father.name}
                            className=""
                          />
                        </td>
                      )
                      : (
                        <td>
                          {fatherName || '-'}
                        </td>
                      )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
    </>

  );
};

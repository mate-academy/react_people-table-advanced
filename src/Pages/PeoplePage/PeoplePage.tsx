/* eslint-disable no-nested-ternary */
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../../components/PersonLink/PersonLink';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { getSearchWith } from '../../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { selectedSlug } = useParams<{ selectedSlug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedPeople, setDisplayedPeople] = useState<Person[] | null>(null);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const queryParam = searchParams.get('query') || '';
  const centuriesParam = searchParams.getAll('centuries') || '';
  const sexParam = searchParams.get('sex') || '';

  useEffect(() => {
    getPeople().then((res) => {
      const personAndParents = res.map(person => {
        const mother = res.find((motherPerson) => {
          return motherPerson.name === person.motherName;
        });
        const father = res.find((fatherPerson) => {
          return fatherPerson.name === person.fatherName;
        });
        const centuries = Math.ceil(person.born / 100);

        return {
          ...person,
          mother,
          father,
          centuries,
        };
      });

      setPeople(personAndParents);
      setIsLoading(false);
    }).catch(() => {
      setHasError(true);
    });
  }, []);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith((searchParams), { query: event.target.value || null }),
    );
  };

  function compareValues(valueA: string | number, valueB: string | number) {
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    return 0;
  }

  const filteredPeople = useMemo(() => {
    let filteredPeopleList = people;

    if (sexParam && filteredPeopleList) {
      filteredPeopleList = filteredPeopleList.filter((person) => (
        person.sex === sexParam
      ));
    }

    if (queryParam && filteredPeopleList) {
      const normalizedQuery = queryParam.toLowerCase();

      filteredPeopleList = filteredPeopleList.filter((person) => {
        const fullName = `${person.name}`.toLowerCase();

        return fullName.includes(normalizedQuery);
      });
    }

    if (centuriesParam.length > 0 && filteredPeopleList) {
      filteredPeopleList = filteredPeopleList.filter((person) => (
        centuriesParam.some((century) => (
          person.centuries.toString() === century
        ))
      ));
    }

    if (sortField && filteredPeopleList) {
      filteredPeopleList = filteredPeopleList.sort((a, b) => {
        const valueA
          = sortField === 'born'
            ? a.born
            : sortField === 'died'
              ? a.died
              : sortField === 'name'
                ? a.name
                : sortField === 'sex'
                  ? a.sex
                  : a[sortField];
        const valueB
          = sortField === 'born'
            ? b.born
            : sortField === 'died'
              ? b.died
              : sortField === 'name'
                ? b.name
                : sortField === 'sex'
                  ? b.sex
                  : b[sortField];

        if (sortOrder === 'desc') {
          return compareValues(valueB, valueA);
        }

        return compareValues(valueA, valueB);
      });
    }

    return filteredPeopleList;
  }, [people, sexParam, centuriesParam, queryParam, sortField, sortOrder]);

  useEffect(() => {
    setDisplayedPeople(filteredPeople);
  }, [filteredPeople]);

  const handleSortClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    field: string,
  ) => {
    event.preventDefault();

    let newSortOrder = 'asc';

    if (sortField === field) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : '';
    }

    setSortField(field);
    setSortOrder(newSortOrder);

    const newSearchParams = getSearchWith(searchParams, {
      sort: field,
      order: newSortOrder === 'desc' ? 'desc' : null,
    });

    setSearchParams(newSearchParams);
  };

  const peopleElements = displayedPeople?.map(person => {
    const {
      sex,
      born,
      died,
      mother,
      father,
      slug,
    } = person;

    return (
      <tr
        data-cy="person"
        key={slug}
        className={classNames({
          'has-background-warning': slug === selectedSlug,
        })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother
            ? <PersonLink person={mother} />
            : (person.motherName || '-')}
        </td>
        <td>
          {father
            ? <PersonLink person={father} />
            : (person.fatherName || '-')}
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people?.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={queryParam}
                onChangeQuery={handleChangeQuery}
                sex={sexParam}
                centuries={centuriesParam}
              />
            </div>
          )}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : people?.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Name
                      <a
                        href="#/people?sort=name"
                        onClick={(e) => handleSortClick(e, 'name')}
                      >
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Sex
                      <a
                        href="#/people?sort=sex"
                        onClick={(e) => handleSortClick(e, 'sex')}
                      >
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Born
                      <a
                        href="#/people?sort=born"
                        onClick={(e) => handleSortClick(e, 'born')}
                      >
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Died
                      <a
                        href="#/people?sort=died"
                        onClick={(e) => handleSortClick(e, 'died')}
                      >
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

              <tbody>{peopleElements}</tbody>
            </table>
          )}

        </div>
      </div>
    </>
  );
};

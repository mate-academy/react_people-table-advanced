import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from 'react-bulma-components';
import classnames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { getUsers } from './api';

interface People {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
}

enum SortBy {
  sex = 'sex',
  name = 'name',
  born = 'born',
  died = 'died',
  default = 'default',
}

const sortPeople = (
  arrayOfPeople: People[] | [],
  sortType: SortBy | string,
) => {
  switch (sortType) {
    case SortBy.name:
      return arrayOfPeople
        .sort((personOne, personTwo) => personOne.name
          .localeCompare(personTwo.name));

    case SortBy.sex:
      return arrayOfPeople
        .sort((personOne, personTwo) => personOne.sex
          .localeCompare(personTwo.sex));

    case SortBy.born:
      return arrayOfPeople
        .sort((personOne, personTwo) => personOne.born - personTwo.born);

    case SortBy.died:
      return arrayOfPeople
        .sort((personOne, personTwo) => personOne.died - personTwo.died);

    default:
      return arrayOfPeople;
  }
};

function searchIncudings(
  {
    name,
    fatherName,
    motherName,
  }: People,
  query: string,
): boolean {
  const checkedValues: string[] = [];
  const inputValues = [name, fatherName, motherName];

  inputValues.forEach(value => {
    if (typeof value === 'string') {
      checkedValues.push(value);
    }
  });
  const findIncludings = checkedValues.some(value => {
    return value
      .toLowerCase()
      .includes(query.toLocaleLowerCase());
  });

  return findIncludings;
}

export const PeopleTable: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const [peopleList, getPeople] = useState<People[] | null>(null);
  const [query, getQuery] = useState('');
  const [sortingType, setSortingType] = useState<SortBy>(SortBy.default);
  const [isReversed, setReversed] = useState(true);
  const preparedPeopleList: People[] = useMemo(() => {
    const filteredList = peopleList?.filter(person => {
      const queryForSearch = searchParams.get('query') || '';

      return searchIncudings(person, queryForSearch);
    }) || [];

    if (sortingType !== SortBy.default) {
      const sortTypeFromUrl = searchParams.get('sortBy') || sortingType;

      return sortPeople(filteredList, sortTypeFromUrl) || [];
    }

    return filteredList || [];
  }, [peopleList, query, sortingType, isReversed]);

  const handleQueryChange = (queryfromInput: string) => {
    if (queryfromInput.length) {
      searchParams.set('query', query);
    } else {
      searchParams.delete('query');
    }

    navigate(`?${searchParams.toString()}`);
  };

  const handleSortType = (sortby: string) => {
    if (sortingType !== SortBy.default) {
      searchParams.set('sortBy', String(sortby));
    } else {
      searchParams.delete('sortBy');
    }

    navigate(`?${searchParams.toString()}`);
  };

  const findUser = (personName: string) => {
    return location.pathname
      .replace(/[0-9]/gi, '')
      .replace('/table/', '')
      .split('-')
      .slice(0, -1)
      .join(' ') === personName.toLowerCase();
  };

  useEffect(() => {
    setTimeout(() => getUsers()
      .then(people => {
        getPeople(people);
      }), 1000);
  }, []);

  if (!isReversed) {
    preparedPeopleList.reverse();
  }

  return (
    <>
      <div className="table-container">
        <input
          type="text"
          className="input is-medium"
          value={query}
          onChange={(event) => {
            handleQueryChange(event.target.value);
            getQuery(event.target.value);
          }}
          placeholder="Enter person name"
        />
        <table className="table is-hoverable">
          <thead>
            <tr>
              <th>
                <abbr title="name">Name</abbr>

                <div className="arrows">
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    onClick={() => {
                      setReversed(true);
                      handleSortType(SortBy.name);
                      setSortingType(SortBy.name);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    onClick={() => {
                      setReversed(false);
                      handleSortType(SortBy.name);
                      setSortingType(SortBy.name);
                    }}
                  />
                </div>
              </th>
              <th>
                <abbr title="sex">Sex</abbr>

                <div className="arrows">
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    onClick={() => {
                      setReversed(true);
                      handleSortType(SortBy.sex);
                      setSortingType(SortBy.sex);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    onClick={() => {
                      setReversed(false);
                      handleSortType(SortBy.sex);
                      setSortingType(SortBy.sex);
                    }}
                  />
                </div>
              </th>

              <th>
                <abbr title="born">Born</abbr>
                <div className="arrows">
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    onClick={() => {
                      setReversed(true);
                      handleSortType(SortBy.born);
                      setSortingType(SortBy.born);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    onClick={() => {
                      setReversed(false);
                      handleSortType(SortBy.born);
                      setSortingType(SortBy.born);
                    }}
                  />
                </div>
              </th>
              <th>
                <abbr title="died">Died</abbr>
                <div className="arrows">
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    onClick={() => {
                      setReversed(true);
                      handleSortType(SortBy.died);
                      setSortingType(SortBy.died);
                    }}
                  />

                  <FontAwesomeIcon
                    icon={faArrowDown}
                    onClick={() => {
                      setReversed(!isReversed);
                      handleSortType(SortBy.died);
                      setSortingType(SortBy.died);
                    }}
                  />

                </div>
              </th>
              <th><abbr title="Fathername">Fathername</abbr></th>

              <th><abbr title="Mothername">Mothername</abbr></th>
            </tr>
          </thead>

          {preparedPeopleList.length

            ? (
              <tbody>
                {preparedPeopleList.map(person => {
                  const selectedPersonClasses = classnames({
                    'is-selected': findUser(person.name),
                  });
                  const fatherInList = preparedPeopleList
                    .find(people => person.fatherName === people.name);

                  const motherInList = preparedPeopleList
                    .find(people => person.motherName === people.name);

                  return (
                    <tr
                      key={person.slug}
                      className={selectedPersonClasses}
                    >
                      <th
                        style={
                          {
                            backgroundColor:
                              SortBy.name === searchParams.get('sortBy')
                                ? 'lightblue'
                                : '',
                          }
                        }
                      >
                        <Link
                          to={{
                            pathname: `${person.slug}`,
                            search: location.search,
                          }}
                          style={{
                            color: person.sex === 'f'
                              ? 'rgb(255, 0, 0)'
                              : 'rgb(0, 71, 171)',
                          }}
                        >
                          {person.name}
                        </Link>
                      </th>
                      <th
                        style={
                          {
                            backgroundColor:
                              SortBy.sex === searchParams.get('sortBy')
                                ? 'lightblue'
                                : '',
                          }
                        }
                      >
                        {person.sex}
                      </th>

                      <th
                        style={
                          {
                            backgroundColor:
                              SortBy.born === searchParams.get('sortBy')
                                ? 'lightblue'
                                : '',
                          }
                        }
                      >
                        {person.born}
                      </th>

                      <th
                        style={
                          {
                            backgroundColor:
                              SortBy.died === searchParams.get('sortBy')
                                ? 'lightblue'
                                : '',
                          }
                        }
                      >
                        {person.died}
                      </th>

                      <th>
                        {fatherInList
                          ? (
                            <Link to={{
                              pathname: `${fatherInList.slug}`,
                              search: location.search,
                            }}
                            >
                              {person.fatherName}
                            </Link>
                          )
                          : <>{person.fatherName}</>}
                      </th>

                      <th>
                        {motherInList
                          ? (
                            <Link to={{
                              pathname: `${motherInList.slug}`,
                              search: location.search,
                            }}
                            >
                              {person.motherName}
                            </Link>
                          )
                          : <>{person.motherName}</>}
                      </th>
                    </tr>
                  );
                })}
              </tbody>

            )
            : <Loader />}
        </table>
      </div>
    </>
  );
};

import { useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types';
import { getPeople } from '../api';

enum PageState {
  loading = 'Loading',
  error = 'error',
  nothingFound = 'nothingFound',
  changeFilter = 'changeFilter',
  showTable = 'showTable',
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [filteredList, setFilteredList] = useState<Person[]>();
  const [pageState, setPageState] = useState<PageState>(PageState.loading);
  const [urlSlug, setUrlSlug] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [centuriesList, setCenturiesList] = useState<string[] | []>([]);

  const { slug } = useParams();

  const addMotherAndFather = (response: Person[]): Person[] => {
    const peopleList = response.map((person) => {
      const personMother = person.motherName
        ? response.find((p) => p.name === person.motherName)
        : null;

      const personFather = person.fatherName
        ? response.find((p) => p.name === person.fatherName)
        : null;

      return {
        ...person,
        ...{ father: personFather },
        ...{ mother: personMother },
      };
    });

    return peopleList;
  };

  const filter = (params: URLSearchParams) => {
    const sex = params.get('sex');
    const query = params.get('query');
    const centuries = params.getAll('centuries');

    setFilteredList(people);

    if (sex) {
      setFilteredList((current) => {
        return current?.filter((person) => person.sex === sex);
      });
    }

    if (query) {
      setFilteredList((current) => current?.filter((person) => {
        const searchQuery = query.toLocaleLowerCase();
        const name = person.name.toLocaleLowerCase();
        const motherName = String(person.motherName).toLocaleLowerCase();
        const fatherName = String(person.fatherName).toLocaleLowerCase();

        return (
          name.includes(searchQuery)
            || motherName.includes(searchQuery)
            || fatherName.includes(searchQuery)
        );
      }));
    }

    if (centuries.length) {
      setFilteredList((current) => current?.filter((person) => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(String(personCentury));
      }));
    }
  };

  const sort = (params: URLSearchParams) => {
    const sortBy = params.get('sort');
    const orderBy = params.get('order');
    const sortByText = sortBy === 'name' || sortBy === 'sex';
    const sortByInteger = sortBy === 'born' || sortBy === 'died';

    if (sortBy && orderBy === 'desc') {
      setFilteredList((current) => current?.sort((a: Person, b: Person) => {
        if (sortByText) {
          return a[sortBy].localeCompare(b[sortBy]);
        }

        if (sortByInteger) {
          return a[sortBy] - b[sortBy];
        }

        return 1;
      }));
    }

    if (sortBy && !orderBy) {
      setFilteredList((current) => current?.sort((a: Person, b: Person) => {
        if (sortByText) {
          return b[sortBy].localeCompare(a[sortBy]);
        }

        if (sortBy === 'born' || sortBy === 'died') {
          return b[sortBy] - a[sortBy];
        }

        return 1;
      }));
    }
  };

  const getAllCenturies = (peopleArray: Person[]) => {
    const centuries: string[] = [];

    peopleArray.map((person) => {
      return centuries.push(String(Math.ceil(person.born / 100)));
    });

    return [...new Set(centuries)];
  };

  useEffect(() => {
    getPeople()
      .then((response) => response)
      .then((result) => {
        const improvedList = addMotherAndFather(result);

        setPeople(improvedList);
        setFilteredList(improvedList);
        setCenturiesList(getAllCenturies(result));

        if (result.length) {
          setPageState(PageState.showTable);
        } else {
          setPageState(PageState.nothingFound);
        }
      })
      .catch(() => setPageState(PageState.error));
  }, []);

  useEffect(() => {
    filter(searchParams);
    sort(searchParams);
  }, [people, searchParams]);

  useEffect(() => {
    setUrlSlug(slug);
  }, [slug]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {pageState === PageState.showTable && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                urlSlug={urlSlug}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                centuriesList={centuriesList}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {(() => {
                switch (pageState) {
                  case PageState.loading:
                    return <Loader />;

                  case PageState.error:
                    return (
                      <p data-cy="peopleLoadingError">Something went wrong</p>
                    );

                  case PageState.nothingFound:
                    return (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    );

                  case PageState.changeFilter:
                    return (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    );

                  default:
                    return (
                      <PeopleTable
                        people={filteredList}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                      />
                    );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

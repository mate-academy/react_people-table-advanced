import { useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types';
import { getPeople } from '../api';

type PageState =
  | 'loading'
  | 'error'
  | 'nothingFound'
  | 'changeFilter'
  | 'showTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [filteredList, setFilteredList] = useState<Person[]>();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [urlSlug, setUrlSlug] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { slug } = useParams();

  // Here it'll take the response from API and add father and mother to
  // each person, if they exist...
  const addMotherAndFather = (response: Person[]): Person[] => {
    const peopleList = response.map((person) => {
      const findMother = person.motherName
        ? response.filter((p) => p.name === person.motherName)[0]
        : null;

      const findFather = person.fatherName
        ? response.filter((p) => p.name === person.fatherName)[0]
        : null;

      return {
        ...person,
        ...(findFather && { father: findFather }),
        ...(findMother && { mother: findMother }),
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

    if (sortBy && orderBy === 'desc') {
      setFilteredList((current) => current?.sort((a: Person, b: Person) => {
        if (sortByText) {
          return a[sortBy].localeCompare(b[sortBy]);
        }

        if (sortBy === 'born' || sortBy === 'died') {
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

  useEffect(() => {
    getPeople()
      .then((response) => response)
      .then((result) => {
        const improvedList = addMotherAndFather(result);

        setPeople(improvedList);
        setFilteredList(improvedList);

        if (result.length) {
          setPageState('showTable');
        } else {
          setPageState('nothingFound');
        }
      })
      .catch(() => setPageState('error'));
  }, []);

  useEffect(() => {
    filter(searchParams);
    sort(searchParams);
  }, [people]);

  useEffect(() => {
    setUrlSlug(slug);
  }, [slug]);

  useEffect(() => {
    filter(searchParams);
    sort(searchParams);
  }, [searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {pageState === 'showTable' && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                urlSlug={urlSlug}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {(() => {
                switch (pageState) {
                  case 'loading':
                    return <Loader />;

                  case 'error':
                    return (
                      <p data-cy="peopleLoadingError">Something went wrong</p>
                    );

                  case 'nothingFound':
                    return (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    );

                  case 'changeFilter':
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

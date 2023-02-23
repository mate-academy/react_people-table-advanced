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

  useEffect(() => {
    getPeople()
      .then((response) => response)
      .then((result) => {
        const improvedList = addMotherAndFather(result);

        setPeople(improvedList);
        setPageState('showTable');
      })
      .catch(() => setPageState('error'));
  }, []);

  useEffect(() => {
    setUrlSlug(slug);
  }, [slug]);

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
                        people={people}
                        searchParams={searchParams}
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

import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { peopleFilter } from '../helper/peopleFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [isPeopleLoadingError, setIsPeopleLoadingError] = useState(false);
  const [sexSelected, setSexSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenturies, setSelectedCenturies] = useState<string[]>([]);
  const { slug } = useParams();
  const [sorting, setSorting] = useState<{
    field: string | null;
    order: string | null;
  }>({ field: null, order: null });

  useEffect(() => {
    setIsLoadingPeople(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsPeopleLoadingError(true))
      .finally(() => setIsLoadingPeople(false));
  }, []);

  const peopleWithLinks = people.map(person => {
    function findMother(motherName: string | null) {
      return people.find(per => per.name === motherName);
    }

    function findFather(fatherName: string | null) {
      return people.find(per => per.name === fatherName);
    }

    return {
      ...person,
      mother: person.motherName ? findMother(person.motherName) : null,
      father: person.fatherName ? findFather(person.fatherName) : null,
    };
  });

  const filteredPeople = peopleFilter(
    peopleWithLinks,
    sexSelected,
    searchQuery,
    selectedCenturies,
    sorting,
  );

  return (
    <>
      {isLoadingPeople ? (
        <Loader />
      ) : (
        <>
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  setSexSelected={setSexSelected}
                  setSearchQuery={setSearchQuery}
                  searchQuery={searchQuery}
                  sexSelected={sexSelected}
                  setSelectedCenturies={setSelectedCenturies}
                  slug={slug}
                />
              </div>

              <div className="column">
                <div className="box table-container">
                  {isPeopleLoadingError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}
                  {people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {Boolean(!filteredPeople.length) && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {Boolean(filteredPeople.length) && (
                    <PeopleTable
                      peopleWithLinks={filteredPeople}
                      slug={slug}
                      sorting={sorting}
                      setSorting={setSorting}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

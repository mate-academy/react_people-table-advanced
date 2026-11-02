import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { PersonFilter } from '../utils/filterPersons/PersonFilter';
import { SerchParams } from '../types/SerchParams';
import { PeopleTable } from '../components/PeopleTable';
import { PersonSorter } from '../utils/PersonSorter';
import { SortOrder, SortParams } from '../types/SortParams';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const selectedPersonSlug = useParams().slug;
  const [searchParams] = useSearchParams();

  const renderPeople = useMemo(() => {
    const filters: ((person: Person) => boolean)[] = [];

    const searchName = searchParams.get(SerchParams.Query);

    if (searchName) {
      filters.push(PersonFilter.FilterByName(searchName));
    }

    const searchSex = searchParams.get(SerchParams.Sex);

    if (searchSex) {
      filters.push(PersonFilter.FilterBySex(searchSex));
    }

    const searchCenturies = searchParams
      .getAll(SerchParams.Centuries)
      .map(Number);

    if (searchCenturies.length > 0) {
      filters.push(PersonFilter.FilterByCenturies(...searchCenturies));
    }

    const filteredPeoples = PersonFilter.Filter(peoples, ...filters);

    const sortBy = searchParams.get('sort');

    if (!sortBy) {
      return filteredPeoples;
    }

    const orderBy = searchParams.get('order');

    if (!orderBy) {
      return filteredPeoples.sort(
        PersonSorter.SortBy(sortBy as SortParams, SortOrder.Asc),
      );
    }

    return filteredPeoples.sort(
      PersonSorter.SortBy(sortBy as SortParams, orderBy as SortOrder),
    );
  }, [peoples, searchParams]);

  useEffect(() => {
    getPeople()
      .then(data => {
        const normalazedData = data.map(person => ({
          ...person,
          father: data.find(p => p.name === person.fatherName) || undefined,
          mother: data.find(p => p.name === person.motherName) || undefined,
        }));

        setPeoples(normalazedData);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {peoples.length === 0 && !isLoading && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {renderPeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable
                      persons={renderPeople}
                      selectedPersonSlug={selectedPersonSlug}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { SortBy } from '../../types/SortBy';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isPeopleLoadError, setIsPeopleLoadError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { slug = null } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const sort = searchParams.get('sort') as SortBy || null;
  const order = searchParams.get('order');
  let visiblePeople: Person[] = [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    const getPeopleList = async () => {
      setisLoading(true);

      try {
        const loadPeopleList = await getPeople();

        setPeopleList(loadPeopleList);
      } catch {
        setIsPeopleLoadError(true);
      } finally {
        setisLoading(false);
      }
    };

    getPeopleList();
  }, []);

  if (peopleList) {
    visiblePeople = [...peopleList];

    if (location.search) {
      if (visiblePeople.length && sort) {
        switch (sort) {
          case SortBy.NAME:
          case SortBy.SEX:
            if (!order) {
              visiblePeople.sort((a, b) => a[sort].localeCompare(b[sort]));
            } else {
              visiblePeople.sort((a, b) => b[sort].localeCompare(a[sort]));
            }

            break;

          default:
            if (!order) {
              visiblePeople.sort((a, b) => a[sort] - b[sort]);
            } else {
              visiblePeople.sort((a, b) => b[sort] - a[sort]);
            }

            break;
        }
      }

      if (query) {
        const lowerQuery = query.toLowerCase().trim();

        visiblePeople = visiblePeople.filter(searchedPerson => (
          searchedPerson.name.toLowerCase().includes(lowerQuery)
          || searchedPerson.motherName?.toLowerCase().includes(lowerQuery)
          || searchedPerson.fatherName?.toLowerCase().includes(lowerQuery)
        ));
      }

      if (sex) {
        visiblePeople = visiblePeople.filter(person => person.sex === sex);
      }

      if (centuries.length) {
        visiblePeople = visiblePeople.filter(people => (
          centuries
            .includes(Math.ceil((people.born || people.died) / 100)
              .toString())
        ));
      }
    }
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="
          columns
          is-desktop
          is-flex-direction-row-reverse"
        >
          {!!peopleList.length && !isPeopleLoadError && (
            <div className="
              column
              is-7-tablet
              is-narrow-desktop"
            >
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading
                && !!peopleList.length
                && !!visiblePeople.length && (
                <PeopleTable
                  peopleList={visiblePeople}
                  selectedPerson={slug}
                />
              )}

              {!isLoading && !peopleList.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleLoadError && !isLoading && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {!isLoading
                && !visiblePeople.length
                && !!peopleList.length
                && !isPeopleLoadError && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

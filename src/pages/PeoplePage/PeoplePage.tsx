import { useEffect } from 'react';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';
import { usePeople } from '../../store/PeopleContext';
import { PeopleFilters } from '../../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { Person, PersonSlug } from '../../types';

export const PeoplePage = () => {
  const { people, peopleSlugs, fetchPeople, isLoading, hasError } = usePeople();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const hadSlugsLoaded = !hasError && !isLoading && !!peopleSlugs.length;

  let preparedSlugs: PersonSlug[] = [...peopleSlugs];

  // > Filtering

  const query = searchParams.get('query')?.toLocaleLowerCase();
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  if (query || !!centuries.length || sex) {
    preparedSlugs = preparedSlugs.filter(slug => {
      const person = people[slug];

      // > Query filter
      const satisfiesQuery =
        !query ||
        person.name.toLocaleLowerCase().includes(query) ||
        person.motherName?.toLocaleLowerCase().includes(query) ||
        person.fatherName?.toLocaleLowerCase().includes(query);

      if (!satisfiesQuery) {
        return false;
      }

      // > Sex filter
      const satisfiesSex = !sex || person.sex === sex;

      if (!satisfiesSex) {
        return false;
      }

      // > Century filter
      let satisfiesCenturies = !centuries.length;

      if (!satisfiesCenturies) {
        for (const century of centuries) {
          const beginningOfCentury = +century * 100 - 100;

          const relativeBirthYear = person.born - beginningOfCentury;

          if (relativeBirthYear >= 100) {
            continue;
          }

          if (relativeBirthYear >= 0) {
            satisfiesCenturies = true;
            break;
          }

          if (person.died - beginningOfCentury >= 0) {
            satisfiesCenturies = true;
            break;
          }
        }
      }

      if (!satisfiesCenturies) {
        return false;
      }

      return true;
    });
  }

  // > Sorting

  const sort = searchParams.get('sort') as keyof Person;
  const order = searchParams.get('order');

  if (sort) {
    const orderModifier = order === 'desc' ? -1 : 1;

    preparedSlugs.sort((slug1, slug2) => {
      const val1 = people[slug1][sort];
      const val2 = people[slug2][sort];

      if (typeof val1 === 'number' && typeof val2 === 'number') {
        return orderModifier * (val1 - val2);
      }

      if (typeof val1 === 'string' && typeof val2 === 'string') {
        return orderModifier * val1.localeCompare(val2);
      }

      return 0;
    });
  }

  // #region render

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!hasError && !isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {hasError && (
                // <p data-cy="peopleLoadingError" className="has-text-danger">
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!hasError && isLoading && <Loader />}

              {!hasError && !isLoading && !peopleSlugs.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hadSlugsLoaded && !preparedSlugs.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hadSlugsLoaded && !!preparedSlugs.length && (
                <PeopleTable people={people} peopleSlugs={preparedSlugs} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // #endregion
};

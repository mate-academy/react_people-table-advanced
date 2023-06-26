import { FC, useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getFullDetailsOfPerson } from '../../utils/helpers';
import { getPeople } from '../../api';
import { OrderByType, SortBy } from '../../types/OrderAndSortTypes';

export const PeoplePage: FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const visiblePeoples = peoples.filter(person => {
    const {
      name,
      sex: personSex,
      born,
      father,
      mother,
    } = person;

    const visibleBySearch = [name, father?.name, mother?.name]
      .some(n => n?.toLowerCase().trim().includes(query.toLowerCase()));

    const visibleBySex = sex === '' || personSex === sex;

    const century = Math.ceil(born / 100);
    const visibleByCenturies = centuries.length === 0
      || centuries.includes(century.toString());

    return visibleBySearch && visibleBySex && visibleByCenturies;
  });

  const sortedPeoples = (
    arr: Person[],
    sortBy: SortBy,
    orderBy: OrderByType,
  ) => {
    return arr.sort((a, b) => {
      switch (sortBy) {
        case SortBy.SEX:
        case SortBy.NAME:
          return orderBy === 'asc'
            ? a[sortBy].localeCompare(b[sortBy])
            : b[sortBy].localeCompare(a[sortBy]);

        case SortBy.BORN:
        case SortBy.DIED:
          return orderBy === 'asc'
            ? a[sortBy] - b[sortBy]
            : b[sortBy] - a[sortBy];

        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(person => {
        setPeoples(getFullDetailsOfPerson(person));
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isError]);

  const isPeopleTableVisible = !isLoading && !isError && peoples.length > 0;
  const isNoPeopleOnServer = !isLoading && !isError && !peoples.length;
  const isErrorOnServer = !isLoading && isError;
  const isNoMatching = !isLoading
    && !isError && !visiblePeoples.length && query;

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isPeopleTableVisible && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {isErrorOnServer && (
                      <p data-cy="peopleLoadingError">
                        Something went wrong
                      </p>
                    )}

                    {isNoPeopleOnServer && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {isPeopleTableVisible && (
                      <PeopleTable
                        peoples={sortedPeoples(
                          visiblePeoples,
                          sort as SortBy,
                          order as OrderByType,
                        )}
                        selectedPersonSlug={slug}
                      />
                    )}

                    {isNoMatching && (
                      <p>
                        There are no people matching the current search criteria
                      </p>
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

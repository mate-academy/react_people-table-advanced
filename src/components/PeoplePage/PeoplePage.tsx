import { FC, useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getFullDetailsOfPeople, sortedPeoples } from '../../utils/helpers';
import { getPeople } from '../../api';
import { OrderByType, SortBy } from '../../types/OrderAndSortTypes';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const preparedPeople = people.filter(person => {
    const {
      name,
      sex: personSex,
      born,
      father,
      mother,
    } = person;

    const preparedBySearch = [name, father?.name, mother?.name]
      .some(n => n?.toLowerCase().trim().includes(query.toLowerCase()));

    const preparedBySex = sex === '' || personSex === sex;

    const century = Math.ceil(born / 100);
    const preparedByCenturies = centuries.length === 0
      || centuries.includes(century.toString());

    return preparedBySearch && preparedBySex && preparedByCenturies;
  });

  const visiblePeople = sortedPeoples(
    preparedPeople,
    sort as SortBy,
    order as OrderByType,
  );

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(person => {
        setPeople(getFullDetailsOfPeople(person));
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isError]);

  const isPeopleTableVisible = !isLoading && !isError && people.length > 0;
  const isNoPeopleOnServer = !isLoading && !isError && !people.length;
  const isErrorOnServer = !isLoading && isError;
  const isNoMatching = !isLoading
    && !isError && !preparedPeople.length && query;

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
                        peoples={visiblePeople}
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

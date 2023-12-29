import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { ErrBlock } from '../../components/AppiBadrequest/ErrBlock';
import { Person } from '../../types';
import { getFilteredPeople, getPeopleWithParents } from '../../helpers';
import { NoQuery } from '../../components/Nosearchquery/noQuery';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const shouldShowNoPeople = people.length === 0 && !isError && !isLoading;
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  const peoplewithParents = getPeopleWithParents(people);
  const peopleToRender = getFilteredPeople(peoplewithParents, searchParams);
  const shouldShowPeopleTable = !isError && peopleToRender.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              <>
                {peopleToRender.length === 0 && <NoQuery />}
                {isError && <ErrBlock />}
                {shouldShowNoPeople
                    && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                {shouldShowPeopleTable
                  && <PeopleTable people={peopleToRender} />}
                {isLoading && <Loader />}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

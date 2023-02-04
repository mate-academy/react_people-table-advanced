import {
  FC, memo, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getVisiblePeople } from '../../utils/getVisiblePeople';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilter';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPersonByName } from './helpers';

export const PeoplePage: FC = memo(
  () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [searchParams] = useSearchParams();

    const query = searchParams.get('query');
    const sex = searchParams.get('sex');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const century = searchParams.getAll('century');

    useEffect(() => {
      setLoading(true);

      getPeople()
        .then((peopleFromServer) => {
          const peopleWithParents
            = peopleFromServer.map((person, _, array) => ({
              ...person,
              mother: getPersonByName(person.motherName, array),
              father: getPersonByName(person.fatherName, array),
            }));

          setPeople(peopleWithParents);
        })
        .catch(() => setError(true))
        .finally(() => {
          setError(false);
          setLoading(false);
        });
    }, []);

    const filteredPeople = useMemo(() => getVisiblePeople({
      people,
      query,
      sex,
      century,
      sort,
      order,
    }), [
      people,
      query,
      sex,
      sort,
      century,
      order,
    ]);

    const isLoadedPeopleEmpty = people.length === 0 && !isError && !isLoading;
    const shouldBeRendered = people.length !== 0 && !isError;

    return (
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {isLoading || <PeopleFilters />}
            </div>

            <div className="column">
              <div className="box table-container">

                {isLoading && <Loader />}

                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {isLoadedPeopleEmpty && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {shouldBeRendered && (
                  <PeopleTable
                    people={filteredPeople}
                    sort={sort}
                    order={order}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);

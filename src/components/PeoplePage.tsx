import { useContext, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleContext } from '../stores/PeopleContext';
import { SexEnum } from '../utils/SexEnum';

export const PeoplePage = () => {
  const {
    peoplE,
    loading,
    messageNotHasPeople,
    errorMessage,
    loadPeople,
  } = useContext(PeopleContext);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sorts = searchParams.getAll('sort') || [];
  const order = searchParams.get('order') || '';

  const filterPeople = useMemo(() => {
    const filteredBySex = peoplE.filter((person) => {
      switch (sex) {
        case SexEnum.ALL: return person.sex;
        case SexEnum.MALE: return person.sex === SexEnum.MALE;
        case SexEnum.FEMALE: return person.sex === SexEnum.FEMALE;
        default: return person.sex;
      }
    });

    const filteredByQuery = query
      ? filteredBySex.filter((person) => person.name
        .toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase()))
      : filteredBySex;

    const filteredByCenturies = centuries.length
      ? filteredByQuery.filter((person) => centuries
        .find((century) => Math.ceil(person.born / 100) === +century))
      : filteredByQuery;

    return filteredByCenturies;
  }, [peoplE, sex, query, centuries]);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {
            !loading && peoplE.length && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  centuries={centuries}
                  query={query}
                  sex={sex}
                />
              </div>
            )
          }

          <div className="column">
            <div className="box table-container">
              {
                loading && (
                  <Loader />
                )
              }

              {
                errorMessage && (
                  <p data-cy="peopleLoadingError">{errorMessage}</p>
                )
              }

              {
                messageNotHasPeople && (
                  <p data-cy="noPeopleMessage">
                    {messageNotHasPeople}
                  </p>
                )
              }

              {!filterPeople.length && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {
                !loading
                && !messageNotHasPeople
                && !errorMessage
                && !!filterPeople.length && (
                  <PeopleTable
                    people={filterPeople}
                    sorts={sorts}
                    order={order}
                    searchParams={searchParams}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

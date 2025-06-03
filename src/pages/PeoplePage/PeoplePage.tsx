import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { useContext, useEffect } from 'react';
import { PeopleContext } from '../../storage/PeopleContext';
import { NoPeople } from '../../components/NoPeople/NoPeople';
import { SomethingWrong } from '../../components/SomethingWrong/SomethingWrong';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../../types/Action';
import { SortType } from '../../types/State';
import { NoPeopleMatchingPage } from '../NoPeopleMatchingPage';

export const PeoplePage = () => {
  const context = useContext(PeopleContext);

  const [searchParams] = useSearchParams();

  if (!context) {
    throw new Error('context does not exist');
  }

  const { state, dispatch } = context;

  const isSorted = state.sortedAndFilteredPeople.length === 0;

  useEffect(() => {
    if (!state.isLoading && !state.isError) {
      dispatch({
        type: 'SET_FILTERS_AND_SORT',
        payload: {
          query: searchParams.get('query') ?? '',
          centuries: searchParams.getAll('centuries') || [],
          sort: searchParams.get('sort') as SortType,
          order: searchParams.get('order') || null,
          sex: searchParams.get('sex') as Sex,
        },
      });
    }
  }, [dispatch, searchParams, state.isError, state.isLoading]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {state.people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {state.isError && <SomethingWrong />}
              {!state.isError && state.isLoading && <Loader />}

              {!state.isLoading &&
                !state.isError &&
                state.people.length === 0 && <NoPeople />}
              {!state.isLoading &&
                !state.isError &&
                state.people.length > 0 &&
                state.sortedAndFilteredPeople.length > 0 && <PeopleTable />}
              {state.people.length > 0 && isSorted && <NoPeopleMatchingPage />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

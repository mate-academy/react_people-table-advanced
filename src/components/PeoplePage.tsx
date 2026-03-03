import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useMemo, useReducer } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { FILTER_KEYS } from '../constants/filters';

interface State {
  people: Person[];
  isLoading: boolean;
  error: string | null;
}

const initialState = {
  people: [],
  isLoading: true,
  error: null,
};

type Action =
  | { type: 'FETCH_PEOPLE_SUCCESS'; payload: Person[] }
  | { type: 'FETCH_PEOPLE_FAILURE'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_PEOPLE_SUCCESS':
      return {
        ...state,
        people: action.payload,
        isLoading: false,
        error: null,
      };
    case 'FETCH_PEOPLE_FAILURE':
      return {
        ...state,
        people: [],
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

interface FilterProps {
  person: Person;
  query: string;
  sex: string | null;
  centuries: string[];
}

const filterFunction = (props: FilterProps) => {
  const { person, query, sex, centuries } = props;
  const matchesSex = !sex || person.sex === sex;

  const matchesQuery =
    !query ||
    [person.name, person.fatherName, person.motherName].some(name =>
      (name?.toLowerCase() || '').includes(query),
    );

  const personCentury = Math.ceil(person.born / 100).toString();

  const matchesCentury =
    centuries.length === 0 || centuries.includes(personCentury);

  return matchesSex && matchesQuery && matchesCentury;
};

export const PeoplePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams] = useSearchParams();

  const query = searchParams.get(FILTER_KEYS.query)?.toLowerCase() || '';
  const sex = searchParams.get(FILTER_KEYS.sex);
  const centuries = searchParams.getAll(FILTER_KEYS.centuries);
  const sort = searchParams.get(FILTER_KEYS.sort);
  const order = searchParams.get(FILTER_KEYS.order);

  const filteredPeople = useMemo(() => {
    const result = state.people.filter(person =>
      filterFunction({ person, query, sex, centuries }),
    );

    if (sort) {
      result.sort((a, b) => {
        const valA = a[sort as keyof Person];
        const valB = b[sort as keyof Person];

        if (valA === valB) {
          return 0;
        }

        const comparison = valA! > valB! ? 1 : -1;

        return order === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [state.people, query, sex, centuries, sort, order]);

  useEffect(() => {
    getPeople()
      .then(people => {
        dispatch({ type: 'FETCH_PEOPLE_SUCCESS', payload: people });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_PEOPLE_FAILURE', payload: error.message });
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!state.isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {state.isLoading && <Loader />}

              {state.error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!state.isLoading && !state.error && (
                <>
                  {state.people.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : filteredPeople.length === 0 ? (
                    <p data-cy="noPeopleFilteredMessage">
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable people={filteredPeople} />
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

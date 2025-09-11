import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleContext } from '../store/PeopleContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { GenderOption } from '../types/GenderOption';
import { CenturyOption } from '../types/CenturyOption';
import { useSearchParams } from 'react-router-dom';
import { SortField, SortOrder } from '../types/SortArrows';

export const PeoplePage = () => {
  const { people, isLoading, error, loadPeople } = useContext(PeopleContext);
  const [visiblePeople, setVisiblePeople] = useState(people);
  const [searchParams, setSearchParams] = useSearchParams();

  const [genderFilterOption, setGenderFilterOption] = useState<GenderOption>(
    GenderOption.All,
  );

  const [centuriesOptions, setCenturiesOptions] = useState<CenturyOption[]>(
    () => searchParams.getAll('centuries').map(c => Number(c) as CenturyOption),
  );

  const [query, setQuery] = useState(() => searchParams.get('query') || '');

  const [arrowField, setArrowField] = useState<SortField | null>(null);
  const [arrowOrder, setArrowOrder] = useState<SortOrder | null>(null);

  const toggleCentury = (c: CenturyOption) => {
    if (c === CenturyOption.All) {
      setCenturiesOptions([]);
    } else {
      setCenturiesOptions(prev =>
        prev.includes(c) ? prev.filter(century => century !== c) : [...prev, c],
      );
    }
  };

  const filterPeople = useCallback(
    (
      chosenGender: GenderOption,
      chosenCenturies: CenturyOption[],
      sortField: SortField | null,
      sortOrder: SortOrder | null,
      queryInput: string,
    ) => {
      let filteringPeople = [...people];
      const params = new URLSearchParams();

      if (queryInput) {
        params.set('query', queryInput);

        filteringPeople = filteringPeople.filter(person => {
          return (
            person.name
              .toLocaleLowerCase()
              .includes(queryInput.toLocaleLowerCase()) ||
            person.motherName
              ?.toLocaleLowerCase()
              .includes(queryInput.toLocaleLowerCase()) ||
            person.fatherName
              ?.toLocaleLowerCase()
              .includes(queryInput.toLocaleLowerCase())
          );
        });
      } else {
        params.delete('query');
      }

      switch (chosenGender) {
        case GenderOption.Male:
          filteringPeople = filteringPeople.filter(
            person => person.sex === 'm',
          );
          params.set('sex', 'm');
          break;
        case GenderOption.Female:
          filteringPeople = filteringPeople.filter(
            person => person.sex === 'f',
          );
          params.set('sex', 'f');
          break;
        default:
          params.delete('sex');
          break;
      }

      if (chosenCenturies.length > 0) {
        chosenCenturies.forEach(century =>
          params.append('centuries', String(century)),
        );
        filteringPeople = filteringPeople.filter(person =>
          chosenCenturies.includes(Math.ceil(person.born / 100)),
        );
      }

      if (sortField) {
        filteringPeople.sort((person1, person2) => {
          let a: string | number | undefined;
          let b: string | number | undefined;

          switch (sortField) {
            case SortField.Name:
              params.set('sort', SortField.Name);
              a = person1.name;
              b = person2.name;
              break;
            case SortField.Sex:
              params.set('sort', SortField.Sex);
              a = person1.sex;
              b = person2.sex;
              break;
            case SortField.Born:
              params.set('sort', SortField.Born);
              a = person1.born;
              b = person2.born;
              break;
            case SortField.Died:
              params.set('sort', SortField.Died);
              a = person1.died;
              b = person2.died;
              break;
            default:
              return 0;
          }

          if (a === undefined) {
            return 1;
          }

          if (b === undefined) {
            return -1;
          }

          if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
          }

          return (a as number) - (b as number);
        });

        if (sortOrder === SortOrder.Desc) {
          filteringPeople.reverse();
          params.set('order', 'desc');
        }
      }

      setSearchParams(params);
      setVisiblePeople(filteringPeople);
    },
    [people, setSearchParams],
  );

  const handleSort = (field: SortField) => {
    if (arrowField === field) {
      if (arrowOrder === SortOrder.Asc) {
        setArrowOrder(SortOrder.Desc);
      } else if (arrowOrder === SortOrder.Desc) {
        setArrowOrder(null);
        setArrowField(null);
      }
    } else {
      setArrowField(field);
      setArrowOrder(SortOrder.Asc);
    }
  };

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  useEffect(() => {
    filterPeople(
      genderFilterOption,
      centuriesOptions,
      arrowField,
      arrowOrder,
      query,
    );
  }, [
    filterPeople,
    centuriesOptions,
    genderFilterOption,
    arrowField,
    arrowOrder,
    query,
  ]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              genderFilterOption={genderFilterOption}
              setGenderFilterOption={(value: GenderOption) => {
                setGenderFilterOption(value);
              }}
              centuriesOptions={centuriesOptions}
              toggleCentury={toggleCentury}
              query={query}
              setQuery={(value: string) => {
                setQuery(value);
              }}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length === 0 && people.length > 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  arrowField={arrowField}
                  arrowOrder={arrowOrder}
                  handleSort={handleSort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

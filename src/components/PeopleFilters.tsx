import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  setPeoples: (arr: Person[]) => void;
  peoples: Person[];
  searchParams: URLSearchParams;
  setSearchWith: (params: any) => void;
};

enum SortSex {
  all = 'all',
  male = 'male',
  female = 'female',
}

const arrNumbers = [16, 17, 18, 19, 20];

export const PeopleFilters: React.FC<Props> = ({
  setPeoples,
  peoples,
  searchParams,
  setSearchWith,
}) => {
  const [filterGender, setFilterGender] = useState<SortSex>(SortSex.all);
  const [selectedCenturies, setSelectedCenturies] = useState<number[]>([]);
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function filterSex(gender: SortSex) {
    setFilterGender(gender);
    setSearchWith({
      sex: gender === SortSex.all ? null : gender === SortSex.male ? 'm' : 'f',
    });
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function toggleCentury(century: number) {
    setSelectedCenturies(prev => {
      const isSelected = prev.includes(century);
      const newSelectedCenturies = isSelected
        ? prev.filter(c => c !== century)
        : [...prev, century];

      return newSelectedCenturies;
    });
  }

  const filteredPeoples = useMemo(() => {
    let filtered = peoples;

    if (filterGender !== SortSex.all) {
      filtered = filtered.filter(
        person => person.sex === (filterGender === SortSex.male ? 'm' : 'f'),
      );
    }

    if (query) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(query),
      );
    }

    if (selectedCenturies.length > 0) {
      filtered = filtered.filter(person => {
        return selectedCenturies.some(
          century =>
            person.born >= (century - 1) * 100 + 1 &&
            person.born < century * 100,
        );
      });
    }

    setPeoples(filtered);

    return filtered;
  }, [query, selectedCenturies, filterGender, peoples]);

  useEffect(() => {
    setPeoples(filteredPeoples);
  }, [filteredPeoples, setPeoples]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({
            'is-active': filterGender === SortSex.all,
          })}
          onClick={() => filterSex(SortSex.all)}
        >
          All
        </a>
        <a
          className={cn({
            'is-active': filterGender === SortSex.male,
          })}
          onClick={() => filterSex(SortSex.male)}
        >
          Male
        </a>
        <a
          className={cn({
            'is-active': filterGender === SortSex.female,
          })}
          onClick={() => filterSex(SortSex.female)}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {arrNumbers.map(numero => (
              <Link
                data-cy="century"
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(numero.toString())
                      ? centuries.filter(ch => numero.toString() !== ch)
                      : [...centuries, numero.toString()],
                  }),
                }}
                key={numero}
                className={cn('button mr-1', {
                  'is-info': selectedCenturies.includes(numero),
                })}
                onClick={() => toggleCentury(numero)}
              >
                {numero}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              to={{
                search: getSearchWith(searchParams, {
                  centuries: null,
                }),
              }}
              className={cn('button', {
                'is-success': centuries.length === 0,
                'is-outlined': centuries.length > 0,
              })}
              onClick={() => {
                setSelectedCenturies([]);
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams, {
              centuries: null,
              sex: null,
              query: null,
            }),
          }}
          onClick={() => {
            setSelectedCenturies([]);
            setFilterGender(SortSex.all);
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

import { useContext, useEffect } from 'react';
import { SearchLink } from './SearchLink';
import { PeopleContext } from '../contsxts/PeopleContext';
import { Person } from '../types';
import cn from 'classnames';
import { PeopleFilteredContext } from '../contsxts/PeopleFilteredContext';
import { useSearchParams } from 'react-router-dom';

enum Sex {
  'All' = 'All',
  'Male' = 'Male',
  'Female' = 'Female',
}

enum Centuries {
  C16 = 16,
  C17 = 17,
  C18 = 18,
  C19 = 19,
  C20 = 20,
}

export const PeopleFilters = () => {
  const { peoples } = useContext(PeopleContext);
  const { setPeoplesFiltered } = useContext(PeopleFilteredContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSex = (searchParams.get('selectedSex') as Sex) || Sex.All;
  const inputValue = searchParams.get('inputValue') || '';
  const listCenturies = searchParams
    .getAll('listCenturies')
    .map(Number)
    .filter((c): c is Centuries => Object.values(Centuries).includes(c));

  const calculateCentury = (year: number): number => {
    return Math.floor((year - 1) / 100) + 1;
  };

  const filterPeople = () => {
    let filteredList = peoples;

    if (selectedSex === Sex.Male) {
      filteredList = filteredList.filter(
        (person: Person) => person.sex === 'm',
      );
    } else if (selectedSex === Sex.Female) {
      filteredList = filteredList.filter(
        (person: Person) => person.sex === 'f',
      );
    }

    const query = inputValue.trim().toLowerCase();

    if (query) {
      filteredList = filteredList.filter(
        (person: Person) =>
          person.name.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query),
      );
    }

    if (listCenturies.length > 0) {
      filteredList = filteredList.filter((person: Person) => {
        const birthCentury = calculateCentury(person.born);

        return listCenturies.includes(birthCentury as Centuries);
      });
    }

    setPeoplesFiltered(filteredList);
  };

  useEffect(() => {
    filterPeople();
  }, [selectedSex, inputValue, peoples, listCenturies]);

  const handleSexClick = (sex: Sex) => {
    const params = new URLSearchParams(searchParams);

    if (sex === Sex.All) {
      params.delete('selectedSex');
    } else {
      params.set('selectedSex', sex);
    }

    setSearchParams(params);
  };

  const handleInputChanges = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    const value = ev.target.value;

    if (value) {
      params.set('inputValue', value);
    } else {
      params.delete('inputValue');
    }

    setSearchParams(params);
  };

  const resetFilter = () => {
    setSearchParams({});
  };

  const handleCentury = (century: Centuries) => {
    const params = new URLSearchParams(searchParams);

    const updatedCenturies = listCenturies.includes(century)
      ? listCenturies.filter(c => c !== century)
      : [...listCenturies, century];

    params.delete('listCenturies');
    updatedCenturies.forEach(c => params.append('listCenturies', c.toString()));

    setSearchParams(params);
  };

  const clearCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('listCenturies');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(Sex).map(sex => (
          <SearchLink
            key={sex}
            params={{ selectedSex: sex === Sex.All ? null : sex }}
            className={selectedSex === sex ? 'is-active' : ''}
            onClick={() => handleSexClick(sex)}
          >
            {sex}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={inputValue}
            onChange={handleInputChanges}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(Centuries)
              .filter((c): c is Centuries => typeof c === 'number')
              .map(c => (
                <button
                  key={c}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': listCenturies.includes(c),
                  })}
                  onClick={() => handleCentury(c)}
                >
                  {c}
                </button>
              ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={clearCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilter}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};

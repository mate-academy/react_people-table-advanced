/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as peopleFromApi from '../api';
import { Person } from '../types/Person';
import classNames from 'classnames';

interface PeopleInterface {
  setPeopleApi: React.Dispatch<React.SetStateAction<Person[]>>;
}

export const PeopleFilters: React.FC<PeopleInterface> = ({ setPeopleApi }) => {
  const [originalPeople, setOriginalPeople] = useState<Person[]>([]);
  const [selectedCenturies, setSelectedCenturies] = useState<string[]>([]);
  const [letterFromInput, setLetterFromInput] = useState(() => {
    return localStorage.getItem('searchQuery') || '';
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    peopleFromApi.getPeople().then(item => {
      setPeopleApi(item);
      setOriginalPeople(item);
    });
  }, []);

  function getCentury(year: number): number {
    return Math.ceil(year / 100);
  }

  function updateSearchParams(centuries: string[]) {
    const newParams = new URLSearchParams(searchParams);

    if (centuries.length === 0) {
      newParams.delete('centuries');
    } else {
      newParams.set('centuries', centuries.join(','));
    }

    setSearchParams(newParams);
  }

  function filterByCenturies(centuries: string[]) {
    if (centuries.length === 0) {
      setPeopleApi(originalPeople);

      return;
    }

    const filteredPeople = originalPeople.filter(person =>
      centuries.includes(getCentury(person.born).toString()),
    );

    setPeopleApi(filteredPeople);
  }

  function handleCenturyToggle(century: string) {
    setSelectedCenturies(prevCenturies => {
      const isSelected = prevCenturies.includes(century);
      const newCenturies = isSelected
        ? prevCenturies.filter(c => c !== century) // Видаляємо, якщо вже вибране
        : [...prevCenturies, century]; // Додаємо, якщо не вибране

      updateSearchParams(newCenturies);
      filterByCenturies(newCenturies);

      return newCenturies;
    });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <button
                key={century}
                data-cy="century"
                className={`button  ${
                  selectedCenturies.includes(century) ? 'mr-1 is-info' : ''
                }`}
                onClick={() => handleCenturyToggle(century)}
              >
                {century}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

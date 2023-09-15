/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[]
  handlePeople: (people: Person[]) => void;
  handleParams: (data: string) => void;
};

enum SexFiltr {
  male = 'm',
  female = 'f',
  all = 'all',
}

export const PeopleFilters = ({
  people,
  handlePeople,
  handleParams,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams(
    (window.location.hash).substring(window.location.hash.indexOf('?')),
  );
  const [activeSexFiltr, setActiveSexFiltr]
  = useState<SexFiltr>(SexFiltr.all);
  const [query, setQuery] = useState<string>(searchParams.get('query') ?? '');
  const [centuries, setCenturies] = useState<number[]>(
    searchParams.getAll('centuries').map(century => +century),
  );

  useEffect(() => {
    if (searchParams.get('sex') === SexFiltr.male) {
      setActiveSexFiltr(SexFiltr.male);
    } else if (searchParams.get('sex') === SexFiltr.female) {
      setActiveSexFiltr(SexFiltr.female);
    }

    if (window.location.hash.includes('?')) {
      handleParams(
        (window.location.hash).substring(window.location.hash.indexOf('?')),
      );
    } else {
      handleParams('');
    }
  });

  useEffect(() => {
    const sexFilteredPeople = people.filter(person => {
      if (activeSexFiltr === SexFiltr.all) {
        return person;
      }

      return person.sex === activeSexFiltr;
    });

    const century = centuries.length === 0
      ? [16, 17, 18, 19, 20] : [...centuries];

    const centuryFilteres = sexFilteredPeople.filter(person => {
      return century.includes(Math.ceil(person.born / 100));
    });

    handlePeople(centuryFilteres.filter(person => {
      let isFather = false;
      let isMother = false;

      if (person.fatherName) {
        isFather = person.fatherName.toLocaleLowerCase().includes(query);
      }

      if (person.motherName) {
        isMother = person.motherName.toLocaleLowerCase().includes(query);
      }

      return person.name.toLocaleLowerCase().includes(query)
      || isFather || isMother;
    }));
  }, [query, activeSexFiltr, centuries]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={activeSexFiltr === SexFiltr.all ? 'is-active' : ''}
          params={{ sex: null }}
          onClick={() => {
            setActiveSexFiltr(SexFiltr.all);
            searchParams.delete('sex');
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={activeSexFiltr === SexFiltr.male ? 'is-active' : ''}
          params={{ sex: 'm' }}
          onClick={() => setActiveSexFiltr(SexFiltr.male)}
        >
          Male
        </SearchLink>
        <SearchLink
          className={activeSexFiltr === SexFiltr.female ? 'is-active' : ''}
          params={{ sex: 'f' }}
          onClick={() => setActiveSexFiltr(SexFiltr.female)}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => {
              setQuery(e.target.value.toLowerCase());
              setSearchParams(
                { ...searchParams, query: e.target.value.toLowerCase() },
              );
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={`button mr-1${centuries.includes(century) ? ' is-info' : ''}`}
                onClick={() => {
                  centuries.includes(century)
                    ? setCenturies(centuries.filter(item => item !== century))
                    : setCenturies([...centuries, century]);
                }}
                params={
                  {
                    centuries: centuries.includes(century)
                      ? centuries
                        .filter(paramsCentury => paramsCentury !== century)
                        .map(century => String(century))
                      : [...centuries
                        .map(century => String(century)), String(century)],

                  }
                }
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
              onClick={() => setCenturies([])}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, sex: null }}
          onClick={() => {
            setActiveSexFiltr(SexFiltr.all);
            setQuery('');
            setCenturies([]);
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

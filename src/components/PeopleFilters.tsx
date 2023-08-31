/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';

type Props = {
  people: Person[]
  handlePeople: (people: Person[]) => void;
};

enum SexFiltr {
  male = 'm',
  female = 'f',
  all = 'all',
}

export const PeopleFilters = ({ people, handlePeople }: Props) => {
  const [activeSexFiltr, setActiveSexFiltr]
  = useState<SexFiltr>(SexFiltr.all);
  const [query, setQuery] = useState<string>('');
  const [centuries, setCenturies] = useState<number[]>([]);

  useEffect(() => {
    const sexFilteredPeople = people.filter(person => {
      if (activeSexFiltr === SexFiltr.all) {
        return person;
      }

      return person.sex === activeSexFiltr;
    });

    const test = centuries.length === 0 ? [16, 17, 18, 19, 20] : [...centuries];

    const centuryFilteres = sexFilteredPeople.filter(person => {
      return test.includes(Math.ceil(person.born / 100));
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
        <Link
          className={activeSexFiltr === SexFiltr.all ? 'is-active' : ''}
          to="#/people"
          onClick={() => {
            setActiveSexFiltr(SexFiltr.all);
          }}
        >
          All
        </Link>
        <Link
          className={activeSexFiltr === SexFiltr.male ? 'is-active' : ''}
          to="#/people?sex=m"
          onClick={() => setActiveSexFiltr(SexFiltr.male)}
        >
          Male
        </Link>
        <Link
          className={activeSexFiltr === SexFiltr.female ? 'is-active' : ''}
          to="#/people?sex=f"
          onClick={() => setActiveSexFiltr(SexFiltr.female)}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value.toLowerCase())}
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
              <Link
                key={century}
                data-cy="century"
                className={`button mr-1${centuries.includes(century) ? ' is-info' : ''}`}
                to={`#/people?centuries=${century}`}
                onClick={() => {
                  centuries.includes(century)
                    ? setCenturies(centuries.filter(item => item !== century))
                    : setCenturies([...centuries, century]);
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#/people"
              onClick={() => setCenturies([])}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={() => {
            setActiveSexFiltr(SexFiltr.all);
            setQuery('');
            setCenturies([]);
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

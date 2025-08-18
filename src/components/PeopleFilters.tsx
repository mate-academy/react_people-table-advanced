import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { useEffect, useMemo } from 'react';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

export const PeopleFilters: React.FC<Props> = ({ people, setPeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries'),
    [searchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const inQuery =
        !query ||
        [person.name, person.motherName, person.fatherName].some(field =>
          field?.toLowerCase().includes(query.toLowerCase()),
        );

      const inSex = sex ? person.sex === sex : true;
      const bornCentury = Math.ceil(person.born / 100).toString();

      const inCentury = centuries.length
        ? centuries.includes(bornCentury)
        : true;

      return inQuery && inSex && inCentury;
    });
  }, [people, query, sex, centuries]);

  useEffect(() => {
    setPeople(filteredPeople);
  }, [filteredPeople, setPeople]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': sex === '' })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {[16, 17, 18, 19, 20].map(c => {
              const isActive = centuries.includes(c.toString());
              const newCenturies = isActive
                ? centuries.filter(century => century !== c.toString())
                : [...centuries, c.toString()];

              return (
                <SearchLink
                  key={c}
                  data-cy="century"
                  className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                  params={{
                    centuries: newCenturies.length ? newCenturies : null,
                  }}
                >
                  {c}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

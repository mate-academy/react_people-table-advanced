import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const numbers: number[] = [16, 17, 18, 19, 20];

interface Props {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  agePeople: string[];
}

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  agePeople,
}) => {
  const [forAllButton, setForAllButton] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const sex = searchParams.get('sex') || '';

  return (
    <form className="panel">
      <p className="panel-heading">Filters</p>

      <div className="panel-tabs" data-cy="SexFilter">
        <NavLink className={sex === '' ? 'is-active' : ''} to="">
          All
        </NavLink>
        <NavLink className={sex === 'm' ? 'is-active' : ''} to="?sex=m">
          Male
        </NavLink>
        <NavLink className={sex === 'f' ? 'is-active' : ''} to="?sex=f">
          Female
        </NavLink>
      </div>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={inputValue}
            type="search"
            className="input"
            placeholder="Search"
            name="search"
            onChange={e => {
              e.preventDefault();
              const newParams = new URLSearchParams(searchParams);

              setInputValue(e.target.value);
              newParams.set('search', inputValue);
              setSearchParams(newParams);
            }}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
              onClick={e => {
                e.preventDefault();
                const newParams = new URLSearchParams(searchParams);

                newParams.delete('search');
                setSearchParams(newParams);
              }}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {numbers.map((n, key) => (
              <NavLink
                key={key}
                data-cy="century"
                className={`button mr-1${agePeople.includes(n.toString()) ? ' is-info' : ''}`}
                to={`#/people?centuries=${n}`}
                onClick={e => {
                  e.preventDefault();
                  const newParams = new URLSearchParams(searchParams);

                  const currentAges = newParams.getAll('centuries');

                  if (currentAges.includes(n.toString())) {
                    newParams.delete('centuries', String(n));
                    setForAllButton(false);
                  } else {
                    newParams.append('centuries', String(n));
                    setForAllButton(true);
                  }

                  setSearchParams(newParams);
                }}
              >
                {n}
              </NavLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className={`button ${forAllButton ? 'is-outlined' : ''} is-success`}
              to="?centuries=16+17+18+19+20"
              onClick={e => {
                e.preventDefault();
                const newParams = new URLSearchParams(searchParams);

                newParams.delete('centuries');

                setSearchParams(newParams);
                setForAllButton(false);
              }}
            >
              All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={() => {
            setSearchParams(new URLSearchParams());
            setForAllButton(false);
            setInputValue('');
          }}
        >
          Reset all filters
        </a>
      </div>
    </form>
  );
};

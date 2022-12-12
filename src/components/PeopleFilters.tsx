import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Errors } from '../types/Errors';
import { SearchLink } from './SearchLink';

type Props = {
  setIsError: (error: Errors) => void;
};

const centuriesButtons = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({ setIsError }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Errors.SAERCH) {
      setIsError(Errors.NONE);
    }

    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">

        <SearchLink
          className={classNames({
            'is-active': sex === null,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sex === 'f',
          })}
          params={{ sex: 'f' }}
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
            onChange={handleChange}

          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {
              centuriesButtons.map(century => (
                <SearchLink
                  data-cy="century"
                  key={century}
                  params={{
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }}
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': centuries.includes(century) },
                  )}
                >
                  {century}
                </SearchLink>
              ))
            }
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          data-cy="centuryALL"
          params={{
            centuries: [],
            sex: null,
            query: null,
          }}
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setIsError(Errors.NONE)}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  query: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearCenturies: () => void;
  centuries: string[],
  sex: string;
};

export const PeopleFilters:React.FC<Props> = ({
  query,
  handleQueryChange,
  clearCenturies,
  centuries,
  sex,
}) => {
  const arrayCenturies = ['16', '17', '18', '19', '20'];

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
          className={classNames({
            'is-active':
            sex === 'f',
          })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            onChange={(event) => handleQueryChange(event)}
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {arrayCenturies.map(cent => (
              <>
                <SearchLink
                  key={cent}
                  params={{
                    centuries: centuries.includes(cent)
                      ? (centuries.filter(cen => cen !== cent)) : (
                        [...centuries, cent]
                      ),
                  }}
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': centuries.includes(cent) },
                  )}
                >
                  {cent}
                </SearchLink>
              </>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              className={classNames(
                'button', 'is-success', {
                  'is-outlined': centuries.length > 0,
                },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="."
          onClick={() => clearCenturies()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

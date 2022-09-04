import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  updateSearch: (params: { [key: string]: string[] | string | null }) => void,
}

export const PeopleFilters: FC<Props> = (props) => {
  const { updateSearch } = props;
  const [searchParams] = useSearchParams();
  const [queryInput, setQueryInput] = useState('');
  // const query = searchParams.get('query') || null;
  const sexFilter = searchParams.get('sexFilter') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const allCenturies: string[] = ['16', '17', '18', '19', '20'];

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <a
            href="/"
            className={cn({ 'is-active': sexFilter === null })}
            onClick={(event) => {
              event.preventDefault();
              updateSearch({ sexFilter: null });
            }}
          >
            All
          </a>
          <a
            href="/"
            className={cn({ 'is-active': sexFilter === 'm' })}
            onClick={(event) => {
              event.preventDefault();
              updateSearch({ sexFilter: 'm' });
            }}
          >
            Male
          </a>
          <a
            href="/"
            className={cn({ 'is-active': sexFilter === 'f' })}
            onClick={(event) => {
              event.preventDefault();
              updateSearch({ sexFilter: 'f' });
            }}
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
              value={queryInput}
              onChange={(event) => {
                updateSearch({ query: event.target.value });
                setQueryInput(event.target.value);
              }}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {allCenturies.map(century => (
                <button
                  key={century}
                  data-cy="century"
                  type="button"
                  className={cn(
                    'button',
                    'mr-1',
                    { 'is-info': centuries.includes(`${century}`) },
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    updateSearch({
                      centuries: centuries.includes(century)
                        ? centuries.filter(cent => cent !== century)
                        : [...centuries, century],
                    });
                  }}
                >
                  {century}
                </button>
              ))}

            </div>

            <div className="level-right ml-4">
              <button
                data-cy="centuryALL"
                className="button is-success is-outlined"
                type="button"
                onClick={() => updateSearch({
                  centuries: allCenturies,
                })}
              >
                All
              </button>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <button
            className="button is-link is-outlined is-fullwidth"
            type="button"
            onClick={() => {
              setQueryInput('');
              updateSearch({
                sexFilter: null,
                query: null,
                centuries: [],
              });
            }}
          >
            Reset all filters
          </button>
        </div>
      </nav>
    </>
  );
};

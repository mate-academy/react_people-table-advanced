import { Link } from 'react-router-dom';
import { ChangeEvent, FC } from 'react';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';

interface Props {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

export const PeopleFilters: FC<Props> = ({ searchParams, setSearchParams }) => {
  function handleChangeQuery(event: ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      new URLSearchParams(
        getSearchWith(searchParams, { query: event.target.value || null }),
      ),
    );
  }

  function handleChangeCenturies(century: string) {
    let centuries = Array.from(new Set(searchParams.getAll('century')));

    if (centuries.includes(century)) {
      centuries = centuries.filter(currCentury => currCentury !== century);
    } else {
      centuries.push(century);
    }

    return centuries;
  }

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('century');
  // const query = searchParams.get('query');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!sex ? 'is-active' : ''}
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
            }),
          }}
        >
          All
        </Link>
        <Link
          className={sex === 'm' ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={sex === 'f' ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
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
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries?.includes('16'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  century: handleChangeCenturies('16'),
                }),
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries?.includes('17'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  century: handleChangeCenturies('17'),
                }),
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries?.includes('18'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  century: handleChangeCenturies('18'),
                }),
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries?.includes('19'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  century: handleChangeCenturies('19'),
                }),
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries?.includes('20'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  century: handleChangeCenturies('20'),
                }),
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              // className="button is-success is-outlined"
              to={{
                search: getSearchWith(searchParams, {
                  century: null,
                }),
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
              sex: null,
              century: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

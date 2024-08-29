import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useEffect } from 'react';

type Props = {
  setSexSelected: (sex: string | null) => void;
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  sexSelected: string | null;
  setSelectedCenturies: (centuries: string[]) => void;
  slug: string | undefined;
};

export const PeopleFilters: React.FC<Props> = ({
  setSexSelected,
  setSearchQuery,
  searchQuery,
  sexSelected,
  setSelectedCenturies,
  slug,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isAllButtonActive = !searchParams.has('centuries');

  function getSortParams() {
    const params = new URLSearchParams(searchParams);
    const sortParams = new URLSearchParams();

    ['sort', 'order'].forEach(param => {
      const value = params.get(param);

      if (value !== null) {
        sortParams.set(param, value);
      }
    });

    return sortParams.toString();
  }

  const sortParams = getSortParams();
  const hasSortParams = Boolean(sortParams.length);

  useEffect(() => {
    if (searchParams.get('sex')) {
      setSexSelected(searchParams.get('sex'));
    } else {
      setSexSelected(null);
    }
  }, [sexSelected, setSexSelected, searchParams]);

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    setSearchQuery(newQuery);

    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  const handleClickAllButton = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  function saveCurrentLink() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    return {
      search: params.toString(),
    };
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    setSelectedCenturies(params.getAll('centuries'));
  }, [searchParams, setSelectedCenturies]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': searchParams.get('sex') === null,
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
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
            className="input"
            placeholder="Search"
            value={searchQuery}
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
            <SearchLink
              params={{ centuries: ['16'] }}
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('16'),
              })}
              data-cy="century"
            >
              16
            </SearchLink>
            <SearchLink
              params={{ centuries: ['17'] }}
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('17'),
              })}
              data-cy="century"
            >
              17
            </SearchLink>
            <SearchLink
              params={{ centuries: ['18'] }}
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('18'),
              })}
              data-cy="century"
            >
              18
            </SearchLink>
            <SearchLink
              params={{ centuries: ['19'] }}
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('19'),
              })}
              data-cy="century"
            >
              19
            </SearchLink>
            <SearchLink
              params={{ centuries: ['20'] }}
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('20'),
              })}
              data-cy="century"
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !isAllButtonActive,
              })}
              to={saveCurrentLink()}
              onClick={handleClickAllButton}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={
            slug
              ? `/people/${slug}${hasSortParams ? `?${sortParams}` : ''}`
              : `/people${hasSortParams ? `?${sortParams}` : ''}`
          }
          onClick={() => setSearchQuery('')}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

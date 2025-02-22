import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addClassForCenturyLink = (century: string) => {
    return classNames('button', 'mr-1', {
      'is-info': searchParams.getAll('centuries').includes(century),
    });
  };

  const addNewCenturiesParams = (century: string): SearchParams => {
    const newCunturiesParams = searchParams.getAll('centuries');

    return newCunturiesParams.includes(century)
      ? { centuries: newCunturiesParams.filter(param => param !== century) }
      : { centuries: [...newCunturiesParams, century] };
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (!event.target.value) {
      searchParams.delete('query');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('query', event.target.value);
    setSearchParams(searchParams);
  };

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
            value={searchParams.get('query') || ''}
            onChange={handleInputChange}
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
              params={addNewCenturiesParams('16')}
              data-cy="century"
              className={addClassForCenturyLink('16')}
            >
              16
            </SearchLink>

            <SearchLink
              params={addNewCenturiesParams('17')}
              data-cy="century"
              className={addClassForCenturyLink('17')}
            >
              17
            </SearchLink>

            <SearchLink
              params={addNewCenturiesParams('18')}
              data-cy="century"
              className={addClassForCenturyLink('18')}
            >
              18
            </SearchLink>

            <SearchLink
              params={addNewCenturiesParams('19')}
              data-cy="century"
              className={addClassForCenturyLink('19')}
            >
              19
            </SearchLink>

            <SearchLink
              params={addNewCenturiesParams('20')}
              data-cy="century"
              className={addClassForCenturyLink('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const definitionParamsCenturies = (newValue: string) => {
    if (!newValue) {
      return { centuries: [] };
    }

    const newCenturies = centuries.includes(newValue)
      ? centuries.filter(number => number !== newValue)
      : [...centuries, newValue];

    return { centuries: newCenturies };
  };

  const getCenturyClass = (value: string) => {
    return classNames(
      'button', 'mr-1', { 'is-info': centuries.includes(value) },
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: '' || null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' || null }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' || null }}
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
            <SearchLink
              params={definitionParamsCenturies('16')}
              data-cy="century"
              className={getCenturyClass('16')}
            >
              16
            </SearchLink>

            <SearchLink
              params={definitionParamsCenturies('17')}
              data-cy="century"
              className={getCenturyClass('17')}
            >
              17
            </SearchLink>

            <SearchLink
              params={definitionParamsCenturies('18')}
              data-cy="century"
              className={getCenturyClass('18')}
            >
              18
            </SearchLink>

            <SearchLink
              params={definitionParamsCenturies('19')}
              data-cy="century"
              className={getCenturyClass('19')}
            >
              19
            </SearchLink>

            <SearchLink
              params={definitionParamsCenturies('20')}
              data-cy="century"
              className={getCenturyClass('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={definitionParamsCenturies('')}
              data-cy="centuryALL"
              className={classNames(
                'button', 'is-success', { 'is-outlined': !!centuries.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

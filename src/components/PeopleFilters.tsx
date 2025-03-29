import classNames from 'classnames';
import { Link } from 'react-router-dom';
import getSearchWith from '../utils/searchHelper';

type Props = {
  query: string;
  sex: string;
  centuries: string[];
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

export const PeopleFilters = ({
  query,
  sex,
  centuries,
  searchParams,
  setSearchParams,
}: Props) => {
  function setSearchWith(params: Record<string, string | null>) {
    const updatedSearchString = getSearchWith(searchParams, params);

    const updatedSearchParams = new URLSearchParams(updatedSearchString);

    setSearchParams(updatedSearchParams);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchWith({ query: event.target.value || null });
  };

  const handleSexFilterChange = (newSex: string, event: React.MouseEvent) => {
    event.preventDefault();
    setSearchWith({ sex: newSex || null });
  };

  //const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //const params = new URLSearchParams(searchParams);
  //params.set('query', e.target.value);
  //setSearchParams(params);
  //};

  //const handleSexFilterChange = (newSex: string, e: React.MouseEvent) => {
  // e.preventDefault();
  //const params = new URLSearchParams(searchParams);
  //params.set('sex', newSex);
  //setSearchParams(params);
  //};

  const handleCenturyChange = (newCentury: string, e: React.MouseEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (newCentury === 'all') {
      params.delete('century');
    } else {
      if (centuries.includes(newCentury)) {
        params.delete('century');
        centuries
          .filter(century => century !== newCentury)
          .forEach(century => {
            params.append('century', century);
          });
      } else {
        params.append('century', newCentury);
      }
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to="#/people"
          className={classNames({ 'is-active': sex === 'all' })}
          onClick={e => handleSexFilterChange('all', e)}
        >
          All
        </Link>
        <Link
          to="#/people?sex=m"
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={e => handleSexFilterChange('m', e)}
        >
          Male
        </Link>
        <Link
          to="#/people?sex=f"
          className={classNames({ 'is-active': sex === 'f' })}
          onClick={e => handleSexFilterChange('f', e)}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                to="#/people"
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={e => handleCenturyChange(century, e)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to="#/people"
              data-cy="centuryALL"
              className="button is-outlined is-success"
              onClick={e => handleCenturyChange('all', e)}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to="#/people"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.delete('sort');
            params.delete('order');
            setSearchParams(params);
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

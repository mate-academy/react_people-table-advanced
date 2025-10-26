import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
  sex: string;
  query: string;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  sex,
  query,
  centuries,
}) => {
  const location = useLocation();

  const toUrl = (params: URLSearchParams) =>
    `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;

  const setGenderClass = (selectedGender: string) =>
    classNames({ 'is-active': sex === selectedGender });

  const getGenderUrl = (gender: string) => {
    const params = new URLSearchParams(searchParams);

    if (gender) {
      params.set('sex', gender);
    } else {
      params.delete('sex');
    }

    return toUrl(params);
  };

  const centuriesClass = (century: string) =>
    classNames('button mr-1', { 'is-info': centuries.includes(`${century}`) });

  const getCenturyUrl = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c));

    return toUrl(params);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value !== '') {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const getCenturiesResetUrl = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    return toUrl(params);
  };

  const getResetFiltersUrl = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');

    return toUrl(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['', 'm', 'f'].map(gender => (
          <Link
            key={gender}
            to={getGenderUrl(gender)}
            className={setGenderClass(gender)}
          >
            {gender === '' ? 'All' : gender === 'm' ? 'Male' : 'Female'}
          </Link>
        ))}
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
            {[16, 17, 18, 19, 20].map(century => (
              <Link
                key={century}
                data-cy="century"
                to={getCenturyUrl(`${century}`)}
                className={centuriesClass(`${century}`)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={getCenturiesResetUrl()}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={getResetFiltersUrl()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

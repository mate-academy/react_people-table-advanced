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

  const setGenderClass = (selectedGender: string) =>
    classNames({ 'is-active': sex === selectedGender });

  const getGenderUrl = (gender: string) => {
    const params = new URLSearchParams(searchParams);

    if (gender) {
      params.set('sex', gender);
    } else {
      params.delete('sex');
    }

    return `${location.pathname}?${params.toString()}`;
  };

  const handleGenders = (gender: string) => {
    const params = new URLSearchParams(searchParams);

    if (gender) {
      params.set('sex', gender);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
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

    return `${location.pathname}?${params.toString()}`;
  };

  const handleCenturies = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value !== '') {
      const newCenturies = centuries.includes(value)
        ? centuries.filter(century => century !== value)
        : [...centuries, value];

      params.delete('centuries');
      newCenturies.forEach(century => params.append('centuries', century));
    } else {
      params.delete('centuries');
    }

    setSearchParams(params);
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

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);
    let isUpdated = false;

    ['sex', 'query', 'centuries'].forEach(param => {
      if (params.has(param)) {
        params.delete(param);
        isUpdated = true;
      }
    });

    if (isUpdated) {
      setSearchParams(params);
    }
  };

  const getCenturiesResetUrl = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    return `${location.pathname}?${params.toString()}`;
  };

  const getResetFiltersUrl = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');

    return `${location.pathname}?${params.toString()}`;
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
            onClick={() => handleGenders(gender)}
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
            onChange={e => handleChange(e)}
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
                onClick={() => handleCenturies(`${century}`)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button is-success ${centuries.length !== 0 && 'is-outlined'}`}
              to={getCenturiesResetUrl()}
              onClick={() => handleCenturies('')}
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
          onClick={() => handleResetFilters}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

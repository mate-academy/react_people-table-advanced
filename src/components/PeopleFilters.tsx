import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import * as constants from '../utils/constants';
import { Gender } from '../types/Gender';

type Props = {
  query: string | null,
  centuries: string[] | undefined,
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  centuries,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGender: string = searchParams.get('sex') ?? Gender.All;

  const addCenturyToUrlParams = (cen: string): URLSearchParams => {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries?.includes(cen)
      ? centuries.filter(century => century !== cen)
      : [...(centuries ?? []), cen];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));

    return params;
  };

  const addGenderToUrlParams = (gender: string): URLSearchParams => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    if (gender !== 'all') {
      params.append('sex', gender);
    }

    return params;
  };

  function clearCenturies():URLSearchParams {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    return params;
  }

  const onChangeSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const peopleGenders = Object.entries(Gender);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {peopleGenders.map(([key, value]) => (
          <Link
            className={classNames({ 'is-active': value !== selectedGender })}
            to={{
              pathname: '',
              search: addGenderToUrlParams(value).toString(),
            }}
            key={key}
          >
            {key}
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
            value={query ?? ''}
            onChange={onChangeSetQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {constants.centurySet.map(currentCentury => (
              <Link
                key={`${Date.now()}_${currentCentury}`}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries?.includes(currentCentury),
                })}
                to={{
                  pathname: '',
                  search: addCenturyToUrlParams(currentCentury).toString(),
                }}
              >
                {currentCentury}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', 'is-success',
                { 'is-outlined': centuries?.length })}
              to={{
                pathname: '',
                search: clearCenturies().toString(),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className={classNames('button', 'is-link', 'is-outlined',
            { 'is-fullwidth': searchParams })}
          to="#/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

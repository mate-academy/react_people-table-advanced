import classNames from 'classnames';
import { Link, SetURLSearchParams, useSearchParams } from 'react-router-dom';

type Search = {
  (
    searchParams: URLSearchParams,
    params: {
      [keys: string]: string | string[] | null;
    }
  ): string;
};

export const PeopleFilters = ({
  setSearchWith,
  currentSearchParams,
  setSearchParams,
}: {
  setSearchWith: Search;
  currentSearchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) => {
  const [searchParamSecondAttach] = useSearchParams();
  const centuriesAll = currentSearchParams.getAll('centuries') || [];
  const sexAll = currentSearchParams.get('sex') || '';
  const searchAll = currentSearchParams.get('search');
  const centuriesArray = ['16', '17', '18', '19', '20'];

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sendForm: {
      search: string,
      centuries: string[],
      sex?: string,
    } = {
      search: event.target.value,
      centuries: [...centuriesAll],
    };

    if (sexAll !== '') {
      sendForm.sex = sexAll;
    }

    setSearchParams(sendForm);

    if (event.target.value === '') {
      setSearchParams('');
    }
  };

  const handleClick = (value?: {
    sex?: string | null;
    centuries?: string | null;
  }) => {
    if (value?.centuries) {
      const decision = {
        search: setSearchWith(searchParamSecondAttach, {
          search: searchAll,
          centuries: centuriesAll.includes(value.centuries)
            ? centuriesAll.filter((l) => l !== value.centuries)
            : [...centuriesAll, value.centuries],
          sex: sexAll === '' ? null : sexAll,
        }),
      };

      return decision;
    }

    if (value?.centuries === null) {
      const decision = {
        search: setSearchWith(searchParamSecondAttach, {
          search: searchAll === '' ? null : searchAll,
          centuries: null,
          sex: sexAll === '' ? null : sexAll,
        }),
      };

      return decision;
    }

    if (value?.sex || value?.sex === null) {
      const decision = {
        search: setSearchWith(searchParamSecondAttach, {
          search: searchAll === '' ? null : searchAll,
          centuries: [...centuriesAll],
          sex: value.sex,
        }),
      };

      return decision;
    }

    return '/people';
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': sexAll?.length === 0,
          })}
          to={handleClick({ sex: null })}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': sexAll?.includes('m'),
          })}
          to={handleClick({ sex: 'm' })}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': sexAll?.includes('f'),
          })}
          to={handleClick({ sex: 'f' })}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            onChange={onInput}
            value={currentSearchParams.get('search') || ''}
            type="search"
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
            {centuriesArray.map((number) => (
              <Link
                data-cy="century"
                key={number}
                className={classNames('button', 'mr-1', {
                  'is-info': centuriesAll.includes(number),
                })}
                to={handleClick({ centuries: number })}
              >
                {number}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={handleClick({ centuries: null })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={handleClick()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SexEnum } from '../utils/SexEnum';

type Props = {
  centuries: string[],
  query: string,
  sex: string,
};

const cEnturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({
  centuries,
  query,
  sex,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // eslint-disable-next-line
  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn('', { 'is-active': sex === SexEnum.ALL })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>

        <Link
          className={cn('', { 'is-active': sex === SexEnum.MALE })}
          to={{
            search: getSearchWith(searchParams,
              { sex: SexEnum.MALE || null }),
          }}
        >
          Male
        </Link>

        <Link
          className={cn('', { 'is-active': sex === SexEnum.FEMALE })}
          to={{
            search: getSearchWith(searchParams,
              { sex: SexEnum.FEMALE || null }),
          }}
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
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {
              cEnturies.map((century) => (
                <Link
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(century.toString()),
                  })}
                  to={{
                    search: getSearchWith(searchParams, {
                      centuries: (centuries.includes(century))
                        ? centuries.filter((ch) => ch !== century)
                        : [...centuries, century],
                    }),
                  }}
                >
                  {century}
                </Link>
              ))
            }
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': (!!centuries.length),
              })}
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
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
            search: getSearchWith(searchParams,
              { sex: null, query: null, centuries: null }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

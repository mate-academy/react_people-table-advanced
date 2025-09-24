import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

enum Sex {
  Male = 'm',
  Female = 'f',
}

enum Century {
  Sixteen = '16',
  Seventeen = '17',
  Eighteen = '18',
  Nineteen = '19',
  Twenty = '20',
}

export const PeopleFilters: React.FC = () => {
  const centuries = [
    Century.Sixteen,
    Century.Seventeen,
    Century.Eighteen,
    Century.Nineteen,
    Century.Twenty,
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const searchCenturies = searchParams.getAll('centuries');

  const handleSex = (param: string) => {
    return {
      sex: param || null,
    };
  };

  const handleInputParam = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParam = new URLSearchParams(searchParams);

    // setInputParam(e.target.value);
    newParam.set('query', e.target.value);

    if (!e.target.value) {
      newParam.delete('query');
    }

    setSearchParams(newParam);
  };

  const handleCenturies = (param: string) => {
    const newCenturies = searchCenturies.includes(param)
      ? searchCenturies.filter(elem => elem !== param)
      : [...searchCenturies, param];

    return { centuries: newCenturies };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={handleSex('')} className={sex ? '' : 'is-active'}>
          All
        </SearchLink>
        <SearchLink
          params={handleSex(Sex.Male)}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={handleSex(Sex.Female)}
          className={sex === 'f' ? 'is-active' : ''}
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
            value={query}
            onChange={e => handleInputParam(e)}
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
            {centuries.map(century => {
              return (
                <SearchLink
                  key={century}
                  params={handleCenturies(century)}
                  data-cy="century"
                  className={
                    searchCenturies.includes(century)
                      ? 'button mr-1 is-info'
                      : 'button mr-1'
                  }
                >
                  {+century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={
                searchParams.has('centuries')
                  ? 'button is-success is-outlined'
                  : 'button is-success'
              }
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            centuries: null,
            query: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

import { useSearchParams, Link } from 'react-router-dom';
import cn from 'classnames';

const SexFilter:{ [key:string]:string } = {
  All: '',
  Male: 'm',
  Female: 'f',
};

const CenturyFilter = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  // const [centuries, setCenturies] = useState<CenturyFilter[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleSexChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    type: string,
  ) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (type === 'All') {
      params.delete('sex');
    }

    if (type === 'Male') {
      params.set('sex', SexFilter.Male);
    }

    if (type === 'Female') {
      params.set('sex', SexFilter.Female);
    }

    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    setSearchParams(params);
  };

  const handlCenturyChange = (event:React.MouseEvent<HTMLAnchorElement>,
    century:number) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(century.toString())
      ? centuries.filter(c => +c !== century)
      : [...centuries, century];

    params.delete('centuries');

    newCenturies.forEach(el => {
      params.append('centuries', el.toString());
    });
    setSearchParams(params);
  };

  const handleClearCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(SexFilter).map((type) => (
          <Link
            className={cn({
              'is-active': sex === SexFilter[type],
            })}
            to="#/people"
            onClick={(event) => handleSexChange(event, type)}
            key={type}
          >
            {type}
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

            {CenturyFilter.map(century => (
              <a
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.find(c => +c === century),
                })}
                href="#/people"
                onClick={(event) => handlCenturyChange(event, century)}
              >
                {century}
              </a>
            ))}

          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              href="#/people"
              onClick={handleClearCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

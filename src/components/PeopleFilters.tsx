import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const handleGenderChange = (
    gender: Sex,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.set('sex', gender);
    setSearchParams(params);
  };

  const genderTabActive = (gender: Sex) => {
    return searchParams.get('sex') === gender ? 'is-active' : '';
  };

  const handleCenturyChange = (
    century: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);
    const centuries = params.getAll('centuries');

    if (centuries.includes(century)) {
      const newCenturies = centuries.filter(
        currCentury => currCentury !== century,
      );

      params.delete('centuries');
      newCenturies.forEach(currCentury =>
        params.append('centuries', currCentury),
      );
    } else {
      params.append('centuries', century);
    }

    setSearchParams(params);
  };

  const handleAll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const centuryTabActive = (century: string) => {
    const centuries = searchParams.getAll('centuries');

    return centuries.includes(century) ? 'is-info' : '';
  };

  const hadleReset = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setSearchParams({});
  };

  const genderSelection = [
    {
      label: 'All',
      link: '#/people',
      sex: Sex.All,
    },
    {
      label: 'Male',
      link: '#/people?sex=m',
      sex: Sex.Male,
    },
    {
      label: 'Female',
      link: '#/people?sex=f',
      sex: Sex.Female,
    },
  ];

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        {genderSelection.map(({ label, link, sex }) => (
          <a
            key={label}
            className={cn('panel-block', genderTabActive(sex))}
            href={link}
            onClick={event => handleGenderChange(sex, event)}
          >
            {label}
          </a>
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
            onChange={event => {
              handleQuery(event);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <a
                key={century}
                data-cy="century"
                className={cn('button mr-1', centuryTabActive(century))}
                href={`#/people?centuries=${century}`}
                onClick={event => handleCenturyChange(century, event)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={event => handleAll(event)}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={event => hadleReset(event)}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

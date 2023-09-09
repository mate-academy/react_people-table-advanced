import { useSearchParams, Link, NavLink } from 'react-router-dom';

enum Sex {
  all = 'all',
  male = 'm',
  female = 'f',
}

enum Params {
  sex = 'sex',
  query = 'query',
  centuries = 'centuries',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get(Params.sex) || '';
  const query = searchParams.get(Params.query) || '';
  const centuries = searchParams.getAll(Params.centuries) || '';

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value) {
      params.delete(Params.query);
      setSearchParams(params);

      return;
    }

    params.set(Params.query, event.target.value);
    setSearchParams(params);
  };

  const handleClickSex = (currentSex: Sex) => (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (currentSex === Sex.all) {
      params.delete(Params.sex);
      setSearchParams(params);

      return;
    }

    params.set(Params.sex, currentSex);
    setSearchParams(params);
  };

  const handleClickCenturies = (currentCentury: string) => (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (centuries.includes(currentCentury)) {
      params.delete(Params.centuries);
      centuries.forEach(century => {
        if (century !== currentCentury) {
          params.append(Params.centuries, century);
        }
      });

      setSearchParams(params);

      return;
    }

    params.append(Params.centuries, currentCentury);
    setSearchParams(params);
  };

  const handleClickWithoutCenturies = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    searchParams.delete(Params.centuries);
    setSearchParams(searchParams);
  };

  const handleclickDeleteFilters = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();

    const params = new URLSearchParams();

    searchParams.forEach((value, param) => {
      if (param === 'sort' || param === 'order') {
        params.set(param, value);
      }
    });

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!sex ? 'is-active' : ''}
          to={`/people?${searchParams.toString()}`}
          onClick={handleClickSex(Sex.all)}
        >
          All
        </Link>

        <Link
          className={sex === Sex.male ? 'is-active' : ''}
          to="/people"
          onClick={handleClickSex(Sex.male)}
        >
          Male
        </Link>

        <Link
          className={sex === Sex.female ? 'is-active' : ''}
          to="/people"
          onClick={handleClickSex(Sex.female)}
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
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <NavLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') && 'is-info'}`}
              to="/people?centuries=16"
              onClick={handleClickCenturies('16')}
            >
              16
            </NavLink>

            <Link
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') && 'is-info'}`}
              to="/people?centuries=17"
              onClick={handleClickCenturies('17')}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') && 'is-info'}`}
              to="/people?centuries=18"
              onClick={handleClickCenturies('18')}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') && 'is-info'}`}
              to="/people?centuries=19"
              onClick={handleClickCenturies('19')}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') && 'is-info'}`}
              to="/people?centuries=20"
              onClick={handleClickCenturies('20')}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button is-success ${!!centuries.length && 'is-outlined'}`}
              to="/people"
              onClick={handleClickWithoutCenturies}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
          onClick={handleclickDeleteFilters}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

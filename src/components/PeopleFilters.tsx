import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  //#region Text search

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; // Criação de variável para a pesquisa

    searchParams.set('query', value); // Adiciona o que foi digitado a URL
    setSearchParams(searchParams); // Seta a nova URL
  };
  //#endregion

  //#region Centuryes search

  // primeiro remove caso selecionado, depois adiciona caso if falso
  const centuries = searchParams.getAll('centuries');

  const handleCenturies = (century: string) => {
    const params = new URLSearchParams(searchParams);

    if (centuries.includes(century)) {
      const newCenturies = centuries.filter(
        (currentCentury: string) => currentCentury !== century,
      );

      params.delete('centuries');

      newCenturies.forEach((currentCentury: string) => {
        params.append('centuries', currentCentury);
      });
    } else {
      params.append('centuries', century);
    }

    setSearchParams(params);
  };
  //#endregion

  //#region Sex search
  const sex = searchParams.get('sex');

  const handleSex = (value: string) => {
    searchParams.set('sex', value);
    setSearchParams(searchParams);
  };
  //#endregion

  const deleteKey = (key: string) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === null ? 'is-active' : ''}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            deleteKey('sex');
          }}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          href="#/people?sex=m"
          onClick={event => {
            event.preventDefault();
            handleSex('m');
          }}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          href="#/people?sex=f"
          onClick={event => {
            event.preventDefault();
            handleSex('f');
          }}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
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
            <a
              data-cy="century"
              className={
                centuries.includes('16') ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#/people?centuries=16"
              onClick={event => {
                event.preventDefault();
                handleCenturies('16');
              }}
            >
              16
            </a>

            <a
              data-cy="century"
              className={
                centuries.includes('17') ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#/people?centuries=17"
              onClick={event => {
                event.preventDefault();
                handleCenturies('17');
              }}
            >
              17
            </a>

            <a
              data-cy="century"
              className={
                centuries.includes('18') ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#/people?centuries=18"
              onClick={event => {
                event.preventDefault();
                handleCenturies('18');
              }}
            >
              18
            </a>

            <a
              data-cy="century"
              className={
                centuries.includes('19') ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#/people?centuries=19"
              onClick={event => {
                event.preventDefault();
                handleCenturies('19');
              }}
            >
              19
            </a>

            <a
              data-cy="century"
              className={
                centuries.includes('20') ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#/people?centuries=20"
              onClick={event => {
                event.preventDefault();
                handleCenturies('20');
              }}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={
                centuries.length === 0
                  ? 'button is-success'
                  : 'button is-outlined'
              }
              href="#/people"
              onClick={() => deleteKey('centuries')}
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
          onClick={() => {
            deleteKey('centuries');
            deleteKey('sex');
            deleteKey('query');
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

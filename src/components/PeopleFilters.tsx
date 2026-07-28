import classNames from 'classnames';
import { Century, Sex } from '../types';
import { useSearchParams } from 'react-router-dom';

type Props = {
  query: string;
  sex: string;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({ query, sex, centuries }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  }

  function handleChangeSex(currSex: Sex) {
    const params = new URLSearchParams(searchParams);

    if (currSex === Sex.All) {
      params.delete('sex');
    } else {
      params.set('sex', currSex);
    }

    setSearchParams(params);
  }

  function handleChangeCentury(currCentury: Century) {
    const params = new URLSearchParams(searchParams);

    const selectedCenturies = centuries.includes(currCentury.toString())
      ? centuries.filter(century => century !== currCentury.toString())
      : [...centuries, currCentury.toString()];

    params.delete('century');

    selectedCenturies.forEach(selectedCentury =>
      params.append('century', selectedCentury),
    );

    setSearchParams(params);
  }

  function handleClearCentury() {
    const params = new URLSearchParams(searchParams);

    params.delete('century');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !sex })}
          href={`#/people?${searchParams}`}
          onClick={() => handleChangeSex(Sex.All)}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sex === Sex.Male })}
          href={`#/people?${searchParams}`}
          onClick={() => handleChangeSex(Sex.Male)}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sex === Sex.Female })}
          href={`#/people?${searchParams}`}
          onClick={() => handleChangeSex(Sex.Female)}
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
            onChange={handleChangeSearch}
            value={query}
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
              className={classNames('button mr-1', {
                'is-info': centuries.includes(Century.Sixteen.toString()),
              })}
              href={`#/people?${searchParams}`}
              onClick={() => handleChangeCentury(Century.Sixteen)}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes(Century.Seventeen.toString()),
              })}
              href={`#/people?${searchParams}`}
              onClick={() => handleChangeCentury(Century.Seventeen)}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes(Century.Eighteen.toString()),
              })}
              href={`#/people?${searchParams}`}
              onClick={() => handleChangeCentury(Century.Eighteen)}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes(Century.Nineteen.toString()),
              })}
              href={`#/people?${searchParams}`}
              onClick={() => handleChangeCentury(Century.Nineteen)}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes(Century.Twenty.toString()),
              })}
              href={`#/people?${searchParams}`}
              onClick={() => handleChangeCentury(Century.Twenty)}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href={`#/people?${searchParams}`}
              onClick={handleClearCentury}
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

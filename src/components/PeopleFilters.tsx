import { FilterSexType } from '../types/Sex';
import classNames from 'classnames';
import { SetURLSearchParams } from 'react-router-dom';

type Props = {
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
  sex: string | null;
  centuries: string[];
};

export const PeopleFilters = ({
  setSearchParams,
  searchParams,
  sex,
  centuries,
}: Props) => {
  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleSexChange(sexType: FilterSexType) {
    const params = new URLSearchParams(searchParams);

    if (sexType !== 'all') {
      params.set('sex', sexType);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function handleCenturiesChange(century: string) {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = searchParams.getAll('centuries');

    if (currentCenturies.includes(century)) {
      params.delete('centuries');
      currentCenturies.forEach(c => {
        if (c !== century) {
          params.append('centuries', c);
        }
      });
    } else {
      params.append('centuries', century);
    }

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({
            'is-active': !sex,
          })}
          onClick={() => handleSexChange(FilterSexType.All)}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': sex === 'm',
          })}
          onClick={() => handleSexChange(FilterSexType.Male)}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': sex === 'f',
          })}
          onClick={() => handleSexChange(FilterSexType.Female)}
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
            onChange={event => handleQueryChange(event)}
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
                'is-info': centuries.includes('16'),
              })}
              onClick={() => handleCenturiesChange('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              onClick={() => handleCenturiesChange('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              onClick={() => handleCenturiesChange('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              onClick={() => handleCenturiesChange('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              onClick={() => handleCenturiesChange('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => setSearchParams(new URLSearchParams())}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

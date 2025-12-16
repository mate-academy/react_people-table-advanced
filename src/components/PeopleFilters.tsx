import classNames from 'classnames';
import { Century } from '../types/Century';
import { Sex } from '../types/Sex';
import { SetURLSearchParams } from 'react-router-dom';

type Props = {
  query: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sex: Sex;
  century: Century[];
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  searchParams,
  setSearchParams,
  handleQueryChange,
  sex,
  century,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === null ? 'is-active' : ''}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.delete('sex');
            setSearchParams(params);
          }}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.set('sex', 'm');
            setSearchParams(params);
          }}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.set('sex', 'f');
            setSearchParams(params);
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
            value={query}
            onChange={handleQueryChange}
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
            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': century.includes('16'),
              })}
              onClick={() => {
                const newCentury = century.includes('16')
                  ? century.filter(c => c !== '16')
                  : [...century.filter(c => c !== 'All'), '16'];

                const params = new URLSearchParams(searchParams);

                params.delete('centuries');

                if (newCentury.length > 0) {
                  newCentury.forEach(c => params.append('centuries', c));
                }

                setSearchParams(params);
              }}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': century.includes('17'),
              })}
              onClick={() => {
                const newCentury = century.includes('17')
                  ? century.filter(c => c !== '17')
                  : [...century.filter(c => c !== 'All'), '17'];

                const params = new URLSearchParams(searchParams);

                params.delete('centuries');

                if (newCentury.length > 0) {
                  newCentury.forEach(c => params.append('centuries', c));
                }

                setSearchParams(params);
              }}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': century.includes('18'),
              })}
              onClick={() => {
                const newCentury = century.includes('18')
                  ? century.filter(c => c !== '18')
                  : [...century.filter(c => c !== 'All'), '18'];

                const params = new URLSearchParams(searchParams);

                params.delete('centuries');

                if (newCentury.length > 0) {
                  newCentury.forEach(c => params.append('centuries', c));
                }

                setSearchParams(params);
              }}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': century.includes('19'),
              })}
              onClick={() => {
                const newCentury = century.includes('19')
                  ? century.filter(c => c !== '19')
                  : [...century.filter(c => c !== 'All'), '19'];

                const params = new URLSearchParams(searchParams);

                params.delete('centuries');

                if (newCentury.length > 0) {
                  newCentury.forEach(c => params.append('centuries', c));
                }

                setSearchParams(params);
              }}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': century.includes('20'),
              })}
              onClick={() => {
                const newCentury = century.includes('20')
                  ? century.filter(c => c !== '20')
                  : [...century.filter(c => c !== 'All'), '20'];

                const params = new URLSearchParams(searchParams);

                params.delete('centuries');

                if (newCentury.length > 0) {
                  newCentury.forEach(c => params.append('centuries', c));
                }

                setSearchParams(params);
              }}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !(century.length === 1 && century[0] === 'All'),
              })}
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                params.delete('centuries');
                setSearchParams(params);
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            setSearchParams({});
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

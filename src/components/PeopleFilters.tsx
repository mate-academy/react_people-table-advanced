import cn from 'classnames';
import { Options, PersonSex } from '../types/enum';
import { SearchLink } from './SearchLink';

const centuriesForRender:string[] = ['16', '17', '18', '19', '20'];

interface Props {
  query: string;
  handleQueryChange:(value: React.ChangeEvent<HTMLInputElement>) => void;
  centuries: string[];
  sex: PersonSex;
}

export const PeopleFilters: React.FC<Props> = (props) => {
  const {
    query,
    handleQueryChange,
    centuries,
    sex,
  } = props;

  const setCenturies = (century:string) => (
    {
      centuries: centuries
        .includes(century.toString())
        ? centuries
          .filter(currentCentury => currentCentury !== century.toString())
        : [...centuries, century],
    }
  );

  const onReset = () => ({ centuries: null, query: null, sex: null });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          {Options.ALL}
        </SearchLink>
        <SearchLink
          params={{ sex: PersonSex.MALE }}
          className={cn({ 'is-active': sex === PersonSex.MALE })}
        >
          {Options.MALE}
        </SearchLink>
        <SearchLink
          params={{ sex: PersonSex.FEMALE }}
          className={cn({ 'is-active': sex === PersonSex.FEMALE })}
        >
          {Options.FEMALE}
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {centuriesForRender.map(century => (

              <SearchLink
                params={setCenturies(century)}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                data-cy="century"
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={onReset()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

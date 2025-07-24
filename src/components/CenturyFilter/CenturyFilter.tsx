import classNames from 'classnames';
import { FilterCenturyValues } from '../../types/CenturyFilter';
import { SearchLink } from '../SearchLink/SearchLink';
import { usePeopleContext } from '../../context/ContextProvider';

export const CenturyFilter: React.FC = () => {
  const { C16, C17, C18, C19, C20 } = FilterCenturyValues;
  const { centuryFilter, setCenturyFilter } = usePeopleContext();

  const getUpdatedCenturyFilter = (value: string): string[] => {
    return centuryFilter.includes(value)
      ? centuryFilter.filter(c => c !== value)
      : [...centuryFilter, value];
  };

  const clearCenturyFilter = () => {
    setCenturyFilter([]);
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          <SearchLink
            data-cy="century"
            params={{
              centuries: getUpdatedCenturyFilter(C16),
            }}
            onClick={() => setCenturyFilter(getUpdatedCenturyFilter(C16))}
            className={classNames('button', 'mr-1', {
              'is-info': centuryFilter.includes(C16),
            })}
          >
            16
          </SearchLink>
          <SearchLink
            data-cy="century"
            params={{ centuries: getUpdatedCenturyFilter(C17) }}
            onClick={() => setCenturyFilter(getUpdatedCenturyFilter(C17))}
            className={classNames('button', 'mr-1', {
              'is-info': centuryFilter.includes(C17),
            })}
          >
            17
          </SearchLink>
          <SearchLink
            data-cy="century"
            params={{ centuries: getUpdatedCenturyFilter(C18) }}
            onClick={() => setCenturyFilter(getUpdatedCenturyFilter(C18))}
            className={classNames('button', 'mr-1', {
              'is-info': centuryFilter.includes(C18),
            })}
          >
            18
          </SearchLink>
          <SearchLink
            data-cy="century"
            params={{ centuries: getUpdatedCenturyFilter(C19) }}
            onClick={() => setCenturyFilter(getUpdatedCenturyFilter(C19))}
            className={classNames('button', 'mr-1', {
              'is-info': centuryFilter.includes(C19),
            })}
          >
            19
          </SearchLink>
          <SearchLink
            data-cy="century"
            params={{ centuries: getUpdatedCenturyFilter(C20) }}
            onClick={() => setCenturyFilter(getUpdatedCenturyFilter(C20))}
            className={classNames('button', 'mr-1', {
              'is-info': centuryFilter.includes(C20),
            })}
          >
            20
          </SearchLink>
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            params={{ centuries: null }}
            onClick={() => {
              clearCenturyFilter();
            }}
            className={classNames('button', 'is-success', {
              'is-outlined': centuryFilter.length > 0,
            })}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

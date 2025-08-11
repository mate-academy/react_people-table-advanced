import { SearchLink } from '../../SearchLink';
import classNames from 'classnames';

const CENTURY_FOR_FILTER = ['16', '17', '18', '19', '20'];

interface Props {
  selectedCenturies: string[];
}

export const FilterByCentury: React.FC<Props> = ({ selectedCenturies }) => {
  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {CENTURY_FOR_FILTER.map(century => {
          const isActive = selectedCenturies.includes(century);

          const updatedCenturies = isActive
            ? selectedCenturies.filter(c => c !== century)
            : [...selectedCenturies, century];

          return (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames('button mr-1', { 'is-info': isActive })}
              params={{
                centuries: updatedCenturies.length ? updatedCenturies : null,
              }}
            >
              {century}
            </SearchLink>
          );
        })}
      </div>

      <div className="level-right ml-4">
        <SearchLink
          data-cy="centuryALL"
          className={classNames('button is-success is-outlined', {
            '': selectedCenturies.length === 0,
          })}
          params={{ centuries: null }}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};

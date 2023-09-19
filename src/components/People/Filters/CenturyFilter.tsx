import classNames from 'classnames';
import { Person } from '../../../types';
import { SearchLink } from '../../SearchLink';

type Props = {
  peopleFromServer: Person[],
  centuries: string[],
  clearCenturies: () => void,
  toggleCenturyChange: (century: string) => void,
  getCenturyFromYear: (year: number) => number,
};

export const CenturyFilter: React.FC<Props> = ({
  peopleFromServer,
  centuries,
  clearCenturies,
  toggleCenturyChange,
  getCenturyFromYear,
}) => {
  const getAllCenturies = () => {
    const setOfSortedYears = new Set(peopleFromServer
      .map(person => person.born)
      .sort());

    const uniqueYears = [...setOfSortedYears];
    const uniqueCenturies = [...new Set(uniqueYears
      .map(uniqueYear => getCenturyFromYear(uniqueYear)))];

    return uniqueCenturies;
  };

  const allCenturies = getAllCenturies();

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {
            allCenturies.map(century => (
              <SearchLink
                params={{
                  centuries: centuries.includes(century.toString())
                    ? centuries.filter(c => c !== century.toString())
                    : [...centuries, century.toString()],
                }}
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(century.toString()) },
                )}
                onClick={() => toggleCenturyChange(century.toString())}
              >
                {century}
              </SearchLink>
            ))
          }
        </div>

        <div className="level-right ml-4">
          <SearchLink
            params={{ centuries: null }}
            data-cy="centuryALL"
            className={classNames(
              'button is-success',
              { 'is-outlined': centuries.length > 0 },
            )}
            onClick={() => clearCenturies()}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

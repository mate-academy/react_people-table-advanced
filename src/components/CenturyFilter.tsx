import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getSearchWith } from '../utils/searchHelper';
import { useMemo } from 'react';

type Props = {
  people: Person[];
};

export const CenturyFilter = ({ people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');

  const availableCenturies = useMemo(() => {
    const centuries = people.map(p => Math.ceil(p.born / 100));
    return Array.from(new Set(centuries)).sort((a, b) => a - b);
  }, [people]);

  const toggleCentury = (century: string) => {
    let newCenturies = [...selectedCenturies];
    if (newCenturies.includes(century)) {
      newCenturies = newCenturies.filter(c => c !== century);
    } else {
      newCenturies.push(century);
    }
    
    setSearchParams(getSearchWith(searchParams, { 
      centuries: newCenturies.length > 0 ? newCenturies : null 
    }));
  };

  return (
    <div className="field">
      <label className="label">
        Filter by Century
        <div className="buttons mt-2">
          {availableCenturies.map(century => {
            const centuryStr = String(century);
            const isActive = selectedCenturies.includes(centuryStr);
            return (
              <button
                key={century}
                type="button"
                className={`button ${isActive ? 'is-info' : 'is-light'}`}
                onClick={() => toggleCentury(centuryStr)}
              >
                {century}
              </button>
            );
          })}
        </div>
      </label>
    </div>
  );
};
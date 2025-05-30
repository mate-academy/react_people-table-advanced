import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

const centuries = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.getAll('century');

  const toggleCentury = (century: string) => {
    const newSelected = selected.includes(century)
      ? selected.filter(c => c !== century)
      : [...selected, century];

    const newParams = getSearchWith(searchParams, {
      centuries: newSelected.length ? newSelected : null,
    });

    setSearchParams(newParams);
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => (
            <button
              key={century}
              data-cy="century"
              className={`button mr-1 ${selected.includes(century) ? 'is-info' : ''}`}
              onClick={() => toggleCentury(century)}
            >
              {century}
            </button>
          ))}
        </div>

        <div className="level-right ml-4">
          <a
            data-cy="centuryALL"
            className={`button ${selected.length === 0 ? 'is-success' : 'is-success is-outlined'}`}
            onClick={() => {
              const newParams = getSearchWith(searchParams, {
                centuries: null,
              });

              setSearchParams(newParams);
            }}
          >
            All
          </a>
        </div>
      </div>
    </div>
  );
};

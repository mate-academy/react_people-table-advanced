import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';

const centuries = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');

  const handleCenturyChange = (century: string) => {
    const updatedCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(item => item !== century)
      : [...selectedCenturies, century];

    const search = getSearchWith(searchParams, {
      centuries: updatedCenturies,
    });

    setSearchParams(search);
  };

  const handleAllClick = () => {
    const search = getSearchWith(searchParams, {
      centuries: null,
    });

    setSearchParams(search);
  };

  return (
    <div className="panel-block is-flex-wrap-wrap" data-cy="CenturyFilter">
      <button
        type="button"
        className={
          'button is-small mr-1 mb-1 ' +
          (selectedCenturies.length === 0 ? 'is-info' : '')
        }
        onClick={handleAllClick}
      >
        All
      </button>

      {centuries.map(century => (
        <button
          key={century}
          type="button"
          data-cy="Century"
          className={
            'button is-small mr-1 mb-1 ' +
            (selectedCenturies.includes(century) ? 'is-info' : '')
          }
          onClick={() => handleCenturyChange(century)}
        >
          {century}
        </button>
      ))}
    </div>
  );
};

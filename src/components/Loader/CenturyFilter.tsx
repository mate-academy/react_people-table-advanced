import { useSearchParams } from 'react-router-dom';

const centuries = [16, 17, 18, 19, 20];

export const CenturyFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');

  const handleChange = (century: number) => {
    const params = new URLSearchParams(searchParams);
    const value = String(century);

    if (selectedCenturies.includes(value)) {
      const values = selectedCenturies.filter(item => item !== value);

      params.delete('centuries');

      values.forEach(item => {
        params.append('centuries', item);
      });
    } else {
      params.append('centuries', value);
    }

    setSearchParams(params);
  };

  const handleAll = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  };

  return (
    <div className="field">
      <div className="label">Century</div>

      <div className="control">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={selectedCenturies.length === 0}
            onChange={handleAll}
          />

          {' All'}
        </label>
      </div>

      {centuries.map(century => (
        <div className="control" key={century}>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={selectedCenturies.includes(String(century))}
              onChange={() => handleChange(century)}
            />{' '}
            {century}
          </label>
        </div>
      ))}
    </div>
  );
};

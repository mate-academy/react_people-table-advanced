import { useSearchParams } from 'react-router-dom';

const centuries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CenturyFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('century');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams.toString());

      if (isChecked) {
        newParams.append('century', value);
      } else {
        newParams.delete('century');
      }

      return newParams;
    });
  };

  const handleAllChange = () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams.toString());

      if (selectedCenturies.length === 0) {
        newParams.delete('century');
      } else {
        newParams.delete('century');
      }

      return newParams;
    });
  };

  return (
    <div className="filter">
      <label>Filter by Century:</label>
      <div>
        {centuries.map(century => (
          <div key={century}>
            <input
              type="checkbox"
              id={`century-${century}`}
              value={century}
              checked={selectedCenturies.includes(century.toString())}
              onChange={handleChange}
            />
            <label htmlFor={`century-${century}`}>{century}th Century</label>
          </div>
        ))}
        <div>
          <input
            type="checkbox"
            id="allCenturies"
            value="all"
            checked={selectedCenturies.length === 0}
            onChange={handleAllChange}
          />
          <label htmlFor="allCenturies">All Centuries</label>
        </div>
      </div>
    </div>
  );
};

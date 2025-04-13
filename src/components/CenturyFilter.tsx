import { useSearchParams } from 'react-router-dom';

const centuries = ['15', '16', '17', '18', '19'];

const CenturyFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCenturyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const century = event.target.value;
    const updatedParams = new URLSearchParams(searchParams);

    if (event.target.checked) {
      updatedParams.append('centuries', century);
    } else {
      const currentCenturies = updatedParams.getAll('centuries');

      updatedParams.delete('centuries');
      currentCenturies
        .filter(c => c !== century)
        .forEach(c => {
          updatedParams.append('centuries', c);
        });
    }

    setSearchParams(updatedParams);
  };

  return (
    <div>
      {centuries.map(century => (
        <label key={century}>
          <input
            name="checkbox"
            type="checkbox"
            value={century}
            onChange={handleCenturyChange}
            checked={searchParams.getAll('centuries').includes(century)}
          />
          {`${century}th century`}
        </label>
      ))}
    </div>
  );
};

export default CenturyFilter;

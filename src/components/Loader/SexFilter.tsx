import { useSearchParams } from 'react-router-dom';

const sexes = [
  { value: 'm', label: 'Male' },
  { value: 'f', label: 'Female' },
];

export const SexFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSex = searchParams.get('sex');

  const handleChange = (sex: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedSex === sex) {
      params.delete('sex');
    } else {
      params.set('sex', sex);
    }

    setSearchParams(params);
  };

  const handleAll = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');

    setSearchParams(params);
  };

  return (
    <div className="field">
      <div className="label">Sex</div>

      <div className="control">
        <label className="checkbox">
          <input type="checkbox" checked={!selectedSex} onChange={handleAll} />
          {' All'}
        </label>
      </div>

      {sexes.map(sex => (
        <div className="control" key={sex.value}>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={selectedSex === sex.value}
              onChange={() => handleChange(sex.value)}
            />{' '}
            {sex.label}
          </label>
        </div>
      ))}
    </div>
  );
};

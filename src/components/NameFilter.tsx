/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSearchParams } from 'react-router-dom';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="field">
      <label className="label">Search by name</label>
      <div className="control">
        <input
          data-cy="NameFilter"
          type="text"
          className="input"
          placeholder="Type a name..."
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

import { useSearchParams } from 'react-router-dom';

export const PeopleNameFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  return (
    <p className="control has-icons-left">
      <input
        data-cy="NameFilter"
        type="search"
        className="input"
        placeholder="Search"
        value={query}
        onChange={event => handleChange(event.target.value)}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
};

// ..  NameFilter.tsx
import { useSearchParams } from 'react-router-dom';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart();
    const newParams = new URLSearchParams(searchParams);

    if (value !== '') {
      newParams.set('query', value);
    } else {
      newParams.delete('query'); // Видаляємо параметр, якщо інпут порожній
    }

    setSearchParams(newParams);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          value={query}
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          onChange={handleValue}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

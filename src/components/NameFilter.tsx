import { useSearchParams } from 'react-router-dom';

const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    const updatedParams = new URLSearchParams(searchParams);

    if (query) {
      updatedParams.set('query', query);
    } else {
      updatedParams.delete('query');
    }

    setSearchParams(updatedParams);
  };

  return (
    <input
      type="text"
      placeholder="Filter by name"
      onChange={handleInputChange}
    />
  );
};

export default NameFilter;

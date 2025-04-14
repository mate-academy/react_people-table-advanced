import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';

export const FilterInput = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const path = getSearchWith(searchParams, {
      query: event.currentTarget.value,
    });

    navigate({ search: path });
  };

  return (
    <input
      onChange={handleInputChange}
      data-cy="NameFilter"
      type="search"
      className="input"
      placeholder="Search"
    />
  );
};

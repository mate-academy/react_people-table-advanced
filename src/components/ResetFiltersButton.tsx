import { useNavigate } from 'react-router-dom'; // Для навигации
import { useSearchParams } from 'react-router-dom'; // Для получения текущих параметров поиска
import { getSearchWith } from '../utils/searchHelper'; // Для обновления параметров поиска

export const ResetFiltersButton = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Получаем текущие параметры поиска

  const handleReset = () => {
    const newParams = getSearchWith(searchParams, {
      query: null,
      sex: null,
      centuries: null,
      sort: null,
      order: null,
    });

    navigate({
      pathname: '/people',
      search: newParams.toString(),
    });
  };

  return (
    <div className="panel-block">
      {' '}
      {/* Этот блок будет оборачивать кнопку */}
      <button
        className="button is-link is-outlined is-fullwidth"
        onClick={handleReset}
      >
        Reset all filters
      </button>
    </div>
  );
};

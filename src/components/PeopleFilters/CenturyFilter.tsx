// .. CenturyFilter.tsx
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();

  // Отримуємо всі обрані століття як масив рядків
  const activeCenturies = searchParams.getAll('centuries');

  const getHref = (centuryValue: string | null) => {
    // Якщо клікнули на "All", скидаємо фільтр століть (передаємо null)
    if (centuryValue === null) {
      return {
        search: getSearchWith(searchParams, { centuries: null }),
      };
    }

    let updatedCenturies = [...activeCenturies];

    if (updatedCenturies.includes(centuryValue)) {
      // Якщо століття вже було активним — прибираємо його з масиву
      updatedCenturies = updatedCenturies.filter(c => c !== centuryValue);
    } else {
      // Якщо не було — додаємо
      updatedCenturies.push(centuryValue);
    }

    // Повертаємо об'єкт для властивості `to` у компонента <Link>.
    // getSearchWith автоматично збереже стать, пошук, сортування тощо.
    return {
      search: getSearchWith(searchParams, { centuries: updatedCenturies }),
    };
  };

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => {
            const isActive = activeCenturies.includes(century);

            return (
              <Link
                key={century}
                data-cy="century"
                // Якщо століття активне, додаємо клас is-info, інакше забираємо
                className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                to={getHref(century)}
              >
                {century}
              </Link>
            );
          })}
        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className={`button is-success ${
              activeCenturies.length > 0 ? 'is-outlined' : ''
            }`}
            to={getHref(null)}
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
};

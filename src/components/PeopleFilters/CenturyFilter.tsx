// .. CenturyFilter.tsx
import { useSearchParams } from 'react-router-dom';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();

  // Отримуємо всі обрані століття як масив рядків
  const activeCenturies = searchParams.getAll('centuries');
  const currentSex = searchParams.get('sex');
  const currentQuery = searchParams.get('query');

  const getHref = (centuryValue: string | null) => {
    const params = new URLSearchParams();

    // Зберігаємо стать та пошуковий запит, якщо вони є
    if (currentSex) {
      params.set('sex', currentSex);
    }

    if (currentQuery) {
      params.set('query', currentQuery);
    }

    if (centuryValue !== null) {
      let updatedCenturies = [...activeCenturies];

      if (updatedCenturies.includes(centuryValue)) {
        updatedCenturies = updatedCenturies.filter(c => c !== centuryValue);
      } else {
        updatedCenturies.push(centuryValue);
      }

      updatedCenturies.forEach(c => params.append('centuries', c));
    }

    const queryString = params.toString();

    return queryString ? `#/people?${queryString}` : '#/people';
  };

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => {
            const isActive = activeCenturies.includes(century);

            return (
              <a
                key={century}
                data-cy="century"
                // Якщо століття активне, додаємо клас is-info, інакше забираємо
                className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                href={getHref(century)}
              >
                {century}
              </a>
            );
          })}
        </div>

        <div className="level-right ml-4">
          <a
            data-cy="centuryALL"
            className={`button is-success ${activeCenturies.length > 0 ? 'is-outlined' : ''}`}
            href={getHref(null)}
          >
            All
          </a>
        </div>
      </div>
    </div>
  );
};

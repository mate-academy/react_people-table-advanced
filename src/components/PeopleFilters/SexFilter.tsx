// .. SexFilter.tsx
// import { useSearchParams } from 'react-router-dom';

// export const SexFilter = () => {
//   const [searchParams] = useSearchParams();
//   const activeSex = searchParams.get('sex');

//   return (
//     <>
//       <p className="panel-tabs" data-cy="SexFilter">
//         <a className={activeSex === null ? 'is-active' : ''} href="#/people">
//           All
//         </a>
//         <a
//           className={activeSex === 'm' ? 'is-active' : ''}
//           href="#/people?sex=m"
//         >
//           Male
//         </a>
//         <a
//           className={activeSex === 'f' ? 'is-active' : ''}
//           href="#/people?sex=f"
//         >
//           Female
//         </a>
//       </p>
//     </>
//   );
// };
import { useSearchParams } from 'react-router-dom';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const activeSex = searchParams.get('sex');

  // Дістаємо поточний query, щоб не загубити його при переході
  const currentQuery = searchParams.get('query');

  // Функція-помічник, яка створює чистий рядок параметрів для href
  const getHref = (sexValue: string | null) => {
    const params = new URLSearchParams();

    if (sexValue) {
      params.set('sex', sexValue);
    }

    if (currentQuery) {
      params.set('query', currentQuery);
    }

    // Якщо параметрів немає — повертаємо просто шлях, інакше додаємо знак "?"
    const queryString = params.toString();

    return queryString ? `#/people?${queryString}` : '#/people';
  };

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <a className={activeSex === null ? 'is-active' : ''} href={getHref(null)}>
        All
      </a>
      <a className={activeSex === 'm' ? 'is-active' : ''} href={getHref('m')}>
        Male
      </a>
      <a className={activeSex === 'f' ? 'is-active' : ''} href={getHref('f')}>
        Female
      </a>
    </p>
  );
};

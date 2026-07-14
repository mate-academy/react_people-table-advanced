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
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const activeSex = searchParams.get('sex');

  const getHref = (sexValue: string | null) => {
    return {
      pathname,
      search: getSearchWith(searchParams, { sex: sexValue || null }),
    };
  };

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <Link
        className={activeSex === null ? 'is-active' : ''}
        to={getHref(null)}
      >
        All
      </Link>
      <Link className={activeSex === 'm' ? 'is-active' : ''} to={getHref('m')}>
        Male
      </Link>
      <Link className={activeSex === 'f' ? 'is-active' : ''} to={getHref('f')}>
        Female
      </Link>
    </p>
  );
};

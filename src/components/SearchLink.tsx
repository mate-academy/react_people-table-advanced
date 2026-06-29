import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * Щоб замінити стандартне `Link`, ми беремо всі його властивості, крім `to`
 * разом із власною властивістю `params`, яку ми використовуємо для оновлення пошуку
 */
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

/**
 * SearchLink оновлює задані `params` у пошуку, зберігаючи `pathname`
 * та інші існуючі параметри пошуку (див. `getSearchWith`)
 */
export const SearchLink: React.FC<Props> = ({
  children, // це вміст між відкриваючим та закриваючим тегами
  params, // параметри, які потрібно оновити в `search`
  ...props // усі звичайні властивості посилань, такі як `className`, `style` та `id`
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      // to={{ search: getSearchWith(searchParams, { query: 'sdf' }) }}
      // to={{ search: getSearchWith(searchParams, { query: null }) }}
      // to={{ search: getSearchWith(searchParams, { centuries: ['16', '18'] }) }}
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props} // скопіювати всі інші пропси
    >
      {children}
    </Link>
  );
};

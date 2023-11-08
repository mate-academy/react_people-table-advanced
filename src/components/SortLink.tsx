import classNames from 'classnames';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the the standard `Link` we take all it props except for `to`
 * along with the custom `params` prop that we use for updating the search
 */
type Props = Omit<LinkProps, 'to'> & {
  params: string,
};

/**
 * SearchLink updates the given `params` in the search keeping the `pathname`
 * and the other existing search params (see `getSearchWith`)
 */
export const SortLink: React.FC<Props> = ({
  children, // this is the content between the open and closing tags
  params, // the params to be updated in the `search`
  ...props // all usual Link props like `className`, `style` and `id`
}) => {
  const [searchParams] = useSearchParams();

  const newParams: SearchParams = {};

  const currentSortParam = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  if (params !== currentSortParam) {
    newParams.sort = params;
  }

  if (params === currentSortParam
    && currentOrder === null) {
    newParams.order = 'desc';
  }

  if (currentSortParam === params && currentOrder) {
    newParams.order = null;
    newParams.sort = null;
  }

  if (currentSortParam !== params && currentOrder) {
    newParams.order = null;
    newParams.sort = params;
  }

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {children}
        <Link
          to={{
            search: getSearchWith(searchParams, newParams),
          }}
          {...props} // copy all the other props
        >
          <span className="icon">
            <i className={classNames(
              'fas',
              { 'fa-sort': currentSortParam !== params },
              { 'fa-sort-up': currentSortParam === params && !currentOrder },
              { 'fa-sort-down': currentSortParam === params && currentOrder },
            )}
            />
          </span>
        </Link>
      </span>
    </th>
  );

  // return (
  //   <Link
  //     // to={{ search: getSearchWith(searchParams, { query: 'sdf' }) }}
  //     // to={{ search: getSearchWith(searchParams, { query: null }) }}
  //     // to={{ search: getSearchWith(searchParams, { centuries: ['16', '18'] }) }}
  //     to={{
  //       search: getSearchWith(searchParams, params),
  //     }}
  //     {...props} // copy all the other props
  //   >
  //     {children}
  //   </Link>
  // );
};

import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the the standard `Link` we take all it props except for `to`
 * along with the custom `params` prop that we use for updating the search
 */
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams,
};

/**
 * SearchLink updates the given `params` in the search keeping the `pathname`
 * and the other existing search params (see `getSearchWith`)
 */
export const SearchLink: React.FC<Props> = ({
  children, // this is the content between the open and closing tags
  params, // the params to be updated in the `search`
  ...props // all usual Link props like `className`, `style` and `id`
}) => {
  const [searchParams] = useSearchParams();
  let currentCenturies = searchParams.getAll('centuries');

  const newParams = params;

  if (newParams.centuries
      && typeof newParams.centuries === 'string') {
    // let newCenturies = currentCenturies;

    if (currentCenturies.includes(newParams.centuries)) {
      currentCenturies = currentCenturies
        .filter(elem => elem !== newParams.centuries);

      newParams.centuries = currentCenturies.length ? currentCenturies : null;
    } else {
      currentCenturies.push(newParams.centuries);
      newParams.centuries = currentCenturies;
    }
  }

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props} // copy all the other props
    >
      {children}
    </Link>
  );
};

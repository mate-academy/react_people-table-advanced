import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

/**
 * Custom Link component that handles search params manipulation
 *
 * @param {ReactNode} children - Content to be rendered inside the link
 * @param {SearchParams} params - New search params to be applied
 * @param {boolean} [preserveParams=true] - Whether to preserve existing search params
 * @param {...LinkProps} props - All standard Link props (except 'to')
 */

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  preserveParams?: boolean; // Nova prop para controle
};

/**
 * SearchLink updates the given `params` in the search while optionally preserving
 * the existing search parameters. It extends React Router's Link component.
 *
 * @example
 * // Preserves existing params and adds/updates new ones
 * <SearchLink params={{ page: '2' }}>Next Page</SearchLink>
 *
 * @example
 * // Replaces all existing params with new ones
 * <SearchLink params={{ filter: 'active' }} preserveParams={false}>
 *   Show Active Only
 * </SearchLink>
 */

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  preserveParams = true, // Valor padrão
  ...props
}) => {
  const [searchParams] = useSearchParams();

  // Objeto de busca final
  const search = preserveParams
    ? getSearchWith(searchParams, params)
    : getSearchWith(new URLSearchParams(), params);

  return (
    <Link to={{ search }} {...props}>
      {children}
    </Link>
  );
};

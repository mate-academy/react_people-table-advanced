import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../utils/SearchLink';

type Props = {
  sortField: string;
};

export const SortLink: React.FC<Props> = ({ sortField }) => {
  const [searchParams] = useSearchParams();

  const getSortField = searchParams.get('sort') || '';
  const getIsReversed = searchParams.get('oder') === 'desc';

  const params = {
    sort: (getSortField === sortField && getIsReversed) ? null : sortField,
    oder: (getSortField === sortField && !getIsReversed) ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i className={classNames('fas', {
          'fa-sort': sortField !== getSortField,
          'fa-sort-up': getSortField === sortField && !getIsReversed,
          'fa-sort-down': getSortField === sortField && getIsReversed,
        })}
        />
      </span>
    </SearchLink>
  );
};

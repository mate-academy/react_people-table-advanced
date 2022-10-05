import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  option: string;
};

export const DescOrder: React.FC<Props> = ({ option }) => {
  const { search } = useLocation();
  const sortOption = option.toLowerCase();

  return (
    <SearchLink
      params={
        search.includes(`sort=${sortOption}`)
          ? {
            sort: null,
            order: null,
          }
          : {
            sort: sortOption,
            order: null,
          }
      }
    >
      <span className="icon">
        <i className={classNames(
          'fas fa-sort',
          {
            'fa-sort-down': search.includes('&order=desc' && `sort=${sortOption}`),
          },
        )}
        />
      </span>
    </SearchLink>
  );
};

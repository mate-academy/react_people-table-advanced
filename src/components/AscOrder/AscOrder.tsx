import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  option: string;
};

export const AscOrder: React.FC<Props> = ({ option }) => {
  const { search } = useLocation();
  const sortOption = option.toLowerCase();

  return (
    <SearchLink
      params={
        search.includes(`=${sortOption}`)
          ? {
            sort: sortOption,
            order: 'desc',
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
            'fa-sort-up':
          search.includes(`=${sortOption}`),
          },
        )}
        />
      </span>
    </SearchLink>
  );
};

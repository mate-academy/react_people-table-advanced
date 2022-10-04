import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  option: string;
};

export const SortOption: React.FC<Props> = ({ option }) => {
  const location = useLocation();

  return (
    <th>
      <span
        className="is-flex is-flex-wrap-nowrap"
      >
        {option}
        {location.search.includes('&order=desc')
          ? (
            <SearchLink
              params={
                location.search.includes(`sort=${option.toLowerCase()}`)
                  ? {
                    sort: null,
                    order: null,
                  }
                  : {
                    sort: option.toLowerCase(),
                    order: null,
                  }
              }
            >
              <span className="icon">
                <i className={classNames(
                  'fas fa-sort',
                  {
                    'fa-sort-down':
                    location.search.includes('&order=desc' && `sort=${option.toLowerCase()}`),
                  },
                )}
                />
              </span>
            </SearchLink>
          )
          : (
            <SearchLink
              params={
                location.search.includes(`=${option.toLowerCase()}`)
                  ? {
                    sort: option.toLowerCase(),
                    order: 'desc',
                  }
                  : {
                    sort: option.toLowerCase(),
                    order: null,
                  }
              }
            >
              <span className="icon">
                <i className={classNames(
                  'fas fa-sort',
                  {
                    'fa-sort-up':
                    location.search.includes(`=${option.toLowerCase()}`),
                  },
                )}
                />
              </span>
            </SearchLink>
          )}
      </span>
    </th>
  );
};

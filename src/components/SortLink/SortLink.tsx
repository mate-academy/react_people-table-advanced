import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  fieldName: string;
  isDesc: boolean;
  isActive: boolean;
};

export const SortLink: React.FC<Props> = ({
  fieldName,
  isDesc,
  isActive,
}) => {
  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {fieldName}
        <SearchLink params={{
          sort: isActive && isDesc ? null : fieldName.toLowerCase(),
          order: isActive && !isDesc ? 'desc' : null,
        }}
        >
          <span className="icon">
            <i className={classNames('fas', {
              'fa-sort': !isActive,
              'fa-sort-up': isActive && !isDesc,
              'fa-sort-down': isActive && isDesc,
            })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};

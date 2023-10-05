import { useTableHeader } from './useTableHeader';
import { SearchLink } from './SearchLink';

type Props = {
  name: string,
};

export const TableHeader = ({
  name,
}: Props) => {
  const { isSortName, isOrder, sortIcon } = useTableHeader();

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {name}
        <SearchLink
          params={{
            sort: isSortName(name),
            order: isOrder(name),
          }}
        >
          <span className="icon">
            <i className={sortIcon(name)} />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};

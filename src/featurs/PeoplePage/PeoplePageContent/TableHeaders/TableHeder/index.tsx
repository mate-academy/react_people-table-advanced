import { usePeoplePageContext } from '../../../../../context/PeoplePageContext';
import { useTableHeader } from './useTableHeader';

type Props = {
  name: string,
  onClick: () => void,
};

export const TableHeader = ({
  name,
  onClick,
}: Props) => {
  const { sortField, isReversed } = usePeoplePageContext();
  const { sortIcon, getHref } = useTableHeader();

  const sortClassName = sortIcon(name, sortField, isReversed);
  const href = getHref(name, isReversed);

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {name}
        <a
          href={href}
          onClick={onClick}
        >
          <span className="icon">
            <i className={sortClassName} />
          </span>
        </a>
      </span>
    </th>
  );
};

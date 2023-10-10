import cn from 'classnames';

type Props = {
  sortHandler: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    arg: string
  ) => void;
  order: {
    category: string;
    type: string;
  };
  name: string;
};
export const CategoryName: React.FC<Props> = ({ sortHandler, order, name }) => {
  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {name.charAt(0).toUpperCase() + name.slice(1)}
        <a href={`?sort=${name}`} onClick={(e) => sortHandler(e, name)}>
          <span className="icon">
            <i
              className={cn('fas', {
                'fa-sort': order.category !== name,
                'fa-sort-up': order.category === name && !order.type,
                'fa-sort-down': order.category === name && order.type,
              })}
            />
          </span>
        </a>
      </span>
    </th>
  );
};

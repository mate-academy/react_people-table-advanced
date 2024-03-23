interface Props {
  item: string;
  canAddIcon: (item: string) => boolean;
}

export const TableHeadItem: React.FC<Props> = ({ item, canAddIcon }) => {
  return (
    <th>
      {canAddIcon(item) ? (
        <span className="is-flex is-flex-wrap-nowrap">
          {item}
          <a href="#/people?sort=name">
            <span className="icon">
              <i className="fas fa-sort" />
            </span>
          </a>
        </span>
      ) : (
        item
      )}
    </th>
  );
};

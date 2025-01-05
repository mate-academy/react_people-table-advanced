export const MenuItemTable = () => {
  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        Name
        <a href="#/people?sort=name">
          <span className="icon">
            <i className="fas fa-sort" />
          </span>
        </a>
      </span>
    </th>
  );
};

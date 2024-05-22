export const TableTitle = () => {
  const titleParam: string[] = ['Name', 'Sex', 'Born', 'Died'];

  return titleParam.map(title => (
    <th key={title}>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <a href="#/people?sort=died">
          <span className="icon">
            <i className="fas fa-sort" />
          </span>
        </a>
      </span>
    </th>
  ));
};

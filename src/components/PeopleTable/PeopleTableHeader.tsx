import classNames from 'classnames';

type Props = {
  handleSelectSort: (field: string) => void;
  currentOrder: string;
  currentSort: string;
};

export const PeopleTableHeader: React.FC<Props> = ({
  handleSelectSort,
  currentOrder,
  currentSort,
}) => {
  const classForSort = (sortBy: string) => {
    return classNames('fas', {
      'fa-sort': currentSort !== sortBy,
      'fa-sort-up': currentSort === sortBy && currentOrder !== 'desc',
      'fa-sort-down': currentSort === sortBy && currentOrder === 'desc',
    });
  };

  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <a onClick={() => handleSelectSort('name')}>
              <span className="icon">
                <i className={classForSort('name')} />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <a onClick={() => handleSelectSort('sex')}>
              <span className="icon">
                <i className={classForSort('sex')} />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <a onClick={() => handleSelectSort('born')}>
              <span className="icon">
                <i className={classForSort('born')} />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <a onClick={() => handleSelectSort('died')}>
              <span className="icon">
                <i className={classForSort('died')} />
              </span>
            </a>
          </span>
        </th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};

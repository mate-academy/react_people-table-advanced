import { Link } from 'react-router-dom';

export const TableHead: React.FC = () => {
  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <Link to="#/people?sort=name">
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </Link>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <Link to="#/people?sort=sex">
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </Link>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <Link to="#/people?sort=born&amp;order=desc">
              <span className="icon">
                <i className="fas fa-sort-up" />
              </span>
            </Link>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <Link to="#/people?sort=died">
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </Link>
          </span>
        </th>

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};

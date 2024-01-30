import { Link } from "react-router-dom";
import { customSearchHelper } from "../../../utils/customSearchHelper";

export const SortingLayout = ({
  searchParams,
}) => {

  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <Link
              to={customSearchHelper(searchParams, { sort: 'name' })}
            >
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </Link>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <Link to={customSearchHelper(searchParams, { sort: 'sex' })}>
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </Link>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <Link to={customSearchHelper(searchParams, { sort: 'born' })}>
              <span className="icon">
                <i className="fas fa-sort-up" />
              </span>
            </Link>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <Link to={customSearchHelper(searchParams, { sort: 'died' })}>
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

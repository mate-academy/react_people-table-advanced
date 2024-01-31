import { Link } from "react-router-dom";
import { getSearch } from "../../../utils/customSearchHelper";

export const SortingLayout = ({
  searchParams,
  setSearchParams,
}) => {
  const setSearchWith = (params) => {
    const search = getSearch(params, searchParams);

    setSearchParams(search);
  };

  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <Link
              to={setSearchWith({ sort: 'name' })}
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
            <Link to={setSearchWith({ sort: 'sex' })}>
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </Link>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <Link to={setSearchWith({ sort: 'born' })}>
              <span className="icon">
                <i className="fas fa-sort-up" />
              </span>
            </Link>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <Link to={setSearchWith({ sort: 'died' })}>
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

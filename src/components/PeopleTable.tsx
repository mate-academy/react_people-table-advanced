import {
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({ people, searchParams }) => {
  const { human } = useParams();
  const navigate = useNavigate();

  const linkHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    slug: string,
  ) => {
    e.preventDefault();
    navigate(`../${slug}?${searchParams.toString()}`);
  };

  const parentLink = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = people.find((obj) => obj.name === name);

    if (!parent) {
      return name;
    }

    return (
      <Link
        to={`/people/${parent.slug}`}
        className={cn({ 'has-text-danger': parent.sex === 'f' })}
        onClick={e => linkHandler(e, parent.slug)}
      >
        {name}
      </Link>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
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

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(
          ({
            slug, name, sex, born, died, motherName, fatherName,
          }) => {
            return (
              <tr
                key={slug}
                data-cy="person"
                className={cn({ 'has-background-warning': slug === human })}
              >
                <td>
                  <Link
                    to={`/people/${slug}`}
                    className={cn({ 'has-text-danger': sex === 'f' })}
                    onClick={e => linkHandler(e, slug)}
                  >
                    {name}
                  </Link>
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>{parentLink(motherName)}</td>
                <td>{parentLink(fatherName)}</td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};

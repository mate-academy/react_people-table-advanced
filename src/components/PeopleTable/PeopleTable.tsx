import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getSortIcon, getSortLink } from '../../utils/sortHelper';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

type Role = 'father' | 'mother';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  const parent = (person: Person, role: Role) => {
    const parentName =
      role === 'father' ? person.fatherName : person.motherName;
    const parentInList = people.find(p => p.name === parentName);

    if (!parentName) {
      return '-';
    }

    if (parentInList) {
      return <PersonLink person={parentInList} />;
    }

    return parentName;
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
              <Link to={getSortLink(searchParams, 'name')}>
                <span className="icon">
                  <i className={getSortIcon(sort, order, 'name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortLink(searchParams, 'sex')}>
                <span className="icon">
                  <i className={getSortIcon(sort, order, 'sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortLink(searchParams, 'born')}>
                <span className="icon">
                  <i className={getSortIcon(sort, order, 'born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortLink(searchParams, 'died')}>
                <span className="icon">
                  <i className={getSortIcon(sort, order, 'died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            className={slug === person.slug ? 'has-background-warning' : ''}
            key={person.slug}
            data-cy="person"
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{parent(person, 'mother')}</td>
            <td>{parent(person, 'father')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import getSearchWith from '../utils/getSearchWith';

type Props = {
  people: Person[];
  allPeople: Person[];
};

const COLUMNS = [
  { key: 'name', title: 'Name' },
  { key: 'sex', title: 'Sex' },
  { key: 'born', title: 'Born' },
  { key: 'died', title: 'Died' },
];

export const PeopleTable: React.FC<Props> = ({ people, allPeople }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const currentSort = searchParams.get('sort');
  const isDesc = searchParams.get('order') === 'desc';

  const renderParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = allPeople.find(person => person.name === name);

    return parent ? <PersonLink person={parent} /> : name;
  };

  const getSortParams = (key: string) => {
    if (currentSort !== key) {
      return { sort: key, order: null };
    }

    if (!isDesc) {
      return { sort: key, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(({ key, title }) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <Link
                  to={{
                    search: getSearchWith(getSortParams(key), searchParams),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': currentSort !== key,
                        'fa-sort-up': currentSort === key && !isDesc,
                        'fa-sort-down': currentSort === key && isDesc,
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(person.motherName)}</td>
            <td>{renderParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

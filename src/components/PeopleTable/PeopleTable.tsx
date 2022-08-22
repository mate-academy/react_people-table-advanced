import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonName } from '../PersonName';
import './PeopleTable.scss';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');
  let callback: (a: Person, b: Person) => number;

  switch (sortBy) {
    case 'name':
    case 'sex':
      callback = (a: Person, b: Person) => a[sortBy].localeCompare(b[sortBy]);
      break;

    case 'born':
    case 'died':
      callback = (a: Person, b: Person) => a[sortBy] - b[sortBy];
      break;

    default:
      callback = () => 0;
  }

  const flag = sortOrder === 'desc' ? -1 : 1;

  people.sort((p1, p2) => callback(p1, p2) * flag);

  const handleName = (person: Person | undefined, name: string | null) => {
    if (person) {
      return <PersonName person={person} />;
    }

    return <span className="not-link">{name || '-'}</span>;
  };

  const handleSort
  = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
    searchParams.set('sortBy', e.currentTarget.dataset.name || '');
    searchParams.set('sortOrder', sortOrder === 'asc' ? 'desc' : 'asc');
    setSearchParams(searchParams);
  };

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-bordered
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth
      "
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(item => (
            <th
              key={item}
              data-name={item.toLowerCase()}
              className={classNames('sorting-title', {
                'sort-both': sortBy !== item.toLowerCase(),
                'sort-asc': sortBy === item.toLowerCase()
                  && sortOrder === 'asc',
                'sort-desc': sortBy === item.toLowerCase()
                  && sortOrder === 'desc',
              })}
              onClick={handleSort}
            >
              {item}
              <span
                className={classNames({
                  hidden: sortBy !== item.toLowerCase(),
                })}
              >
                *
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
            className={
              classNames({
                'has-background-warning': slug === person.slug,
              })
            }
          >
            <td>
              <PersonName person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {handleName(person.mother, person.motherName)}
            </td>
            <td>
              {handleName(person.father, person.fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

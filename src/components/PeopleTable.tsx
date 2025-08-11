import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import cn from 'classnames';

type SortClass = {
  name: string;
  sex: string;
  born: string;
  died: string;
};

type Params = {
  filteredPeople: Person[];
  sortClass: SortClass;
  handleChangeButton: (arg: keyof Person) => void;
};

export const PeopleTable: React.FC<Params> = ({
  filteredPeople,
  handleChangeButton,
  sortClass,
}) => {
  const { slug } = useParams();

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
              <a>
                <span
                  className="icon"
                  onClick={() => handleChangeButton('name')}
                >
                  <i className={`fas ${sortClass.name}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a>
                <span
                  className="icon"
                  onClick={() => handleChangeButton('sex')}
                >
                  <i className={`fas ${sortClass.sex}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a>
                <span
                  className="icon"
                  onClick={() => handleChangeButton('born')}
                >
                  <i className={`fas ${sortClass.born}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a>
                <span
                  className="icon"
                  onClick={() => handleChangeButton('died')}
                >
                  <i className={`fas ${sortClass.died}`} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const mother =
            filteredPeople.find(p => p.name === person.motherName) || null;
          const motherSlug = mother ? mother.slug : null;

          const father =
            filteredPeople.find(p => p.name === person.fatherName) || null;
          const fatherSlug = father ? father.slug : null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <Link
                  to={`../${person.slug}`}
                  className={cn('', {
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {motherSlug ? (
                  <Link className="has-text-danger" to={`../${motherSlug}`}>
                    {person.motherName || '-'}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {fatherSlug ? (
                  <Link to={`../${fatherSlug}`}>
                    {person.fatherName || '-'}
                  </Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

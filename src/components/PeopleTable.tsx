import { Link } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParamsHelper } from '../store/ParamsContext';
import { useFilter } from '../store/filterContext';

export const PeopleTable = () => {
  const { visiblePeople } = useFilter();
  const { getIcon, toogleSort } = useParamsHelper();

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
              <Link to={`/people${toogleSort('name')}`}>
                <span className="icon">
                  <i className={`fas ${getIcon('name')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={`/people${toogleSort('sex')}`}>
                <span className="icon">
                  <i className={`fas ${getIcon('sex')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={`/people${toogleSort('born')}`}>
                <span className="icon">
                  <i className={`fas ${getIcon('born')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={`/people${toogleSort('died')}`}>
                <span className="icon">
                  <i className={`fas ${getIcon('died')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map((person: Person) => {
          return <PersonLink key={person.slug} person={person} />;
        })}
      </tbody>
    </table>
  );
};

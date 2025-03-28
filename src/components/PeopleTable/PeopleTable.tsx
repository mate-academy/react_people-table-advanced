import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
// import { useSearchParams } from 'react-router-dom';

import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  people: Person[] | null;
}

export const PeopleTable = ({ people }: Props) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
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
              {people?.map(person => {
                return (
                  <tr
                    key={person.slug}
                    className={cn({
                      'has-background-warning': person.slug === slug,
                    })}
                    data-cy="person"
                  >
                    <td>
                      <PersonLink name={person.name} people={people} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      <PersonLink name={person.motherName} people={people} />
                    </td>
                    <td>
                      <PersonLink name={person.fatherName} people={people} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

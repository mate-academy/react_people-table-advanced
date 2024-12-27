import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { Sex } from '../types';
import { SortCategory } from '../types/SortCategory';

interface Props {
  people: Person[];
}
export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;

  const peopleWithParents = people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName) || null;
    const father = people.find(dad => dad.name === person.fatherName) || null;

    return { ...person, mother, father };
  });
  const isInTheList = (name: string | null) => {
    if (name === null) {
      return false;
    }

    return people.some(person => person.name === name);
  };

  const { slug } = useParams();

  // fa-sort-up fa-sort-down
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortByCategory = (
    category: SortCategory,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (params.get('sort') === category) {
      if (params.get('order') === 'desc') {
        params.delete('sort');
        params.delete('order');
      } else {
        params.set('order', 'desc');
      }
    } else {
      params.set('sort', category);
      params.delete('order');
    }

    setSearchParams(params);
  };

  const sortIconChange = (category: SortCategory) => {
    if (searchParams.get('sort') === category) {
      return searchParams.get('order') === 'desc'
        ? 'fa-sort-down'
        : 'fa-sort-up';
    }

    return 'fa-sort';
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
              <a
                href="#/people?sort=name"
                onClick={event => {
                  handleSortByCategory(SortCategory.Name, event);
                }}
              >
                <span className="icon">
                  <i className={cn('fas', sortIconChange(SortCategory.Name))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={event => handleSortByCategory(SortCategory.Sex, event)}
              >
                <span className="icon">
                  <i className={cn('fas', sortIconChange(SortCategory.Sex))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={event =>
                  handleSortByCategory(SortCategory.Born, event)
                }
              >
                <span className="icon">
                  <i className={cn('fas', sortIconChange(SortCategory.Born))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={event =>
                  handleSortByCategory(SortCategory.Died, event)
                }
              >
                <span className="icon">
                  <i className={cn('fas', sortIconChange(SortCategory.Died))} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleWithParents.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({ 'has-background-warning': person.slug === slug })}
          >
            <td>
              <NavLink
                className={cn({
                  'has-text-danger': person.sex === Sex.Female,
                })}
                to={`${person.slug}`}
              >
                {person.name}
              </NavLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {isInTheList(person.motherName) ? (
                <NavLink
                  to={`${person.mother?.slug}`}
                  className={'has-text-danger'}
                >
                  {person.motherName}
                </NavLink>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {isInTheList(person.fatherName) ? (
                <NavLink to={`${person.father?.slug}`}>
                  {person.fatherName}
                </NavLink>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

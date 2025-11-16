import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { Order, Person, SortField } from '../types';

type Props = {
  people: Person[];
  slug: Person['slug'] | undefined;
  currentSortField: SortField | null;
  currentOrder: Order | null;
  onSearchChange: (sortField: SortField) => void;
};
/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  people,
  slug,
  currentSortField,
  currentOrder,
  onSearchChange,
}) => {
  const showParent = (parentName: string | null) => {
    if (parentName === null) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return <PersonLink person={parent} />;
    } else {
      return parentName;
    }
  };

  const getSortIconClass = (field: SortField) => {
    if (currentSortField !== field) {
      return 'fas fa-sort';
    }

    return currentOrder === Order.DESC ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const handleSortClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    field: SortField,
  ) => {
    event.preventDefault();
    onSearchChange(field);
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
                onClick={e => handleSortClick(e, SortField.NAME)}
              >
                <span className="icon">
                  <i className={getSortIconClass(SortField.NAME)} />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={e => handleSortClick(e, SortField.SEX)}
              >
                <span className="icon">
                  <i className={getSortIconClass(SortField.SEX)} />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born"
                onClick={e => handleSortClick(e, SortField.BORN)}
              >
                <span className="icon">
                  <i className={getSortIconClass(SortField.BORN)} />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={e => handleSortClick(e, SortField.DIED)}
              >
                <span className="icon">
                  <i className={getSortIconClass(SortField.DIED)} />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{showParent(person.motherName)}</td>
            <td>{showParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

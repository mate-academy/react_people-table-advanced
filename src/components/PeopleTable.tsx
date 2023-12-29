import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { Person, TableColumn } from '../types';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { NoCurCriteria } from './NoCurCriteria';

interface Props {
  people:Person[];
  sort: string;
  order: string;
  setSearchWith: (value: SearchParams) => void;
}
const COLUMNS:TableColumn[] = [
  { id: 1, title: 'Name', columnCode: 'name' },
  { id: 2, title: 'Sex', columnCode: 'sex' },
  { id: 3, title: 'Born', columnCode: 'born' },
  { id: 4, title: 'Died', columnCode: 'died' },
];

export const PeopleTable:React.FC<Props> = ({ people, sort, order }) => {
  const { personSlug } = useParams();

  const setSort = (value: string) => {
    if (!sort) {
      return { sort: value, order: null };
    }

    if (sort && !order) {
      return { sort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    !people.length
      ? (<NoCurCriteria />)
      : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>

              {COLUMNS.map(({ id, title, columnCode }) => (
                <th key={id}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {title}
                    <SearchLink params={setSort(columnCode)}>
                      <span className="icon">
                        <i className={cn('fas',
                          {
                            'fa-sort': columnCode !== sort,
                            'fa-sort-up': !order && sort === columnCode,
                            'fa-sort-down': sort === columnCode && order,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
              ))}
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map((person) => {
              const {
                slug,
                sex,
                born,
                died,
                motherName,
                fatherName,
              } = person;
              const mother = people
                .find(({ name }) => name === motherName);
              const father = people
                .find(({ name }) => name === fatherName);

              return (
                <tr
                  key={slug}
                  data-cy="person"
                  className={cn(
                    { 'has-background-warning': slug === personSlug },
                  )}
                >
                  <td aria-label="Person link">
                    <PersonLink person={person} />
                  </td>

                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>

                  <td>
                    { mother
                      ? (
                        <PersonLink person={mother} />

                      ) : (
                        motherName || '-'
                      )}
                  </td>

                  <td>
                    {father
                      ? (
                        <PersonLink person={father} />
                      ) : (
                        fatherName || '-'
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )
  );
};

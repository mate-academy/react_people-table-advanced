import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[],
  sort: string | null,
  order: string | null,
}

export const PeopleTable: React.FC<Props> = ({
  people,
  sort,
  order,
}) => {
  const { slug } = useParams();
  const isSelected = (persone: Person) => persone.slug === slug;
  const getParams = (par: string) => ({
    sort: sort === par && order === 'desc' ? null : par,
    order: (sort === par && order === 'desc')
    || (sort === null && order === null) || sort !== par
      ? null
      : 'desc',
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(title => {
            const titleToLoewrCase = title.toLowerCase();

            return (
              <th key={title}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <SearchLink
                    params={getParams(`${titleToLoewrCase}`)}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas', {
                          'fa-sort':
                          (!sort && !order) || (sort !== titleToLoewrCase),
                          'fa-sort-up': sort === titleToLoewrCase && !order,
                          'fa-sort-down': order && sort === titleToLoewrCase,
                        },
                      )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(persone => {
          const {
            name,
            born,
            died,
            fatherName,
            motherName,
          } = persone;

          const isMotherPersone
                  = people?.find(per => per.name === motherName) || null;

          const isFatherPersone
                  = people?.find(per => per.name === fatherName) || null;

          const parentCell
                  = (someName: string | null, somePersone: Person | null) => {
                    return someName ? (
                      <td>
                        {somePersone
                          ? <PersonLink person={somePersone} />
                          : someName}
                      </td>
                    ) : <td>-</td>;
                  };

          return (
            <tr
              data-cy="person"
              key={name}
              className={classNames(
                { 'has-background-warning': isSelected(persone) },
              )}
            >
              <td>
                <PersonLink person={persone} />
              </td>
              <td>{persone.sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {parentCell(motherName, isMotherPersone)}
              {parentCell(fatherName, isFatherPersone)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

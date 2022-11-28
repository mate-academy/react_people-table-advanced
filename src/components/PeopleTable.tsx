import classNames from 'classnames';
import { FC, useContext } from 'react';
import { Person } from '../types';
import { ParentLink } from './PeopleLinks/ParentLink';
import { PersonLink } from './PeopleLinks/PersonLink';
import { slugContext } from './slugContext';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  visiblePeople: Person[],
};

export const PeopleTable: FC<Props> = ({ people, visiblePeople }) => {
  const { selectedSlug } = useContext(slugContext);

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {['Name', 'Sex', 'Born', 'Died'].map((title) => (
              <th key={title}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <SearchLink
                    params={{ sort: title.toLowerCase() }}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
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
          {visiblePeople.map((person) => {
            const {
              name, sex, born, died, fatherName, motherName, slug,
            } = person;

            const selectedMother = people.find(el => {
              return el.name === motherName;
            });

            const selectedFather = people.find(el => {
              return el.name === fatherName;
            });

            return (
              <tr
                data-cy="person"
                key={slug}
                className={classNames(
                  { 'has-background-warning': slug === selectedSlug },
                )}
              >
                <td>
                  <PersonLink
                    slug={slug}
                    sex={sex}
                    name={name}
                  />
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {selectedMother
                    ? (
                      <ParentLink
                        sex={sex}
                        parentName={motherName}
                        selectedParent={selectedMother}
                      />
                    )
                    : <div>{motherName || '-'}</div>}
                </td>
                <td>
                  {selectedMother
                    ? (
                      <ParentLink
                        sex={sex}
                        parentName={fatherName}
                        selectedParent={selectedFather}
                      />
                    )
                    : <div>{fatherName || '-'}</div>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

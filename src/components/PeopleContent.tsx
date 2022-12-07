import classNames from 'classnames';
import { useContext } from 'react';
import { Person } from '../types';
import { ParentLink } from './Links/ParentLink';
import { PersonLink } from './Links/PersonLink';
import { slugContext } from './slugContext';

type Props = {
  sortedPeople: Person[],
  people: Person[],
};

export const PeopleContent = ({
  sortedPeople,
  people,
}: Props) => {
  const { selectedSlug } = useContext(slugContext);

  return (
    <>
      {sortedPeople.map((person) => {
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
              {selectedMother ? (
                <ParentLink
                  sex={sex}
                  parentName={motherName}
                  selectedParent={selectedMother}
                />
              ) : (
                <div>{motherName || '-'}</div>
              )}
            </td>
            <td>
              {selectedFather ? (
                <ParentLink
                  sex={sex}
                  parentName={fatherName}
                  selectedParent={selectedFather}
                />
              ) : (
                <div>{fatherName || '-'}</div>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
};

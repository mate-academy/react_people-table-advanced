import { useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import PersonLink from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  handleSorting: (
    event: React.MouseEvent<HTMLAnchorElement>,
    category: string,
  ) => void;
  sortArrows: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  handleSorting,
  sortArrows,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { slug } = useParams();

  const getIconStyle = (category: string) => {
    const baseClassName = 'fas fa-sort';
    let suffix = '';

    if (sortArrows === 'up' && category === selectedCategory) {
      suffix = '-up';
    } else if (sortArrows === 'down' && category === selectedCategory) {
      suffix = '-down';
    }

    return cn({
      [`${baseClassName}${suffix}`]: suffix !== '',
      [`${baseClassName}`]: suffix === '',
    });
  };

  const handleNameSort = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleSorting(event, 'name');
    setSelectedCategory('name');
  };

  const handleSexSort = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleSorting(event, 'sex');
    setSelectedCategory('sex');
  };

  const handleBornSort = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleSorting(event, 'born');
    setSelectedCategory('born');
  };

  const handleDiedSort = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleSorting(event, 'died');
    setSelectedCategory('died');
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
              {/* eslint-disable jsx-a11y/anchor-is-valid */}
              <a
                onClick={handleNameSort}
                href="#"
                style={{ cursor: 'pointer' }}
              >
                <span className="icon">
                  <i className={getIconStyle('name')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#" onClick={handleSexSort}>
                <span className="icon">
                  <i className={getIconStyle('sex')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#" onClick={handleBornSort}>
                <span className="icon">
                  <i className={getIconStyle('born')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#" onClick={handleDiedSort}>
                <span className="icon">
                  <i className={getIconStyle('died')} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const renderParent = (parentName: string | null) => {
            const parentObj = people.find(pers => pers.name === parentName);

            if (parentObj) {
              return <PersonLink person={parentObj} />;
            }

            return parentName || '-';
          };

          const personSlug = `${person?.name.toLowerCase().replace(/\s+/g, '-')}-${person?.born}`;

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={cn({
                'has-background-warning': personSlug === slug,
              })}
            >
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>{renderParent(person.motherName)}</td>

              <td>{renderParent(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

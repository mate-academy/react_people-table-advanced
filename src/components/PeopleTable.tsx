import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Person } from "../types";

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const [clickedSlug, setClickedSlug] = useState<string | null>(null);

  const handleLinkClick = (slug: string) => {
    setClickedSlug(slug);
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
        {people.map((person) => {
          const motherRow = people.find((p) => p.name === person.motherName);
          const fatherRow = people.find((p) => p.name === person.fatherName);

          const shouldHighlight = (p: Person) => {
            if (clickedSlug === p.slug) return true;
            if (motherRow?.slug === p.slug || fatherRow?.slug === p.slug) {
              return true;
            }
            return false;
          };

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={shouldHighlight(person) ? "has-background-warning" : ""}
            >
              {/* Name */}
              <td>
                <Link
                  to={`../${person.slug}`}
                  className={person.sex === "f" ? "has-text-danger" : ""}
                  onClick={() => handleLinkClick(person.slug)}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              {/* Mother */}
              {person.motherName ? (
                motherRow ? (
                  <td>
                    <Link
                      to={`../${motherRow.slug}`}
                      className="has-text-danger"
                      onClick={() => handleLinkClick(motherRow.slug)}
                    >
                      {person.motherName}
                    </Link>
                  </td>
                ) : (
                  <td className="has-text-grey">{person.motherName}</td>
                )
              ) : (
                <td className="has-text-grey">-</td>
              )}

              {/* Father */}
              {person.fatherName ? (
                fatherRow ? (
                  <td>
                    <Link
                      to={`../${fatherRow.slug}`}
                      onClick={() => handleLinkClick(fatherRow.slug)}
                    >
                      {person.fatherName}
                    </Link>
                  </td>
                ) : (
                  <td className="has-text-grey">{person.fatherName}</td>
                )
              ) : (
                <td className="has-text-grey">-</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

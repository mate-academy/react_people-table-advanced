import React from 'react';
import { Link } from 'react-router-dom';
import type { Person } from '../types';

type Props = {
  people: PersonRow[];
  selectedSlug: string | null;
};

type PersonRow = Person & {
  sex?: 'm' | 'f' | string;
  born?: number;
  died?: number;
  motherName?: string | null;
  fatherName?: string | null;
  slug?: string;
};

const SELECTED = 'has-background-warning';

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const byName = React.useMemo(() => {
    const map = new Map<string, PersonRow[]>();

    people.forEach(p => {
      const key = (p.name || '').trim();

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)!.push(p);
    });

    return (name?: string | null): PersonRow | undefined => {
      if (!name) {
        return undefined;
      }

      const arr = map.get(name.trim());

      return arr?.[0];
    };
  }, [people]);

  return (
    <div data-cy="peopleTable">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map((p, idx) => {
            const isSelected = !!selectedSlug && p.slug === selectedSlug;

            const mother = byName(p.motherName ?? null);
            const father = byName(p.fatherName ?? null);

            const personLink = p.slug ? (
              <Link
                to={`/people/${p.slug}`}
                className={p.sex === 'f' ? 'has-text-danger' : undefined}
              >
                {p.name}
              </Link>
            ) : (
              p.name
            );

            const motherCell = p.motherName ? (
              mother && mother.slug ? (
                <Link to={`/people/${mother.slug}`} className="has-text-danger">
                  {mother.name}
                </Link>
              ) : (
                <>{p.motherName}</>
              )
            ) : (
              <>-</>
            );

            const fatherCell = p.fatherName ? (
              father && father.slug ? (
                <Link to={`/people/${father.slug}`}>{father.name}</Link>
              ) : (
                <>{p.fatherName}</>
              )
            ) : (
              <>-</>
            );

            return (
              <tr
                key={p.slug ?? `${p.name}-${idx}`}
                data-cy="person"
                className={isSelected ? SELECTED : undefined}
              >
                <td>{personLink}</td>
                <td>{p.sex ?? ''}</td>
                <td>{p.born ?? ''}</td>
                <td>{p.died ?? ''}</td>
                <td>{motherCell}</td>
                <td>{fatherCell}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

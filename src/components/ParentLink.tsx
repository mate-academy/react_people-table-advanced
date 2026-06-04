import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type ParentLinkProps = {
  parent: Person | undefined;
  parentName: string | null;
};

export function ParentLink({ parent, parentName }: ParentLinkProps) {
  return (
    <td>
      {!parentName && '-'}

      {parentName && !parent && parentName}

      {parentName && parent && (
        <Link
          to={`/people/${parent.slug}`}
          className={classNames({
            'has-text-danger': parent.sex === 'f',
          })}
        >
          {parent.name}
        </Link>
      )}
    </td>
  );
}

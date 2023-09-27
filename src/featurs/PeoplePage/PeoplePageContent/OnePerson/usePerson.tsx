import { Link } from 'react-router-dom';
import { Person } from '../../../../types';

export const usePerson = () => {
  const getParentSlug = (people:Person[], parentName: string | null) => {
    const parent = people.find(p => p.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={parent.sex === 'f' ? 'has-text-danger' : ''}

        >
          {parent.name}
        </Link>
      );
    }

    return parentName || '-';
  };

  return {
    getParentSlug,
  };
};

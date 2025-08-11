import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { useEffect, useRef } from 'react';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const personRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/people/${person.slug}?${searchParams.toString()}`);
  };

  const findPersonByName = (name: string | null) => {
    return people.find(p => p.name === name);
  };

  const mother = findPersonByName(person.motherName);
  const father = findPersonByName(person.fatherName);

  useEffect(() => {
    if (slug === person.slug && personRef?.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // eslint-disable-next-line no-console
          console.log('entry.isIntersecting', entry.isIntersecting);
        },
        {
          root: null, // viewport
          rootMargin: '0px', // no margin
          threshold: 0.5, // 50% of target visible
        },
      );

      if (personRef.current) {
        observer.observe(personRef.current);
      }

      personRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [slug, personRef, person.slug]);

  return (
    <tr
      ref={personRef}
      data-cy="person"
      key={person.slug}
      className={slug === person.slug ? 'has-background-warning' : ''}
      onClick={handleClick}
    >
      <td>
        <Link
          className={person.sex === 'f' ? 'has-text-danger' : ''}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link className={'has-text-danger'} to={`/people/${mother.slug}`}>
            {person.motherName}
          </Link>
        ) : (
          <p>{person.motherName || '-'}</p>
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{person.fatherName}</Link>
        ) : (
          <p>{person.fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};

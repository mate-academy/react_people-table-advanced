import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person, Sex } from '../types';

export type PersonLinkProps = {
  person: Person;
  people: Person[]
};

export type SelectedSlugParams = {
  personSlug: string;
};

export const PersonLink = ({ person, people }: PersonLinkProps) => {
  const {
    slug, name, sex, born, died, motherName, fatherName,
  } = person;
  const { personSlug } = useParams<SelectedSlugParams>();
  const [searchParams] = useSearchParams();

  const findParent = (parentName: string) => {
    const parent = people?.find((item) => item.name === parentName);

    if (parent) {
      return (
        <Link to={`/people/${parent.slug}`} className={classNames({ 'has-text-danger': parent.sex === Sex.Female })}>
          {parent.name}
        </Link>
      );
    }

    return (
      <>
        { parentName }
      </>
    );
  };

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link to={`/people/${slug}?${searchParams.toString()}`} className={classNames({ 'has-text-danger': sex === Sex.Female })}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName ? findParent(motherName) : '-'}</td>
      <td>{fatherName ? findParent(fatherName) : '-'}</td>
    </tr>
  );
};

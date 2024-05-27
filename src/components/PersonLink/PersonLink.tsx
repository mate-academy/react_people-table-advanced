import classNames from "classnames";
import { Link, useSearchParams } from "react-router-dom";
import { Person } from "../../types";

type Props = {
    person: Person;
  };
  
  export const PersonLink: React.FC<Props> = ({ person }) => {
    const { slug, sex, name } = person;
    const [searchParams] = useSearchParams();
  
    return (
      <Link
        to={{
          pathname: `/people/${slug}`,
          search: searchParams.toString(),
        }}
        className={classNames({ 'has-text-danger': sex === 'f' })}
      >
        {name}
      </Link>
    );
  };
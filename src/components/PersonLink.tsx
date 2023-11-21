import cn from 'classnames';

type Props = {
  name: string | null,
  slug: string,
  sex: string,
};

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  return (
    <a
      href={`#/people/${slug}`}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </a>
  );
};

// import { Link, useSearchParams } from 'react-router-dom';
// import cn from 'classnames';

// type Props = {
//   name: string | null,
//   slug: string,
//   sex: string,
// };

// export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
//   const [searchParams] = useSearchParams();

//   return (
//     <Link
//       to={{
//         pathname: `#/people/${slug}`,
//         search: searchParams.toString(),
//       }}
//       className={cn({
//         'has-text-danger': sex === 'f',
//       })}
//     >
//       {name}
//     </Link>
//   );
// };

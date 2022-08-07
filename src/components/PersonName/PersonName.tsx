import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import ScrollIntoView from 'react-scroll-into-view';

type Props = {
  person: Person,
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const { personId } = useParams();
  const { search } = useLocation();

  return (
    <ScrollIntoView
      selector={`#${person.slug}`}
      smooth
      scrollOptions={{
        block: 'center',
      }}
    >
      <Link
        to={
          personId === person.slug
            ? { pathname: '/people', search }
            : { pathname: `/people/${person.slug}`, search }
        }
        style={
          {
            color: person.sex === 'm'
              ? 'rgb(0, 71, 171)' : 'rgb(255, 0, 0)',
          }
        }
      >
        {person.name}
      </Link>
    </ScrollIntoView>
  );
};

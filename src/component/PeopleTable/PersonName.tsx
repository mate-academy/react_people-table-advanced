import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ScrollIntoView from 'react-scroll-into-view';

type Props = {
  personName: string;
  slug: string | undefined;
};

export const PersonName: React.FC<Props> = React.memo(({ personName, slug = '' }) => {
  const { search } = useLocation();

  return (
    <ScrollIntoView
      selector={`#${slug}`}
      scrollOptions={{
        block: 'nearest',
        behavior: 'auto',
      }}
    >
      <Link
        to={`${slug}${search}`}
      >
        {personName}
      </Link>
    </ScrollIntoView>
  );
});

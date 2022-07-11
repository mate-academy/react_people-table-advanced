import React from 'react';
import PropTypes from 'prop-types';
import ScrollIntoView from 'react-scroll-into-view';
import { Link, useLocation } from 'react-router-dom';
import './PersonName.scss';
import classNames from 'classnames';

export const PersonName = ({ personData }) => {
  const { search } = useLocation();

  return (
    <ScrollIntoView
      selector={`#${personData.slug}`}
      smooth
      scrollOptions={{
        block: 'center',
      }}
    >
      <Link
        to={{
          pathname: `/people/${personData.slug}`,
          search,
        }}
        className={classNames(personData.sex === 'm' ? 'male' : 'female')}
      >
        {personData.name}
      </Link>
    </ScrollIntoView>
  );
};

PersonName.propTypes = {
  personData: PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
};

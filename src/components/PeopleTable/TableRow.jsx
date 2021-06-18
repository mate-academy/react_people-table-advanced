import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Father } from './Father';
import { Mother } from './Mother';
import { personProps } from './personProps';

export const TableRow = React.memo(
  ({ person, selectedSlug, isEven }) => {
    const {
      name,
      sex,
      born,
      died,
      fatherName,
      motherName,
      slug,
      father,
      mother,
    } = person;

    const fatherSlug = father ? father.slug : '';
    const motherSlug = mother ? mother.slug : '';

    const { search } = useLocation();

    return (
      <tr
        id={slug}
        className={classNames(
          'people-section__table-row',
          {
            'people-section__table-row--even': isEven,
            'people-section__table-row--highlight--m':
              selectedSlug === slug && sex === 'm',

            'people-section__table-row--highlight--f':
              selectedSlug === slug && sex === 'f',
          },
        )}
      >
        <td className="people-section__table-cell">
          <Link
            to={`/people/${slug}${search}#${slug}`}
            className="people-section__table-link"
          >
            {name}
          </Link>
        </td>
        <td
          className="
            people-section__table-cell
            people-section__table-cell--align
       ">
          {sex}
        </td>
        <td
          className="
            people-section__table-cell
            people-section__table-cell--align
       ">
          {born}
        </td>
        <td
          className="
            people-section__table-cell
            people-section__table-cell--align
       ">
          {died}
        </td>
        <td
          className={classNames(
            'people-section__table-cell',
            { 'people-section__table-cell--error': !fatherName },
          )}
        >
          <Father fatherName={fatherName} fatherSlug={fatherSlug} />
        </td>
        <td
          className={classNames(
            'people-section__table-cell',
            { 'people-section__table-cell--error': !motherName },
          )}
        >
          <Mother motherName={motherName} motherSlug={motherSlug} />
        </td>
      </tr>
    );
  },
);

TableRow.propTypes = {
  person: personProps.isRequired,
  selectedSlug: PropTypes.string.isRequired,
  isEven: PropTypes.bool.isRequired,
};

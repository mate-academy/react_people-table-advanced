import PropTypes from 'prop-types';

const PersonShape = (...args) => (
  // eslint-disable-next-line no-useless-call
  PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
    mother: PersonShape,
    father: PersonShape,
  }).call(null, ...args)
);

export const PersonType = PersonShape;

import PropTypes from 'prop-types';

export const personProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number,
  fatherName: PropTypes.string,
  motherName: PropTypes.string,
  slug: PropTypes.string.isRequired,
  father: PropTypes.object,
  mother: PropTypes.object,
});

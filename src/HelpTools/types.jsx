import PropTypes from 'prop-types';

export const UserType = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  motherName: PropTypes.string,
  fatherName: PropTypes.string,
  slug: PropTypes.string.isRequired,
  mother: PropTypes.UserType,
  father: PropTypes.UserType,
};

export const PersonNameType = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

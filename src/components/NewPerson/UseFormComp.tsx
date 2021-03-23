import { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import debounce from 'lodash/debounce';

import {
  FormField, FieldError,
  EventInput,
  EventForm,
  AddPerson, Person,
} from '../../utils/type';

import {
  validateOnSubmit,
  validateOnChange, checkPersonInList,
} from '../../utils/addFunctions';

const useForm = (
  onAddPerson: AddPerson, people: Person [],
) => {
  const form: FormField = {
    name: '',
    sex: 'm',
    died: '0',
    born: '0',
    mother: '',
    father: '',
  };
  const err: FieldError = {
    name: '',
    sex: '',
    died: '',
    born: '',
    submit: '',
  };
  const [values, setValues] = useState(form);
  const [errors, setErrors] = useState(err);
  const [disabledBornField, setDisabledField] = useState(false);
  const [disbledParentField, setdisabledParentField] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const match = useRouteMatch();

  const applyQuery = useCallback(
    debounce((queryName: string, event: EventInput) => {
      const { value } = event.target;

      if (queryName === 'born') {
        const disbdFieldFlag = (value === '');

        setDisabledField(disbdFieldFlag);
        setdisabledParentField(disbdFieldFlag);
      }

      setErrors(current => ({ ...current, [queryName]: validateOnChange(event) }));
    }, 500), [],
  );

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      if (checkPersonInList(values, people)) {
        setErrors(current => {
          return { ...current, submit: 'Person exists' };
        });

        return;
      }

      onAddPerson(values);
      history.push({
        pathname: `${match.url}`,
        search: searchParams.toString(),
      });
      setValues(form);
    }
  }, [errors]);

  const handleSubmit = (event: EventForm) => {
    if (event) {
      event.preventDefault();
    }

    setErrors(validateOnSubmit(values));
    setIsSubmitting(true);
  };

  const handleChange = (event: EventInput) => {
    event.persist();
    const { name, value } = event.target;

    if (errors[name]) {
      setErrors(current => {
        return { ...current, [name]: '' };
      });
    }

    setValues(current => ({ ...current, [name]: value }));
    applyQuery(name, event);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    disabledBornField,
    disbledParentField,
  };
};

export default useForm;

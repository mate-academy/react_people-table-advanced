// export const validateName = name.match(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u);
// export const validateBorn = +born >= 1400 && +born <= 2021 && born.length > 0;
// export const validateDied = +died <= 2021 && +died >= +born && died.length > 0;
// export const age = +died - +born;
// export const validateAge = age >= 0 && age <= 150;

export const validateName = (name) => {
  return name.match(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u);
};

export const validateDied = (born, died) => {
  return +died <= 2021 && +died >= +born && died.length > 0;
};

export const validateBorn = (born) => {
  return +born >= 1400 && +born <= 2021 && born.length > 0;
};

export const validateAge = (born, died) => {
  const age = +died - +born;

  return age >= 0 && age <= 150;
};

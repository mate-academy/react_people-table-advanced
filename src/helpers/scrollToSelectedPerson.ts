export const scrollToSelectedPerson = (personSlug: string) => {
  const selectedPerson = document.getElementById(personSlug);

  if (selectedPerson) {
    selectedPerson.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

// enum ErrorMessages {
//   LoadingError = "Something went wrong",
//   NoPeopleError = "There are no people on the server",
//   NoMatchingPeopleError = "There are no people matching the current search criteria",
// }

// type Props = {
//   loadingError?: string;
//   noPeopleError?: string;
//   noMatchError?: string;
// }

// export const ErrorMessage: React.FC<Props> = ( {loadingError, noPeopleError, noMatchError} ) => {
//   return (
//     <>
//     {loadingError && <p data-cy="peopleLoadingError">{ErrorMessages.LoadingError}</p>}
//     {noPeopleError && <p data-cy="noPeopleMessage">{ErrorMessages.NoPeopleError}</p>}
//     {noMatchError && <p>{ErrorMessages.NoMatchingPeopleError}</p>}
//     </>
//   )
// }

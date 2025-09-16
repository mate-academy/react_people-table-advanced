export type InitStateType = {
  error: string | null;
  alarm: string | null;
};

export type Actions =
  | { type: 'setErrorMessage'; message: string | null }
  | { type: 'setAlarmMessage'; message: string | null };

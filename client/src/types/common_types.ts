export type CommonSignupValues = {
  email: string;
  firstName: string;
  secondName: string;
  password: string;
};

export type MainLoaderStatus =
  | 'idle'
  | 'registering'
  | 'logging-in'
  | 'creating'
  | 'editing'
  | 'adding'
  | 'deleting';

export type LoggedinUserResponseType = {
  userID: string;
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  maritalStatus: string;
  profileImage: string;
};
export type CommonSignupValues = {
  email: string;
  firstName: string;
  secondName: string;
  password: string;
};

export type CommonLoginValues = {
  email: string;
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

export type LoggedinUserResponseType = {
  _id: string;
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
  lastName: string;
  password: string;
};

export type CommonLoginValues = {
  email: string;
  password: string;
};
export type CommonEditProfileFormValues = {
  firstName: string;
  lastName: string;
  age: string;
  maritalStatus?: string;
};

export type MainLoaderStatus =
  | 'idle'
  | 'registering'
  | 'logging-in'
  | 'creating'
  | 'editing'
  | 'adding'
  | 'deleting';

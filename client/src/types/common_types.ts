export type LoggedinUserResponseType = {
  userID: string;
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  maritalStatus: string;
  profileImage: string;
  profileImagePublicID: string;
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
export type CommonBlogFormValues = {
  title: string;
  keyWord: string;
  content: string;
};
export type BlogPostingValues = {
  userID: string;
  blogID?: string;
  title: string;
  image: string;
  content: string;
};

export type MainLoaderStatus =
  | 'idle'
  | 'registering'
  | 'logging-in'
  | 'loading-profile'
  | 'uploading-profile-image'
  | 'creating'
  | 'editing'
  | 'adding'
  | 'deleting';

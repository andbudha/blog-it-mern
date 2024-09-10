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
  keyWord?: string;
  content: string;
};
export type BlogPostingValues = {
  user: string;
  title: string;
  image: string;
  content: string;
};
export type EditBlogPostingValues = {
  blogID: string;
  title: string;
  content: string;
};

export type BlogLikingValues = {
  blogID: string;
  userID: string;
};
export type CommentaryValues = {
  _id?: string;
  blogID: string;
  userID: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  commentary: string;
  createdAt?: Date;
};

export type EditCommentaryValues = {
  blogID: string;
  commentaryID: string;
  newCommentary: string;
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
  | 'deleting'
  | 'fetching';

export type DataLoaderStatus =
  | 'idle'
  | 'posting'
  | 'fetching'
  | 'loading'
  | 'deleting'
  | 'editing'
  | 'rating';

//Response Types
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
export type UserResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
};

export type BlogResponse = {
  _id: string;
  user: UserResponse;
  title: string;
  image: string;
  content: string;
  likes: string[];
  comments: CommentaryValues[];
  createdAt: Date;
};
export type BlogsResponseValues = {
  message: string;
  blogs: BlogResponse[];
};

export type FavoriteBlogResponseValues = {
  _id: string;
  user: string;
  title: string;
  image: string;
  content: string;
  likes: string[];
};

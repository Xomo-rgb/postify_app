export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type RootStackParamList = {
  Home: undefined;
  CreatePost: undefined;
  EditPost: { post: Post };
};

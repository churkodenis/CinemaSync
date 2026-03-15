export type Film = {
  id: string;
  title: string;
  description: string;
  duration: number;
  places: number;
  time: string;
  price: string;
  createdAt: string;
  tags: string[];
  imageUrl?: string;
};

export type FilmDetails = {
  id: string;
  title: string;
  description: string;
  duration: number;
  places: number;
  time: string;
  price: string;
  createdAt: string;
  tags: string[];
  imageUrl?: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  username: string;
};
export type User = {
  id: string;
  username: string;
  email: string;
  roles: string[];
};
export type SignUpResponse = {
  user: User;
  token: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignInResponse = {
  user: User;
  token: string;
};

export type TokenPayload = {
  token: string;
};
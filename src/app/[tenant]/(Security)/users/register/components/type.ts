interface IAuthParams {
  token: string | null;
  userId: string | null;
  slug: string | null;
}

interface IResetPassword extends IAuthParams {
  password: string;
}
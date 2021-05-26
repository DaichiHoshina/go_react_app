export type TLike = {
  id?: number | null;
  user_id?: number | null;
  presentation_id?: number | null;
};

export type TLikeState = {
  like?: TLike | null;
  likes?: Array<TLike> | null;
  loading: boolean;
  error: boolean;
  errorMessage: string;
};

export const initialState: TLikeState = {
  like: null,
  likes: [],
  loading: false,
  error: false,
  errorMessage: "",
};

export interface GetOwnersListParams {
  filter?: {
    lastName: string;
  };
  meta?: any;
  signal?: AbortSignal;
}

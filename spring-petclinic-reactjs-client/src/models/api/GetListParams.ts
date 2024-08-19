export interface GetListParams {
  filter?: {
    lastName: string;
  };
  meta?: any;
  signal?: AbortSignal;
}

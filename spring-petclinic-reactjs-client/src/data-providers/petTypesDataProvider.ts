import { CreateResult, DataProvider, fetchUtils, UpdateResult, DeleteResult, GetOneResult } from "react-admin";

const apiUrl = import.meta.env.VITE_SPRING_PETCLINIC_REST_API_URL;

const httpClient = fetchUtils.fetchJson;

export default {
  create: async () => Promise.resolve<CreateResult>({ data: null }),
  delete: () => Promise.resolve<DeleteResult>({ data: null }),
  deleteMany: () => Promise.resolve({ data: [] }),
  getList: async (resource, { signal }) => {
    const url = new URL(`${apiUrl}/${resource}`);

    const { json } = await httpClient(url, { signal });
    return {
      data: json,
      total: json ? json.length : 0
    };
  },
  getMany: () => Promise.resolve({ data: [] }),
  getManyReference: () => Promise.resolve({ data: [], total: 0 }),
  getOne: () => Promise.resolve<GetOneResult>({ data: null }),
  update: () => Promise.resolve<UpdateResult>({ data: null }),
  updateMany: () => Promise.resolve({ data: [] })
} as DataProvider;

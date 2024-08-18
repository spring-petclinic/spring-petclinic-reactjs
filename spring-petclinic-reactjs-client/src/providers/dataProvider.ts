import { combineDataProviders, DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";
import HTTPMethod from "http-method-enum";
import { OWNERS } from "../constants/Resources";

const apiUrl = import.meta.env.VITE_SPRING_PETCLINIC_REST_API_URL;

const httpClient = fetchUtils.fetchJson;

const ownersDataProvider: DataProvider = {
  getList: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;

    const { json } = await httpClient(url, { signal: params.signal });
    return {
      data: json,
      total: json ? json.length : 0
    };
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, { signal: params.signal });
    return { data: json };
  },

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ ids: params.ids })
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, { signal: params.signal });
    return { data: json };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id
      })
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, { signal: params.signal });
    return {
      data: json,
      total: json ? json.length : 0
    };
  },

  create: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: HTTPMethod.POST,
      body: JSON.stringify(params.data)
    });
    return { data: json };
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: HTTPMethod.PUT,
      body: JSON.stringify(params.data)
    });

    return { data: json };
  },

  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids })
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, {
      method: HTTPMethod.PUT,
      body: JSON.stringify(params.data)
    });
    return { data: json };
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: HTTPMethod.DELETE
    });
    return { data: json };
  },

  deleteMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids })
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, {
      method: HTTPMethod.DELETE
    });
    return { data: json };
  }
};

const dataProviders = combineDataProviders((resource) => {
  switch (resource) {
    case OWNERS:
      return ownersDataProvider;
    default:
      throw new Error(`Unknown resource: ${resource}`);
  }
});

export default dataProviders;

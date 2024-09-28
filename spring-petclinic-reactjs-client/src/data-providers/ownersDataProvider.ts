import { fetchUtils, UpdateResult } from "react-admin";
import { GetOwnersListParams } from "@models/api/GetOwnersListParams";
import { LAST_NAME } from "@constants/searchParams";
import { stringify } from "query-string";
import HTTPMethod from "http-method-enum";
import { OwnersDataProvider } from "@models/api/OwnersDataProvider";
import { PETS } from "@constants/resources";

const apiUrl = import.meta.env.VITE_SPRING_PETCLINIC_REST_API_URL;

const httpClient = fetchUtils.fetchJson;

export default {
  getList: async (resource, { filter, signal }: GetOwnersListParams) => {
    const url = new URL(`${apiUrl}/${resource}`);

    const searchParams = new URLSearchParams();
    if (filter?.lastName) {
      searchParams.append(LAST_NAME, filter?.lastName);
      url.search = searchParams.toString();
    }

    const { json } = await httpClient(url, { signal });
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
    await httpClient(url, {
      method: HTTPMethod.PUT,
      body: JSON.stringify(params.data)
    });

    return Promise.resolve<UpdateResult>({ data: { id: params.id } });
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
  },
  createPet: async (resource: string, { meta: { ownerId }, data }) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${ownerId}/${PETS}`, {
      method: HTTPMethod.POST,
      body: JSON.stringify(data)
    });
    return { data: json };
  },
  getPet: async (resource: string, { id, meta: { petId } }) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${id}/${PETS}/${petId}`, {
      method: HTTPMethod.GET
    });

    return { data: json };
  },
  // TODO: create endpoint handler to edit pet owner
  editPet: async (resource: string, { meta: { ownerId }, data: { petId, ...body } }) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${ownerId}/${PETS}/${petId}`, {
      method: HTTPMethod.PUT,
      body: JSON.stringify(body)
    });

    return { data: json };
  }
} as OwnersDataProvider;

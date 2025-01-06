import { api as index } from "..";

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
  endpoints: (build) => ({
    postTodos: build.mutation<TIMER.postRes, TIMER.postReq>({
      query: (data) => ({
        url: `/${ENDPOINTS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    getTodos: build.query<TIMER.getRes, TIMER.getReq>({
      query: () => ({
        url: `/${ENDPOINTS}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    editTodos: build.mutation<TIMER.editRes, TIMER.editReq>({
      query: ({ id, data }) => ({
        url: `/${ENDPOINTS}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodos: build.mutation<TIMER.deleteRes, TIMER.deleteReq>({
      query: (id) => ({
        url: `/${ENDPOINTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  usePostTodosMutation,
  useGetTodosQuery,
  useEditTodosMutation,
  useDeleteTodosMutation,
} = api;

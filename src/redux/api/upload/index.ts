import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    uploadTodo: build.mutation<UPLOAD.uploadRes, UPLOAD.uplaodReq>({
      query: (data) => ({
        url: `/upload/file`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const { useUploadTodoMutation } = api;

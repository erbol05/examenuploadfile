"use client";
import scss from "./UploadGet.module.scss";
import { useUploadTodoMutation } from "@/redux/api/upload";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  useDeleteTodosMutation,
  useEditTodosMutation,
  useGetTodosQuery,
} from "@/redux/api/todo";

interface ITime {
  title: string;
  img: string[];
  year: string;
}

const UploadGet = () => {
  const { data } = useGetTodosQuery();
  const [editTodos] = useEditTodosMutation();
  const [uploadTodos] = useUploadTodoMutation();
  const [deleteTodos] = useDeleteTodosMutation();
  const { register, handleSubmit } = useForm<ITime>();
  const [editId, setEditId] = useState<number | null>(null);

  const onEditTime: SubmitHandler<ITime> = async (data) => {
    const file = data.img[0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: updateData } = await uploadTodos(formData);

    const newEdit = {
      title: data.title,
      img: updateData?.url!,
      year: data.year,
    };
    await editTodos({ id: editId!, data: newEdit });
    setEditId(null);
  };
  return (
    <section className={scss.UplaodGet}>
      <div className="container">
        <div className={scss.content}>
          {data?.map((el) =>
            el._id === editId ? (
              <form onSubmit={handleSubmit(onEditTime)} key={el._id}>
                <input
                  type="text"
                  placeholder="Edit Name"
                  {...register("title", { required: true })}
                />
                <input type="file" {...register("img", { required: true })} />
                <div className={scss.buttonser}>
                  <button type="submit">Edit</button>
                  <button
                    onClick={() => setEditId(null)}
                    className={scss.btncancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className={scss.blcok} key={el._id}>
                <img src={el.img} alt="img" width={200} height={300} />
                <h1>{el.title}</h1>
                <div className={scss.buttons}>
                  <button
                    onClick={() => {
                      setEditId(el?._id!);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className={scss.delbtn}
                    onClick={() => deleteTodos(el._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadGet;

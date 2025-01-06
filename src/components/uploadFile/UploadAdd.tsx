"use client";
import { usePostTodosMutation } from "@/redux/api/todo";
import scss from "./UploadAdd.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadTodoMutation } from "@/redux/api/upload";

interface ITime {
  title: string;
  year: string;
  img: string[];
}

const UploadAdd = () => {
  const [postTodos] = usePostTodosMutation();
  const [uploadTodo] = useUploadTodoMutation();
  const { register, handleSubmit, reset } = useForm<ITime>();

  const onUploadTodos: SubmitHandler<ITime> = async (data) => {
    const file = data.img[0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseData } = await uploadTodo(formData);

    const newData = {
      title: data.title,
      img: responseData?.url!,
      year: data.year,
    };
    await postTodos(newData);
    reset();
  };

  return (
    <section className={scss.UploadAdd}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit(onUploadTodos)}>
            <input
              type="text"
              placeholder="Name"
              {...register("title", { required: true })}
            />
            <input
              type="text"
              placeholder="Year"
              {...register("year", { required: true })}
            />
            <input type="file" {...register("img", { required: true })} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UploadAdd;

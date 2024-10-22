"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { RegisterOptions } from "react-hook-form";
import { addTodo, deleteTodo, editTodo } from "@/app/store/todoSlices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { v4 as uuidv4 } from "uuid";

const registerOptions: RegisterOptions = {
  required: true,
};

interface Todo {
  id: number; // Adjust type based on your actual ID type
  name: string;
}

interface FormData {
  id: number;
  name: string;
}

const Dashboard = () => {
  // states
  // const [todos, setTodos] = React.useState<Todo[]>([]);
  // console.log(todos);

  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [editingTodo, setEditingTodo] = React.useState<Todo | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      id: 0, // Generate unique ID
      name: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const user = localStorage.getItem("signup-user");
    if (user) {
      if (editingTodo) {
        dispatch(editTodo(data));
        setEditingTodo(null);
      } else {
        dispatch(addTodo({ ...data, id: uuidv4() }));
      }
      setValue("name", "");
      setValue("id", data.id);
    } else {
      alert("please login first");
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setValue("name", todo.name);
    setValue("id", todo.id);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest font-bold text-2xl">Todo List</h1>
            <form action="" className="mb-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex mt-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Todo Name"
                />
                {errors.name && <p>{errors.name.message}</p>}
                <button
                  type="submit"
                  className=" p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal w-32"
                >
                  {editingTodo ? "Edit Todo" : "Add Todo"}
                </button>
              </div>
            </form>
          </div>
          <div>
            <div className="flex mb-4 items-center">
              <table className="table w-full">
                <tr>
                  <th colSpan={8}>Item</th>
                  <th colSpan={2} className="text-end">
                    Action
                  </th>
                </tr>
                <tbody>
                  {todos.length ? (
                    todos.map((todo) => (
                      <tr key={todo.id}>
                        <td colSpan={8}>
                          <p className="w-full text-grey-darkest break-words">
                            {todo.name}
                          </p>
                        </td>
                        <td colSpan={2} className="text-end">
                          <button
                            onClick={() => handleDelete(todo.id)}
                            className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                          >
                            {/* Delete icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEdit(todo)}
                            className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                          >
                            {/* Edit icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center font-bold text-2xl">
                      <td colSpan={12}>
                        <h2 className="text-center">No Item here</h2>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

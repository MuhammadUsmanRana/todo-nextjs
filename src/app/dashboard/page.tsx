"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "@/app/store/todoSlices";
import store from "@/app/store/store";
import Image from "next/image";
import sidebarImage from "@/app/fonts/sidebar.jpg";

interface Todo {
  id: string | number; // Allow both string and number types
  name: string;
}

interface FormData {
  id: string | number;
  name: string;
}

const Dashboard = () => {
  const dispatch = useDispatch();
  type RootState = ReturnType<typeof store.getState>;
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [editingTodo, setEditingTodo] = React.useState<Todo | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      id: "", // Keep id as a string by default
      name: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const user = localStorage.getItem("signup-user");
    if (user) {
      if (editingTodo) {
        // Edit existing todo
        dispatch(editTodo({ ...data, id: Number(data.id) }));
        setEditingTodo(null);
      } else {
        // Add new todo with uuid as string id
        dispatch(addTodo({ ...data, id: Math.round(Math.random() * 1000) }));
      }
      setValue("name", "");
      setValue("id", ""); // Reset the id field
    } else {
      alert("Please login first");
    }
  };

  const handleDelete = (id: string | number) => {
    dispatch(deleteTodo(Number(id)));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setValue("name", todo.name);
    setValue("id", todo.id);
  };

  return (
    <section className="text-gray-600 body-font bg-black min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto flex flex-wrap">
        {/* Shopping List Section */}
        <div className="p-6 md:w-1/2 flex flex-col items-start">
          <div className="bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 rounded-lg shadow-xl p-6 w-full max-w-lg">
            <h1 className="text-white font-bold text-2xl mb-4">
              Shopping List
            </h1>
            <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-gray-700"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Title..."
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  {editingTodo ? "Edit" : "Add"}
                </button>
              </div>
            </form>

            {/* Todo List */}
            <ul className="w-full">
              {todos.length ? (
                todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex justify-between items-center text-white mb-2 bg-gray-900 rounded px-4 py-2"
                  >
                    <span>{todo.name}</span>
                    <div className="flex">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="text-yellow-500 hover:text-yellow-600 mx-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center text-white">No Items</li>
              )}
            </ul>
          </div>
        </div>

        {/* Map Section */}
        <div className="p-6 md:w-1/2 flex flex-col items-center">
          <Image
            src={sidebarImage}
            alt="Map"
            width={500}
            height={300}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

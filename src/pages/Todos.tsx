import { Suspense, useEffect, useState } from "react";
import { set, ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { useForm, SubmitHandler } from "react-hook-form";
import _ from "lodash";
import { v4 as uuid4 } from "uuid";
import { useUser } from "../store";
type InputType = {
  todos: string;
};

export default function Todos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();
  const [todo, setTodo] = useState<
    | {
        task: string;
        date: string;
        completed: boolean;
      }[]
    | null
  >(null);
  const user = useUser();
  const db = database;
  const todoRef = ref(db, `todos/${user}/all`);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    onValue(
      todoRef,
      (snapshot) => {
        const data = snapshot.val();
        setTodo(data);
      },
      (error) => {
        console.log({ error });
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit: SubmitHandler<InputType> = (data) => {
    let numberOfTodos = 0;
    const nonCompletedRef = ref(db, `todos/${user}/non-completed`);
    let numberOfNonCompletedRef = 0;
    onValue(
      todoRef,
      (snapshot) => {
        const data = snapshot.val();
        setTodo(data);
        numberOfTodos = _.toArray(data).length;
      },
      (error) => {
        console.log({ error });
      },
    );
    onValue(
      nonCompletedRef,
      (snapshot) => {
        const data = snapshot.val();
        numberOfNonCompletedRef = _.toArray(data).length;
      },
      (error) => {
        console.log({ error });
      },
    );
    set(ref(db, `todos/${user}/all/${numberOfTodos}`), {
      task: data.todos,
      date: "4-13-2024",
      completed: false,
    });
    set(ref(db, `todos/${user}/non-completed/${numberOfNonCompletedRef}`), {
      task: data.todos,
      date: "4-13-2024",
      completed: false,
    });
  };
  function handleChange(index: number) {
    //add logic for checking the check box here

    if (todo) {
      const updatedTodo = [...todo];
      updatedTodo[index].completed = !updatedTodo[index].completed;
      setTodo(updatedTodo);
      const completedTodos = updatedTodo.filter((value) => value.completed);
      const nonCompletedTodos = updatedTodo.filter((value) => !value.completed);
      set(ref(db, `todos/${user}/completed`), completedTodos);
      set(ref(db, `todos/${user}/non-completed`), nonCompletedTodos);
      set(ref(db, `todos/${user}/all`), updatedTodo);
    }
  }

  function handleDelete(index: number) {
    if (todo) {
      const newTodo = todo.filter((_value, idx) => idx !== index);
      const nonCompletedTodos = newTodo.filter((value) => !value.completed);
      const completedTodos = newTodo.filter((value) => value.completed);
      setTodo(newTodo);
      set(ref(db, `todos/${user}/all`), newTodo);
      set(ref(db, `todos/${user}/completed`), completedTodos);
      set(ref(db, `todos/${user}/non-completed`), nonCompletedTodos);
    }
  }

  return (
    <>
      <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("todos", { required: true })}
          className="text-white outline-none p-2 w-56 rounded bg-gray-500 mr-4"
        />
        {errors.todos?.type === "required" && (
          <h1 className="text-red-700 font-semibold large">
            Add a todo to submit
          </h1>
        )}
        <button type="submit" className="px-4 py-1 bg-teal-700 rounded">
          Submit
        </button>
      </form>
      <main>
        <Suspense fallback={<h1>loading</h1>}>
          {todo ? (
            <main className="flex flex-col justify-center mx-auto gap-5 w-2/5">
              {todo.map((value, index) => (
                <div
                  className="grid grid-cols-4 mt-10 gap-y-2 grid-rows-*"
                  key={uuid4()}
                >
                  <h1>{_.capitalize(value.task)}</h1>
                  <h1>{value.date}</h1>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="bg-gray-700 py-2 rounded"
                  >
                    Delete
                  </button>
                  <input
                    type="checkbox"
                    checked={value.completed}
                    onChange={() => handleChange(index)}
                  />
                </div>
              ))}
            </main>
          ) : (
            <h1 className="text-center">No todos yet</h1>
          )}
        </Suspense>
      </main>
    </>
  );
}

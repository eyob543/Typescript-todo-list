import { onValue, ref, set } from "firebase/database";
import { Suspense, useEffect, useState } from "react";
import { database } from "../firebase";
import { useUser } from "../store";
import { v4 as uuid4 } from "uuid";
export default function CompletedTodos() {
  const [todo, setTodo] = useState<
    | {
        task: string;
        completed: boolean;
        date: string;
      }[]
    | null
  >(null);
  const db = database;
  const user = useUser();

  const todoRef = ref(db, `todos/${user}/completed`);
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
      <Suspense fallback={<h1>Loading...</h1>}>
        <main className="flex flex-col w-1/5 mx-auto gap-y-4">
          {todo ? (
            todo.map((value, index) => (
              <section
                key={uuid4()}
                className="grid grid-cols-3 grid-row-* gap-5  place-content-center"
              >
                <p>{value.task}</p>
                <p>{value.date}</p>
                <button
                  type="button"
                  className="py-2 bg-gray-700 rounded"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </section>
            ))
          ) : (
            <h1>You have no completed todo's</h1>
          )}
        </main>
      </Suspense>
    </>
  );
}

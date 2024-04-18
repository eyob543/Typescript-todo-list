import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todos from "./pages/Todos";
import AuthRequired from "./components/AuthRequired";
import Layout from "./components/Layout";
import CompletedTodos from "./pages/CompletedTodos";
import NonCompletedTodos from "./pages/NonCompletedTodos";
import SignIn from "./pages/Sign-in";
function App() {
  const route = createBrowserRouter([
    {
      path: "sign-up",
      element: <SignIn />,
    },
    {
      element: <AuthRequired />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: "/",
              element: <Todos />,
            },
            {
              path: "/completed-todos",
              element: <CompletedTodos />,
            },
            {
              path: "/non-completed-todos",
              element: <NonCompletedTodos />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;

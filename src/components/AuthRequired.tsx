import { Link, Outlet } from "react-router-dom";
import { useTodos } from "../store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { SubmitHandler, useForm } from "react-hook-form";
type InputType = {
  email: string;
  password: string;
};
export default function AuthRequired() {
  const { isLoggedIn, setIsLoggedIn, setUser } = useTodos();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();
  if (!isLoggedIn) {
    const onSubmit: SubmitHandler<InputType> = (data) => {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          setUser(userCredential.user.displayName);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          alert(errorCode);
        });
    };
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-64 p-8 border-cyan-400 border-2 rounded h-80 mx-auto mt-48 justify-center bg-purple-300 gap-2"
      >
        <input
          type="email"
          className="p-2 rounded bg-gray-500 placeholder:text-white"
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <p
            className="text-red-600 text-lg text-center font-bold"
            role="alert"
          >
            Email is required
          </p>
        )}
        <input
          type="password"
          className="p-2 rounded bg-gray-500 placeholder:text-white"
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <p
            className="text-red-600 text-lg text-center font-bold"
            role="alert"
          >
            Password is required
          </p>
        )}
        <input
          type="submit"
          className="bg-blue-400 p-1 text-xl w-40 rounded mx-auto"
          value="Login"
        />
        <Link
          type="button"
          className="bg-blue-400 p-1 text-xl w-40 rounded text-center mx-auto"
          to="sign-up"
        >
          Sign Up
        </Link>
      </form>
    );
  }
  return <Outlet />;
}

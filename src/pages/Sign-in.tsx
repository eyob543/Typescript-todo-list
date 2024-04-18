import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useTodos } from "../store";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
type InputType = {
  email: string;
  password: string;
  userName: string;
};
export default function SignUp() {
  const { setIsLoggedIn, setUser } = useTodos();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit: SubmitHandler<InputType> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // userCredential.user.displayName = data.userName;
        setUser(userCredential.user.displayName);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  };

  return (
    <>
      <form
        className="flex flex-col max-w-64 gap-3 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
          className="rounded p-2 text-white bg-gray-600 placeholder:text-white"
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
          placeholder="password"
          {...register("password", { required: true })}
          className="rounded p-2 text-white bg-gray-600 placeholder:text-white"
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
          type="text"
          placeholder="User name"
          {...register("userName", { required: true })}
          className="rounded p-2 text-white bg-gray-600 placeholder:text-white"
        />
        {errors.userName?.type === "required" && (
          <p
            className="text-red-600 text-lg text-center font-bold"
            role="alert"
          >
            User name is required
          </p>
        )}
        <input
          className=" bg-cyan-900 p-1 py-2 text-lg rounded font-semibold w-44 mx-auto hover:cursor-pointer hover:bg-cyan-600"
          type="submit"
          value="Create an account"
        />
      </form>
    </>
  );
}

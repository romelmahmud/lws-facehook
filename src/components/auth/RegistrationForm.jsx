import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../common/Field";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const submitForm = async (formData) => {
    console.log(formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );
      if (response.status === 201) {
        //201 for user created status code

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };
  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", {
            required: "firstName is required",
          })}
          type="firstName"
          name="firstName"
          id="firstName"
          className={`auth-input ${
            errors.firstName ? "border-red-500" : "border-gray-200"
          }`}
        />
      </Field>
      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName")}
          type="lastName"
          name="lastName"
          id="lastName"
          className="auth-input  border-gray-200"
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", {
            required: "Email ID is required",
          })}
          type="email"
          name="email"
          id="email"
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
          name="password"
          id="password"
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}

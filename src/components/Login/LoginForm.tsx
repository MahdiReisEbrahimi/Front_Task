"use client";

import { useActionState } from "react";
import { getInputClass } from "@/helperFn/formValidation";
import { useLoadUsers } from "@/hooks/useLoadUsers";
import { User } from "@/store/userApi";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import Input from "../reusable/Input";
import PrintFormErrors from "@/components/reusable/PrintFormErrors";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import { loginAction } from "@/actions/login/login-action";

// Define the shape of form state used by useActionState
interface LoginState {
  errors: string[] | null;
  enteredValues: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function LoginForm({ onClose }: { onClose: () => void }) {
  // Load mock or remote users from the server or local cache
  const { users } = useLoadUsers();

  const dispatch = useDispatch();
  const router = useRouter();

  // useActionState is used to handle async form submissions in a stateful way
  const [formState, formAction] = useActionState<
    LoginState & { activeUser?: User | null },
    FormData
  >(
    // Call the loginAction with previous state, formData, and users list
    (prevState, formData) => loginAction(prevState, formData, users),
    {
      // Initial state
      errors: null,
      enteredValues: { firstName: "", lastName: "", email: "" },
    }
  );

  useEffect(() => {
    // When a valid user is returned, dispatch to redux and redirect
    if (formState.activeUser) {
      dispatch(login({ user: formState.activeUser }));
      onClose(); // Close the modal first
      setTimeout(() => {
        // Slight delay to allow modal animation before routing
        router.push(`/${formState.activeUser!.id}`);
      }, 200);
    }
  }, [formState.activeUser, dispatch, router]);

  return (
    <form
      action={formAction} // This connects to the useActionState logic
      className="bg-white p-6 rounded-sm shadow-xl w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-between">
        Login Form
        <button
          onClick={onClose} // Manually close the modal
          type="button"
          className="bg-red-500 cursor-pointer flex items-center ml-3 text-white font-bold p-2 text-sm rounded-sm"
        >
          Close
          <IoCloseSharp />
        </button>
      </h2>

      {/* Input for First Name */}
      <Input
        labelClassName=""
        defaultValue={formState.enteredValues?.firstName}
        inputClassName={getInputClass("First name", formState.errors || [])}
        divClassName=""
        label="First Name"
        id="firstName"
        type="text"
      />

      {/* Input for Last Name */}
      <Input
        labelClassName=""
        defaultValue={formState.enteredValues?.lastName}
        inputClassName={getInputClass("Last name", formState.errors || [])}
        divClassName=""
        label="Last Name"
        id="lastName"
        type="text"
      />

      {/* Input for Email */}
      <Input
        labelClassName=""
        defaultValue={formState.enteredValues?.email}
        inputClassName={getInputClass("email", formState.errors || [])}
        divClassName=""
        label="Email"
        id="email"
        type="email"
      />

      {/* Print any validation errors returned by the action */}
      {formState.errors && <PrintFormErrors errors={formState.errors} />}

      <div className="flex justify-center w-full">
        <button
          type="submit"
          className="px-4 font-bold py-2 w-full cursor-pointer bg-green-800 hover:bg-green-700 text-white rounded transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

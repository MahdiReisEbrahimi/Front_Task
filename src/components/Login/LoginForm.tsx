"use client";
import { useActionState } from "react";
import {
  valueLengthChecker,
  emailChecker,
  getInputClass,
} from "@/helperFn/formValidation";
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

interface LoginState {
  errors: string[] | null;
  enteredValues: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function LoginForm({ onClose }: { onClose: () => void }) {
  const { users } = useLoadUsers();
  const dispatch = useDispatch();
  const router = useRouter();
  const [formState, formAction] = useActionState<
    LoginState & { activeUser?: User | null },
    FormData
  >((prevState, formData) => loginAction(prevState, formData, users), {
    errors: null,
    enteredValues: { firstName: "", lastName: "", email: "" },
  });

  useEffect(() => {
    if (formState.activeUser) {
      dispatch(login({ user: formState.activeUser }));
      onClose(); // Close the modal
      setTimeout(() => {
        //time for closing modal.
        router.push(`/${formState.activeUser!.id}`);
      }, 200);
    }
  }, [formState.activeUser, dispatch, router]);

  return (
    <form
      action={formAction}
      className="bg-white p-6 rounded-sm shadow-xl w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-between">
        Login Form
        <button
          onClick={onClose}
          type="button"
          className="bg-red-500 cursor-pointer flex items-center ml-3 text-white font-bold p-2 text-sm rounded-sm"
        >
          Close
          <IoCloseSharp />
        </button>
      </h2>

      <Input
        labelClassName=""
        defaultValue={formState.enteredValues?.firstName}
        inputClassName={getInputClass("First name", formState.errors || [])}
        divClassName=""
        label="First Name"
        id="firstName"
        type="text"
      />

      <Input
        labelClassName=""
        defaultValue={formState.enteredValues?.lastName}
        inputClassName={getInputClass("Last name", formState.errors || [])}
        divClassName=""
        label="Last Name"
        id="lastName"
        type="text"
      />

      <Input
        labelClassName=""
        defaultValue={formState.enteredValues?.email}
        inputClassName={getInputClass("email", formState.errors || [])}
        divClassName=""
        label="Email"
        id="email"
        type="email"
      />

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

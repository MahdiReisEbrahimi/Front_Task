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

interface LoginState {
  errors: string[] | null;
  enteredValues: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

// LoginForm Action :
async function loginAction(
  prevState: LoginState,
  formData: FormData,
  users: User[]
): Promise<LoginState & { activeUser?: User | null }> {
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const email = formData.get("email")?.toString() || "";

  const errors: string[] = [];

  if (!valueLengthChecker(firstName, 3))
    errors.push("First name must be at least 3 characters.");
  if (!valueLengthChecker(lastName, 3))
    errors.push("Last name must be at least 3 characters.");
  if (!emailChecker(email)) errors.push("Email is invalid!");

  const enteredValues = { firstName, lastName, email };

  if (errors.length > 0) {
    return {
      errors,
      enteredValues,
    };
  }

  const activeUser = users.find(
    (user) =>
      user.first_name === firstName &&
      user.last_name === lastName &&
      user.email === email
  );

  if (!activeUser) {
    return {
      errors: ["No matching user found."],
      enteredValues,
    };
  }

  return {
    errors: null,
    enteredValues: { firstName: "", lastName: "", email: "" },
    activeUser,
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
          className="bg-red-500 flex items-center ml-3 text-white font-bold p-2 text-sm rounded-sm"
        >
          Close
          <IoCloseSharp />
        </button>
      </h2>

      <Input
        defaultValue={formState.enteredValues?.firstName}
        inputClassName={getInputClass("First name", formState.errors || [])}
        divClassName=""
        label="First Name"
        id="firstName"
        type="text"
      />

      <Input
        defaultValue={formState.enteredValues?.lastName}
        inputClassName={getInputClass("Last name", formState.errors || [])}
        divClassName=""
        label="Last Name"
        id="lastName"
        type="text"
      />

      <Input
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
          className="px-4 font-bold py-2 w-full cursor-pointer bg-green-800 text-white rounded transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

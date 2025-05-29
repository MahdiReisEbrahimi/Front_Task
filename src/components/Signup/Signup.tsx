"use client";
import Input from "@/components/reusable/Input";
import PrintFormErrors from "@/components/reusable/PrintFormErrors";
import { User } from "@/store/userApi";
import {
  valueLengthChecker,
  emailChecker,
  getInputClass,
} from "@/helperFn/formValidation";
import ImagePicker from "../reusable/ImagePicker";
import { IoCloseSharp } from "react-icons/io5";
import { useActionState } from "react";
import { useLoadUsers } from "@/hooks/useLoadUsers";

interface LoginState {
  errors: string[] | null;
  enteredValues: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

// SignupForm Action :
async function SignupAction(
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

interface Login {
  onClose: () => void;
}

export default function Login({ onClose }: Login) {
  const { users } = useLoadUsers();
  const [formState, formAction] = useActionState<
    LoginState & { activeUser?: User | null },
    FormData
  >((prevState, formData) => SignupAction(prevState, formData, users), {
    errors: null,
    enteredValues: { firstName: "", lastName: "", email: "" },
  });

  return (
    <form
      action={formAction}
      className="bg-white p-6 rounded-sm shadow-xl w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
        Signup Form
        <button
          onClick={onClose}
          type="button"
          className="bg-red-500 flex items-center ml-3 text-white font-bold p-2 text-sm rounded-sm"
        >
          Close
          <IoCloseSharp />
        </button>
      </h2>
      <div className="flex">
        <Input
          defaultValue={formState.enteredValues?.firstName}
          inputClassName={getInputClass("First name", formState.errors || [])}
          divClassName="mx-1"
          label="First Name"
          id="firstName"
          type="text"
        />
        <Input
          defaultValue={formState.enteredValues?.lastName}
          inputClassName={getInputClass("Last name", formState.errors || [])}
          divClassName="mx-1"
          label="Last Name"
          id="lastName"
          type="text"
        />
      </div>

      <Input
        defaultValue={formState.enteredValues?.email}
        inputClassName={getInputClass("email", formState.errors || [])}
        divClassName="mx-2"
        label="Email"
        id="email"
        type="email"
      />

      <ImagePicker name="mehdi" label="Pick your Avatar" />

      {/* Print form Errors */}
      {formState.errors && <PrintFormErrors errors={formState.errors} />}

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 font-bold py-2 bg-green-800 text-white rounded w-full hover:bg-blue-600 transition"
        >
          Signup
        </button>
      </div>
    </form>
  );
}

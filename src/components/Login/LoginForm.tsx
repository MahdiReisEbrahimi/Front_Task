"use client";
import { useActionState } from "react";
import { valueLengthChecker } from "@/helperFn/formValidation";
import { emailChecker } from "@/helperFn/formValidation";

// function for classname of inputs => to make red borders.
function getInputClass(fieldName: string, errors: string[]) {
  const hasError = errors.some((err) =>
    err.toLowerCase().includes(fieldName.toLowerCase())
  );

  return `w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
    hasError ? "border-red-400" : "border-black"
  }`;
}

// validation function
async function loginAction(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const email = formData.get("email")?.toString() || "";

  const errors: string[] = [];

  if (!valueLengthChecker(firstName, 1)) errors.push("First name is required.");
  if (!valueLengthChecker(firstName, 3))
    errors.push("First name must be at least 3 characters.");
  if (!valueLengthChecker(lastName, 1)) errors.push("Last name is required.");
  if (!valueLengthChecker(lastName, 3))
    errors.push("Last name must be at least 3 characters.");
  if (!emailChecker(email)) errors.push("Email is invalid!");

  if (errors.length > 0) {
    return {
      errors,
      enteredValues: { firstName, lastName, email },
    };
  }

  // Api and redux.

  return { errors: null };
}

export default function LoginForm({ onClose }: { onClose: () => void }) {
  const [formState, formAction] = useActionState(loginAction, {
    errors: null,
    enteredValues: { firstName: "", lastName: "", email: "" },
  });

  return (
    <form
      action={formAction}
      className="bg-white p-6 rounded-sm shadow-xl w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login Form
      </h2>

      {/* First Name */}
      <div className="mb-4">
        <label htmlFor="firstName" className="block mb-1 text-gray-600">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          defaultValue={formState.enteredValues?.firstName}
          className={getInputClass("First name", formState.errors || [])}
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label htmlFor="lastName" className="block mb-1 text-gray-600">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          defaultValue={formState.enteredValues?.lastName}
          className={getInputClass("Last name", formState.errors || [])}
        />
      </div>

      {/* Email */}
      <div className="mb-6">
        <label htmlFor="email" className="block mb-1 text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={formState.enteredValues?.email}
          className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            formState.errors?.includes("Email is invalid!")
              ? "border-red-400"
              : "border-black"
          }`}
        />
      </div>

      {/* Error Display */}
      {formState.errors && (
        <ul className="mb-4 text-sm text-red-500 list-disc pl-5">
          {formState.errors.map((err: string, idx: number) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      {/* Buttons */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 font-bold py-2 bg-green-800 text-white rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          type="button"
          className="bg-red-500 ml-3 text-white font-bold p-2 rounded-sm"
        >
          close
        </button>
      </div>
    </form>
  );
}

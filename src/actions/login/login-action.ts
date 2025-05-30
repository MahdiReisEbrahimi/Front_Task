import { User } from "@/store/userApi";
import { valueLengthChecker, emailChecker } from "@/helperFn/formValidation";

export interface LoginState {
  errors: string[] | null;
  enteredValues: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export async function loginAction(
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

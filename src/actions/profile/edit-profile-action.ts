import { valueLengthChecker, emailChecker } from "@/helperFn/formValidation";

export async function editProfileAction(prevState: any, formData: FormData) {
  const firstName = formData.get("first_name")?.toString() || "";
  const lastName = formData.get("last_name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const avatar = formData.get("avatar")?.toString() || "";

  const errors: string[] = [];

  if (!valueLengthChecker(firstName, 3))
    errors.push("First name must be at least 3 characters.");
  if (!valueLengthChecker(lastName, 3))
    errors.push("Last name must be at least 3 characters.");
  if (!emailChecker(email)) errors.push("Email is invalid!");
  if (avatar.trim().length === 0) {
    errors.push("Please pick an avatar image.");
  }

  const enteredValues = { firstName, lastName, email, avatar };

  if (errors.length > 0) {
    return {
      errors,
      enteredValues,
    };
  }

  return {
    errors: null,
    enteredValues,
    activeUser: {
      id: prevState.userId,
      email,
      first_name: firstName,
      last_name: lastName,
      avatar,
    },
  };
}

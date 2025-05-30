type Input = {
  labelClassName: string;
  inputClassName: string;
  divClassName: string;
  defaultValue: string;
  label: string;
  id: string;
  type: string;
};

// reusable inputs which used in login / logout / editUserProfile forms.
export default function Input({
  labelClassName,
  inputClassName,
  divClassName,
  defaultValue,
  label,
  id,
  type,
}: Input) {
  return (
    <div className={`mb-4 ${divClassName}`}>
      <label
        htmlFor="firstName"
        className={`block mb-1 text-gray-600 ${labelClassName}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={defaultValue}
        className={`${inputClassName} w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />
    </div>
  );
}

import { getInputClass } from "@/helperFn/formValidation";

type Input = {
  className: string;
  defaultValue: string;
  label: string;
  id: string;
  type: string;
};
export default function Input({
  className,
  defaultValue,
  label,
  id,
  type,
}: Input) {
  return (
    <div className="mb-4">
      <label htmlFor="firstName" className="block mb-1 text-gray-600">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={defaultValue}
        className={`${className} w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />
    </div>
  );
}

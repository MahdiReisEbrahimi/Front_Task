export default function PrintFormErrors({ errors }: { errors: string[] | null }) {
    return (
      <ul className="mb-4 text-sm text-red-500 list-disc pl-5">
        {errors?.map((err: string, idx: number) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
    );
  }
  
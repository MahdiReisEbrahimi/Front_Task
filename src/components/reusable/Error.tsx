export default function Error({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center m-auto h-screen w-1/2">
      <div className="bg-white rounded-sm m-auto">
        <h3 className="bg-red-200 mt-0.5 p-3 text-center rounded-sm text-red-700 font-bold">
          Error detected
        </h3>
        <p className="p-5 bg-white rounded-sm m-auto text-justify">{message}</p>
      </div>
    </div>
  );
}

export default function Error({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center m-auto h-screen w-1/2">
      <div className="bg-white rounded-sm m-auto">
        <h3 className="bg-red-400 mt-1 p-3 text-center rounded-sm text-red-700 font-bold">
          Error detected
        </h3>
        <p className="p-5 bg-white rounded-sm m-auto">{message}</p>
      </div>
    </div>
  );
}

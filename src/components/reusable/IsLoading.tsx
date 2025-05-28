export default function IsLoading() {
  return (
    <div className="mt-10 w-1/3 rounded-sm m-auto flex justify-center items-center h-10 bg-blue-200">
      <p className="text-lg text-gray-700 flex items-center space-x-1 font-bold">
        <span>Loading Data</span>
        <span className="loading-dots">
          <span className="dot animate-dot delay-[0ms]">.</span>
          <span className="dot animate-dot delay-[200ms]">.</span>
          <span className="dot animate-dot delay-[400ms]">.</span>
        </span>
      </p>
      <style jsx>{`
        .loading-dots .dot {
          animation: blink 1.2s infinite ease-in-out;
        }

        @keyframes blink {
          0%,
          80%,
          100% {
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

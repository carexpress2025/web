export function Loading() {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-10 h-10 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
      <span className="text-xl text-gray-500">Carregando...</span>
    </div>
  );
}

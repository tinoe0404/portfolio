// components/ErrorMessage.tsx - Error Display
export function ErrorMessage({ message }: { message: string }) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
        <p className="text-red-400">{message}</p>
      </div>
    );
  }
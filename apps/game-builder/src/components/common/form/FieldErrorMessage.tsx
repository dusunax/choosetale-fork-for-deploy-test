export default function FieldErrorMessage({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return <p className={`text-red-500 text-xs px-1 ${className}`}>{message}</p>;
}

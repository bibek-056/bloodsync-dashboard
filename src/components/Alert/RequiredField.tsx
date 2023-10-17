function RequiredField({ message }: { message?: string }) {
  return (
    <p
      className="m-0 w-full items-start ml-20 text-sm text-red-600 mb-2"
      role="alert"
    >
      *{message}
    </p>
  );
}

export default RequiredField;

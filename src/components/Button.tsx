interface ButtonProps {
  label: string;
  action: () => void;
}

export function Button({ label, action }: ButtonProps) {
  return (
    <button
      onClick={action}
      className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      {label}
    </button>
  );
}

export function SubmitButton(label: string) {
  <button
    type="submit"
    className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
  >
    {label}
  </button>;
}

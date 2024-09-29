/** @format */

const InputField = ({
  label,
  value,
  onChange,
  errorMessage,
  placeholder = "https://github.com/",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  placeholder?: string;
}) => {
  const inputClassNames = `
  ${
    errorMessage
      ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 darks:text-red-500 darks:placeholder-red-500 darks:border-red-500"
      : "bg-gray-50 border-gray-300 text-text-light placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 darks:text-text-darks darks:placeholder-gray-500 darks:border-gray-600"
  }
  rounded-lg text-sm block w-full p-2.5 darks:bg-gray-700
`;
  return (
    <div>
      <label
        htmlFor="github-repo-link"
        className={`mb-2 block text-sm font-medium ${
          errorMessage
            ? "text-red-700 darks:text-red-500"
            : "text-text-light darks:text-text-darks"
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        id="github-repo-link"
        value={value}
        onChange={onChange}
        className={`border ${
          errorMessage
            ? "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 darks:border-red-500 darks:text-red-500 darks:placeholder-red-500"
            : "border-gray-300 bg-gray-50 text-text-light placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 darks:border-gray-600 darks:text-text-darks darks:placeholder-gray-500"
        } block w-full rounded-lg p-2.5 text-sm darks:bg-gray-700`}
        placeholder={placeholder}
      />
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 darks:text-red-500">
          <span className="font-medium">{errorMessage}</span>
        </p>
      )}
    </div>
  );
};
export default InputField;

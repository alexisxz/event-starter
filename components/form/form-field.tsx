type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  name: string;
  autoComplete?: string;
  required?: boolean;
  errors?: string[];
};

export default function FormField({
  id,
  label,
  type = "text",
  name,
  autoComplete,
  required = false,
  errors,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const hasError = errors && errors.length > 0;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="form_label">
        {label}
        {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError ? true : undefined}
        className={`form_input ${hasError ? "form_input--error" : ""}`}
      />
      {hasError && (
        <p id={errorId} role="alert" className="form_error">
          {errors[0]}
        </p>
      )}
    </div>
  );
}

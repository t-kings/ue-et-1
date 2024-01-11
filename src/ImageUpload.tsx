import { Box } from "@mui/material";
import { InputBaseProps } from "formik-mui";
import { ChangeEvent, InputHTMLAttributes, useCallback } from "react";

export const ImageUpload = () => {
  return <div>ImageUpload</div>;
};

export const UpperCasingTextField = ({
  form: { setFieldValue },
  field: { name },
  ref,
  onChange,
  required,
  label,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> &
  InputBaseProps & { required?: boolean; label?: string }) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      setFieldValue(name, files);
      if (onChange) {
        onChange(event);
      }
    },
    [onChange, name, setFieldValue]
  );
  return (
    <fieldset>
      {label ? (
        <legend
          style={{
            display: "block",
          }}
        >
          {label}
        </legend>
      ) : null}
      <Box mt={label ? 2 : 0}>
        <input
          {...props}
          name={name}
          onChange={handleChange}
          style={{
            display: "block",
          }}
          id={id}
        />
      </Box>
    </fieldset>
  );
};

import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  rows?: number; // Optional prop for textarea rows
};

const BMCTextArea = ({ type, name, label, disabled, rows }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            {type === "textarea" ? (
              <Input.TextArea
                {...field}
                id={name}
                rows={rows || 4} // Use rows if provided, default to 4
                size="large"
                disabled={disabled}
              />
            ) : (
              <Input
                {...field}
                type={type}
                id={name}
                size="large"
                disabled={disabled}
              />
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BMCTextArea;

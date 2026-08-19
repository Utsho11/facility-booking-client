import { useState } from "react";
import { useAddUserMutation } from "../../redux/features/user/user.api";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Button, Checkbox, Col, Row } from "antd";
import BMCForm from "../../components/form/BMCForm";
import BMCInput from "../../components/form/BMCInput";
import { FaUserShield } from "react-icons/fa";
import BMCSelect from "../../components/form/BMCSelect";

const AddAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [addUser, { isLoading }] = useAddUserMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating a new administrative user...");
    const userDetails = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: String(data.phone),
      role: "admin",
      address: data.address,
    };
    try {
      const res = await addUser(userDetails).unwrap();
      if (res?.success) {
        toast.success("Administrator account created successfully!", { id: toastId, duration: 2500 });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create administrator.", { id: toastId, duration: 2500 });
    }
  };

  return (
    <div className="py-8 px-4 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-[#1e1e1e] p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 transition-all">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 dark:bg-orange-950/50 rounded-2xl mb-3 text-[#FE7D1F] shadow-sm">
            <FaUserShield size={28} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Provision Administrator Account
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Grant managerial access to oversee venues, bookings, and platform revenue.
          </p>
        </div>

        <BMCForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12}>
                <BMCInput type="text" name="name" label="Admin Name" />
              </Col>
              <Col xs={24} sm={12}>
                <BMCInput type="email" name="email" label="Admin Email" />
              </Col>
            </Row>

            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12}>
                <BMCInput type="text" name="phone" label="Phone Number" />
              </Col>
              <Col xs={24} sm={12}>
                <BMCInput type="text" name="address" label="Branch / HQ Location" />
              </Col>
            </Row>

            <BMCSelect
              label="Assigned System Role:"
              name="role"
              options={[{ value: "admin", label: "Full Administrator" }]}
            />

            <BMCInput
              type={showPassword ? "text" : "password"}
              name="password"
              label="Account Password"
            />
          </div>

          <div className="flex items-center justify-between mt-3 text-xs">
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="text-gray-600 dark:text-gray-400"
            >
              Show Password
            </Checkbox>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ backgroundColor: "#FE7D1F" }}
            className="w-full h-11 mt-6 text-sm font-bold rounded-xl shadow-lg hover:scale-101 transition-transform"
          >
            Create Administrator
          </Button>
        </BMCForm>
      </div>
    </div>
  );
};

export default AddAdmin;

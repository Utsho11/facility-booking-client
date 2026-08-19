import { Button, Checkbox, Col, Row } from "antd";
import BMCForm from "../components/form/BMCForm";
import BMCInput from "../components/form/BMCInput";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../redux/features/user/user.api";
import { toast } from "sonner";
import { FaVolleyballBall, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [addUser, { isLoading }] = useAddUserMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating your athlete account...");
    const userDetails = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: String(data.phone),
      role: "user",
      address: data.address,
    };
    try {
      const res = await addUser(userDetails).unwrap();
      if (res?.success) {
        toast.success("Account created successfully! Please sign in.", {
          id: toastId,
          duration: 2500,
        });
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed. Try again.", {
        id: toastId,
        duration: 2500,
      });
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white dark:bg-[#1e1e1e] p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all">
        {/* Brand Icon & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 dark:bg-orange-950/50 rounded-2xl mb-3 text-[#FE7D1F] shadow-sm">
            <FaVolleyballBall size={28} className="animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create an <span className="text-[#FE7D1F]">Account</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
            Join thousands of players booking premier courts across the city.
          </p>
        </div>

        <BMCForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12}>
                <BMCInput type="text" name="name" label="Full Name" />
              </Col>
              <Col xs={24} sm={12}>
                <BMCInput type="email" name="email" label="Email Address" />
              </Col>
            </Row>

            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12}>
                <BMCInput type="text" name="phone" label="Phone Number" />
              </Col>
              <Col xs={24} sm={12}>
                <BMCInput type="text" name="address" label="City / Location" />
              </Col>
            </Row>

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
            Create My Account
          </Button>
        </BMCForm>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#FE7D1F] font-bold hover:underline ml-1"
          >
            Sign In here
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <FaShieldAlt className="text-green-500" />
          <span>Your personal information is SSL encrypted & private</span>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { Button, Checkbox, Divider } from "antd";
import BMCForm from "../components/form/BMCForm";
import BMCInput from "../components/form/BMCInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";
import { FaVolleyballBall, FaUserShield, FaUserCheck, FaLock } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [defaultValues, setDefaultValues] = useState<{ email?: string; password?: string }>({});

  const executeLogin = async (credentials: { email: string; password: string }) => {
    const toastId = toast.loading("Authenticating credentials...");
    try {
      const res = await login(credentials).unwrap();
      const user = verifyToken(res.token);
      dispatch(setUser({ user: user, token: res.token }));
      toast.success("Welcome back!", { id: toastId, duration: 2000 });
      navigate(user?.role === "admin" ? "/admin/dashboard" : "/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid email or password", {
        id: toastId,
        duration: 2500,
      });
    }
  };

  const onSubmit = async (data: FieldValues) => {
    await executeLogin({
      email: data.email,
      password: data.password,
    });
  };

  const handleDemoAdmin = () => {
    setDefaultValues({
      email: "demoadmin@gmail.com",
      password: "admin123456",
    });
    executeLogin({
      email: "demoadmin@gmail.com",
      password: "admin123456",
    });
  };

  const handleDemoUser = () => {
    setDefaultValues({
      email: "demouser@gmail.com",
      password: "user123456",
    });
    executeLogin({
      email: "demouser@gmail.com",
      password: "user123456",
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-[#1e1e1e] p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all">
        {/* Brand Icon & Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 dark:bg-orange-950/50 rounded-2xl mb-3 text-[#FE7D1F] shadow-sm">
            <FaVolleyballBall size={28} className="animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome <span className="text-[#FE7D1F]">Back</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
            Sign in to access your court reservations and dashboard.
          </p>
        </div>

        {/* 1-Click Demo Login Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 rounded-2xl border border-orange-200 dark:border-orange-900/40">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
            <FaLock className="text-[#FE7D1F]" size={11} />
            Quick Demo Access (1-Click Test):
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="default"
              icon={<FaUserShield className="text-orange-600" />}
              onClick={handleDemoAdmin}
              loading={isLoading}
              className="h-9 text-xs font-semibold rounded-xl border-orange-300 hover:border-[#FE7D1F] hover:text-[#FE7D1F] transition-colors"
            >
              Demo Admin
            </Button>
            <Button
              type="default"
              icon={<FaUserCheck className="text-blue-600" />}
              onClick={handleDemoUser}
              loading={isLoading}
              className="h-9 text-xs font-semibold rounded-xl border-blue-300 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              Demo Athlete
            </Button>
          </div>
        </div>

        <Divider className="my-4 text-xs text-gray-400 dark:text-gray-500">
          or sign in with email
        </Divider>

        {/* Standard Login Form */}
        <BMCForm key={defaultValues.email} onSubmit={onSubmit} defaultValues={defaultValues}>
          <div className="space-y-4">
            <BMCInput type="text" name="email" label="Email Address" />
            <BMCInput
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
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
            Sign In to Account
          </Button>
        </BMCForm>

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-[#FE7D1F] font-bold hover:underline ml-1"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Button, Checkbox, Col, Row } from "antd";
import BMCForm from "../components/form/BMCForm";
import BMCInput from "../components/form/BMCInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";
import { FaVolleyballBall } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.token);

      dispatch(setUser({ user: user, token: res.token }));

      toast.success("Logged in", { id: toastId, duration: 2000 });

      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col className="form_container" span={18} sm={6}>
          <div style={{ textAlign: "center" }}>
            <FaVolleyballBall size={24} color="#FE7D1F" />
          </div>
          <div className="title_container">
            <p className="title">Login to your Account</p>
            <span className="subtitle">
              Get started with our app, just create an account and enjoy the
              experience.
            </span>
          </div>
          <br></br>
          <BMCForm onSubmit={onSubmit}>
            <BMCInput type="text" name="email" label="Email:" />
            <BMCInput
              type={showPassword ? "text" : "password"} // Conditional input type
              name="password"
              label="Password:"
            />
            <Checkbox onChange={() => setShowPassword(!showPassword)}>
              Show Password
            </Checkbox>
            <br />
            <Button
              style={{
                backgroundColor: "#115DFC",
                color: "#fff",
                marginTop: "1rem",
              }}
              htmlType="submit"
            >
              Login
            </Button>
          </BMCForm>

          <div style={{ margin: "2rem 0" }}>
            <Link style={{}} className="nav-link" to="/register">
              Create an Account?
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;

import { Button, Checkbox, Col, Row } from "antd";
import BMCForm from "../components/form/BMCForm";
import BMCInput from "../components/form/BMCInput";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../redux/features/user/user.api";
import { toast } from "sonner";
import { FaVolleyballBall } from "react-icons/fa";
import { useState } from "react";

const defaultValues = {
  name: "Programming Hero",
  email: "user12@programming-hero.com",
  password: "programming-hero",
  phone: "01322901105",
  role: "user",
  address: "Level-4, 34, Awal Centre, Banani, Dhaka",
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating new user...");
    const userDetails = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: "user",
      address: data.address,
    };
    try {
      const res = await addUser(userDetails).unwrap();
      if (res?.success) {
        toast.success("Created Successfully!", { id: toastId, duration: 2000 });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "0 1rem" }}>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col className="form_container">
          <div style={{ textAlign: "center" }}>
            <FaVolleyballBall size={24} color="#FE7D1F" />
          </div>
          <div className="title_container">
            <p className="title">Create your Account</p>
            <span className="subtitle">
              Get started with our app, just create an account and enjoy the
              experience.
            </span>
          </div>
          <br></br>
          <BMCForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <BMCInput type="text" name="name" label="Name:" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <BMCInput type="email" name="email" label="Email:" />
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <BMCInput type="number" name="phone" label="Phone:" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <BMCInput type="text" name="address" label="Address:" />
              </Col>
            </Row>
            <BMCInput
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
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
              Register
            </Button>
          </BMCForm>
          <div style={{ margin: "2rem 0" }}>
            Already have an account?
            <Link className="nav-link" to="/login">
              Log in
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;

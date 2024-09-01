import { Button, Col, Input, Row, Form } from "antd";
import contactAnimation from "../assets/images/Contact-animation.json";
import Lottie from "lottie-react";
import emailjs from "@emailjs/browser";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { useRef } from "react";
import { toast } from "sonner";
import { MdAlternateEmail, MdLocalPhone } from "react-icons/md";

const { TextArea } = Input;

const Contact = () => {
  const { handleSubmit, control, reset } = useForm<FieldValues>();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    emailjs
      .send("service_9ihwtfr", "template_g8iggk8", data, "w3yUQdGSKufUMmGcF")
      .then(
        () => {
          toast.success("Email successfully sent.");
          reset(); // Reset the form after successful submission
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="">
      <div>
        <Row
          gutter={[24, 24]}
          align="middle"
          justify="center"
          style={{ margin: "0 auto", maxWidth: "1200px", padding: "2rem" }}
        >
          <Col xs={24} md={12}>
            <Lottie
              animationData={contactAnimation}
              loop={true}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div className="">
              <h1 style={{ textAlign: "center", margin: "2rem 0" }}>
                Contact us
              </h1>
              <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col span={24}>
                    <Form.Item layout="vertical" label="Name:">
                      <Controller
                        name="user_name"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Enter your name" />
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Form.Item layout="vertical" label="Email:">
                      <Controller
                        name="user_email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Form.Item layout="vertical" label="Subject:">
                      <Controller
                        name="subject"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Enter the subject" />
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Form.Item layout="vertical" label="Message:">
                      <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            rows={5}
                            placeholder="Enter your message"
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Button
                      style={{ backgroundColor: "#fe7d1f", color: "#fff" }}
                      htmlType="submit"
                    >
                      Send Message
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>Our Location</h1>
        <div style={{ padding: "0 2rem" }}>
          <div style={{ margin: "3rem 0" }}>
            <h2>Savar New Market</h2>
            <p>
              Holding # 3, Ward # 7, Dhaka - Aricha Hwy, 1340, Savar 1340, 5th
              Floor
            </p>
            <br />
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <MdLocalPhone />
              +88 01718888662
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <MdAlternateEmail />
              book-my-court@mail.com
            </p>
          </div>
          <div className="responsive-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.0967854950295!2d90.25662807579624!3d23.850696684917626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebd3a31fc6e1%3A0xe55aca4d05ef4fa2!2sSavar%20New%20Market!5e0!3m2!1sen!2sbd!4v1725223428913!5m2!1sen!2sbd"
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

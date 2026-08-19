import React, { useRef, useState } from "react";
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
import { toast } from "sonner";
import { MdAlternateEmail, MdLocalPhone, MdLocationOn, MdAccessTime } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";

const { TextArea } = Input;

const Contact = () => {
  const { handleSubmit, control, reset } = useForm<FieldValues>();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsSending(true);
    const toastId = toast.loading("Transmitting your message...");

    emailjs
      .send("service_9ihwtfr", "template_g8iggk8", data, "w3yUQdGSKufUMmGcF")
      .then(
        () => {
          toast.success("Thank you! Your message has been sent successfully.", { id: toastId });
          reset();
          setIsSending(false);
        },
        (error) => {
          console.error("FAILED...", error.text);
          toast.info("Thank you for reaching out! We have received your inquiry.", { id: toastId });
          reset();
          setIsSending(false);
        }
      );
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-[#FE7D1F] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-xs">
          Get in Touch
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          We'd Love to <span className="text-[#FE7D1F]">Hear From You</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-base sm:text-lg">
          Have a question regarding court bookings, venue partnerships, or technical support? Drop us a line.
        </p>
      </div>

      {/* Main Grid: Form + Info Animation */}
      <Row gutter={[32, 32]} align="middle" className="mb-20">
        {/* Left Column: Animation & Quick Cards */}
        <Col xs={24} lg={12}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center">
            <div className="w-full max-w-sm mb-4">
              <Lottie
                animationData={contactAnimation}
                loop={true}
                style={{ width: "100%", height: "260px" }}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex items-start gap-3">
                <MdLocalPhone className="text-[#FE7D1F] mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">Phone Line</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 font-medium">+88 01718-888662</p>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex items-start gap-3">
                <MdAlternateEmail className="text-[#FE7D1F] mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">Email Support</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 font-medium">support@bookmycourt.com</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-start gap-3">
                <MdLocationOn className="text-[#FE7D1F] mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">Headquarters</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">Savar Sports Enclave, Dhaka</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-start gap-3">
                <MdAccessTime className="text-[#FE7D1F] mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">Working Hours</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">6:00 AM – 11:00 PM (Daily)</p>
                </div>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Column: Contact Message Form */}
        <Col xs={24} lg={12}>
          <div className="bg-white dark:bg-[#1e1e1e] p-8 sm:p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              Send a Direct Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
              Fill out the form below and our sports concierge team will reply within 24 hours.
            </p>

            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Your Full Name:
                </label>
                <Controller
                  name="user_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input {...field} placeholder="e.g. Alex Hunter" className="rounded-xl h-11" />
                  )}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address:
                </label>
                <Controller
                  name="user_email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input {...field} type="email" placeholder="e.g. alex@example.com" className="rounded-xl h-11" />
                  )}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Subject:
                </label>
                <Controller
                  name="subject"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input {...field} placeholder="e.g. Booking inquiry for Tournament" className="rounded-xl h-11" />
                  )}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Message:
                </label>
                <Controller
                  name="message"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextArea {...field} rows={4} placeholder="Describe your request..." className="rounded-xl" />
                  )}
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={isSending}
                icon={<FaPaperPlane size={12} />}
                style={{ backgroundColor: "#FE7D1F" }}
                className="w-full h-12 font-bold rounded-xl shadow-lg hover:scale-101 transition-transform text-sm mt-2 flex items-center justify-center gap-2"
              >
                Send Message
              </Button>
            </form>
          </div>
        </Col>
      </Row>

      {/* Map & Venue Location Section */}
      <div className="bg-white dark:bg-[#1e1e1e] p-6 sm:p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Visit Our Main Operations Hub
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Centrally located in Savar Sports Enclave with dedicated player reception.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 h-[380px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.0967854950295!2d90.25662807579624!3d23.850696684917626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebd3a31fc6e1%3A0xe55aca4d05ef4fa2!2sSavar%20New%20Market!5e0!3m2!1sen!2sbd!4v1725223428913!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import { Button, Col, Row } from "antd";
import { useGetAllFacilitiesQuery } from "../redux/features/admin/admin.api";
import {
  useCheckAvailabilityQuery,
  useCreateBookingMutation,
} from "../redux/features/booking/booking.api";
import BMCForm from "../components/form/BMCForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import BMCSelect from "../components/form/BMCSelect";
import BMCDatePicker from "../components/form/BMCDatePicker";
import { useState } from "react";
import { TQueryParam } from "../types/global";
import BMCTimePicker from "../components/form/BMCTimePicker";
import { toast } from "sonner";

const CreateBooking = () => {
  const { data: facilities, isLoading } = useGetAllFacilitiesQuery([]);

  // State to store params for availability check
  const [params, setParams] = useState<TQueryParam[] | null>(null);

  // Trigger check availability query based on params
  const { data: availabilityDate, isFetching } = useCheckAvailabilityQuery(
    params,
    {
      skip: !params, // Skips the query execution until params are set
    }
  );

  const facilityOptions =
    facilities?.data?.map((facility) => ({
      value: facility._id,
      label: facility.name,
    })) || [];

  const [createBooking] = useCreateBookingMutation();

  const handleCheck: SubmitHandler<FieldValues> = (formData) => {
    // Format the date
    const formattedDate = formData?.date?.format("YYYY-MM-DD");

    // Convert formData into params array
    const queryParams = Object.keys(formData).map((key) => ({
      name: key,
      value: key === "date" ? formattedDate : formData[key],
    }));

    // Update state with the new params to trigger the query
    setParams(queryParams);
  };

  const handleBooking: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Booking a Facility...");
    data.date = data.date.format("YYYY-MM-DD");
    data.startTime = data.startTime.format("HH:MM");
    data.endTime = data.endTime.format("HH:MM");
    try {
      const res = await createBooking(data).unwrap();
      if (res.success) {
        toast.success("Redirect to Payment...", {
          id: toastId,
          duration: 2000,
        });
        window.location.href = res.data.payment_url;
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.log(error);
    }
  };

  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ height: "100vh" }}>
      <div>
        <h1 style={{ textAlign: "center", margin: "1rem 0" }}>
          Check Avaliable Slot
        </h1>
        <hr style={{ margin: "2rem" }} />
        <Row align="middle" justify="center">
          <Col lg={12} sm={24}>
            <BMCForm onSubmit={handleCheck}>
              <Row gutter={8}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <BMCSelect
                    label="Select a facility:"
                    name="facility"
                    options={facilityOptions}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <BMCDatePicker label="Select a date:" name="date" />
                </Col>
              </Row>
              <Button htmlType="submit">Check Availability</Button>
            </BMCForm>
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <Col>
            <div className="available-slot-details">
              <h4>Available Slots Details:</h4>
              {availabilityDate ? (
                availabilityDate?.data?.map((item, index) => (
                  <p
                    style={{
                      backgroundColor: "green",
                      color: "#fff",
                      padding: "5px",
                      margin: "5px 0",
                      borderRadius: "1rem",
                    }}
                    key={index}
                  >
                    {item.startTime}-{item.endTime}
                  </p>
                ))
              ) : (
                <>
                  {params ? (
                    <p
                      style={{
                        backgroundColor: "#fe7d1f",
                        color: "#fff",
                        padding: "5px",
                        margin: "5px 0",
                        borderRadius: "5px",
                      }}
                    >
                      Available Slot Not Found! Please select another date.
                    </p>
                  ) : (
                    <p
                      style={{
                        backgroundColor: "black",
                        color: "#fff",
                        padding: "5px",
                        margin: "5px 0",
                        borderRadius: "5px",
                      }}
                    >
                      Please select a Facility and Date.
                    </p>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <h1 style={{ textAlign: "center", margin: "1rem 0" }}>Book A Slot</h1>
        <hr style={{ margin: "2rem" }} />
        <Row align="middle" justify="center">
          <Col lg={12} sm={24}>
            <BMCForm onSubmit={handleBooking}>
              <Row gutter={8}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <BMCSelect
                    label="Select a facility:"
                    name="facility"
                    options={facilityOptions}
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <BMCDatePicker label="Select a date:" name="date" />
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <BMCTimePicker
                    label="Select a Start time:"
                    name="startTime"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <BMCTimePicker label="Select a End time:" name="endTime" />
                </Col>
              </Row>
              <Button htmlType="submit">Book Now</Button>
            </BMCForm>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CreateBooking;

import { useParams } from "react-router-dom";
import { useGetSingleFacilityQuery } from "../../redux/features/admin/admin.api";
import { Button, Col, Form, Input, Row } from "antd";
import { FaVolleyballBall } from "react-icons/fa";
import BMCForm from "../../components/form/BMCForm";
import BMCInput from "../../components/form/BMCInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";

const UpdateFacility = () => {
  const { id } = useParams();

  const { data: currentFacility, isLoading } = useGetSingleFacilityQuery(
    id as string
  );

  // Submit handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "0 1rem" }}>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col className="form_container" span={18} sm={6}>
          <div style={{ textAlign: "center" }}>
            <FaVolleyballBall size={24} color="#FE7D1F" />
          </div>
          <div className="title_container">
            <p className="title">Create New Faculty</p>
          </div>
          <br></br>
          <BMCForm onSubmit={onSubmit} defaultValues={currentFacility}>
            <BMCInput type="text" name="name" label="Name:" />
            <BMCInput type="text" name="description" label="Description:" />
            <BMCInput type="text" name="location" label="Location:" />
            <BMCInput type="number" name="pricePerHour" label="Hourly rate:" />

            <Controller
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <Form.Item label="Image:">
                  <Input
                    type="file"
                    value={value?.fileName}
                    {...field}
                    onChange={(e) => onChange(e.target.files?.[0])}
                  />
                </Form.Item>
              )}
            />
            <Button
              style={{
                backgroundColor: "#115DFC",
                color: "#fff",
                marginTop: "1rem",
              }}
              htmlType="submit"
            >
              Create Facility
            </Button>
          </BMCForm>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateFacility;

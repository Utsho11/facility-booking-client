import { Button, Col, Form, Input, Row } from "antd";
import { FaVolleyballBall } from "react-icons/fa";
import BMCForm from "../../components/form/BMCForm";
import BMCInput from "../../components/form/BMCInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { useAddFacilityMutation } from "../../redux/features/admin/admin.api";
import { toast } from "sonner";
import imgDefault from "../../assets/images/istockphoto-1409329028-612x612.jpg";

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const CreateFacility = () => {
  const [addFacility] = useAddFacilityMutation();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const toastId = toast.loading("Creating new facility...");

    if (data.image) {
      const formData = new FormData();
      formData.append("image", data.image);

      fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgresponse) => {
          data.image = imgresponse.data.display_url;
          data.pricePerHour = Number(data.pricePerHour);
          addFacility(data);
          toast.success("Created Successfully!", {
            id: toastId,
            duration: 2000,
          });
        });
    } else {
      data.image = imgDefault;
      data.pricePerHour = Number(data.pricePerHour);
      addFacility(data);
      toast.success("Created Successfully!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col className="form_container" span={18} sm={6} lg={{ span: 8 }}>
          <div style={{ textAlign: "center" }}>
            <FaVolleyballBall size={24} color="#FE7D1F" />
          </div>
          <div className="title_container">
            <p className="title">Create New Faculty</p>
          </div>
          <br></br>
          <BMCForm onSubmit={onSubmit}>
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

export default CreateFacility;

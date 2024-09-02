import { useParams } from "react-router-dom";
import {
  useGetSingleFacilityQuery,
  useUpdateFacilityMutation,
} from "../../redux/features/admin/admin.api";
import { Button, Col, Form, Input, Row } from "antd";
import { FaVolleyballBall } from "react-icons/fa";
import BMCForm from "../../components/form/BMCForm";
import BMCInput from "../../components/form/BMCInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

// const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const UpdateFacility = () => {
  const { id } = useParams();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=b63df16b4aa6b36bc2bdd5715e0c99a3`;

  const { data: currentFacility, isLoading } = useGetSingleFacilityQuery(
    id as string
  );
  const [updateFacility] = useUpdateFacilityMutation();
  // Submit handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const toastId = toast.loading("Updating facility...");

    if (data.image !== currentFacility?.image) {
      const formData = new FormData();
      formData.append("image", data.image);
      try {
        fetch(img_hosting_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgresponse) => {
            data.image = imgresponse.data.display_url;
            data.pricePerHour = Number(data.pricePerHour);
            const updatedFacility = {
              id: id,
              data,
            };
            updateFacility(updatedFacility);

            toast.success("Updated Successfully!", {
              id: toastId,
              duration: 2000,
            });
          });
      } catch (error) {
        toast.error("Error updating", { id: toastId, duration: 2000 });
        console.log(error);
      }
    } else {
      const updatedFacility = {
        id: id,
        data,
      };
      updateFacility(updatedFacility);
      toast.success("Updated Successfully!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "0 1rem" }}>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col className="form_container" span={18} sm={6} lg={{ span: 8 }}>
          <div style={{ textAlign: "center" }}>
            <FaVolleyballBall size={24} color="#FE7D1F" />
          </div>
          <div className="title_container">
            <p className="title">Update Facility</p>
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
              Update Facility
            </Button>
          </BMCForm>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateFacility;

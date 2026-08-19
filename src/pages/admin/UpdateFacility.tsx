import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleFacilityQuery,
  useUpdateFacilityMutation,
} from "../../redux/features/admin/admin.api";
import { Button, Col, Row } from "antd";
import { FaEdit } from "react-icons/fa";
import BMCForm from "../../components/form/BMCForm";
import BMCInput from "../../components/form/BMCInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const UpdateFacility = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: currentFacility, isLoading } = useGetSingleFacilityQuery(
    id as string
  );
  const [updateFacility, { isLoading: isUpdating }] = useUpdateFacilityMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Saving facility changes...");

    const payload = {
      name: data.name,
      description: data.description,
      location: data.location,
      pricePerHour: Number(data.pricePerHour),
      image: data.image || currentFacility?.image,
    };

    try {
      await updateFacility({
        id: id,
        data: payload,
      }).unwrap();

      toast.success("Facility updated successfully!", { id: toastId, duration: 2500 });
      navigate("/admin/allFacility");
    } catch (error: any) {
      toast.error(error?.data?.message || "Error updating facility", { id: toastId, duration: 2500 });
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading facility details...</div>;
  }

  return (
    <div className="py-8 px-4 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-[#1e1e1e] p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 transition-all">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 dark:bg-orange-950/50 rounded-2xl mb-3 text-[#FE7D1F] shadow-sm">
            <FaEdit size={26} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Modify Facility Details
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Update pricing, venue amenities, or location specs.
          </p>
        </div>

        <BMCForm onSubmit={onSubmit} defaultValues={currentFacility}>
          <div className="space-y-4">
            <BMCInput type="text" name="name" label="Facility Name" />
            <BMCInput type="text" name="description" label="Description & Features" />

            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12}>
                <BMCInput type="text" name="location" label="Location" />
              </Col>
              <Col xs={24} sm={12}>
                <BMCInput type="number" name="pricePerHour" label="Hourly Rate ($ USD)" />
              </Col>
            </Row>

            <BMCInput type="text" name="image" label="Image Banner URL" />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdating}
            style={{ backgroundColor: "#FE7D1F" }}
            className="w-full h-11 mt-6 text-sm font-bold rounded-xl shadow-lg hover:scale-101 transition-transform"
          >
            Save & Update Facility
          </Button>
        </BMCForm>
      </div>
    </div>
  );
};

export default UpdateFacility;

import { Button, Col, Form, Input, Row } from "antd";
import { FaBuilding } from "react-icons/fa";
import BMCForm from "../../components/form/BMCForm";
import BMCInput from "../../components/form/BMCInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { useAddFacilityMutation } from "../../redux/features/admin/admin.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const CreateFacility = () => {
  const [addFacility, { isLoading }] = useAddFacilityMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering new sports venue...");

    const payload = {
      name: data.name,
      description: data.description,
      location: data.location,
      pricePerHour: Number(data.pricePerHour),
      image:
        data.imageUrl ||
        "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80",
    };

    try {
      const res = await addFacility(payload).unwrap();
      if (res?.success) {
        toast.success("Facility published successfully!", { id: toastId, duration: 2500 });
        navigate("/admin/allFacility");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create facility.", { id: toastId, duration: 2500 });
    }
  };

  return (
    <div className="py-8 px-4 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-[#1e1e1e] p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 transition-all">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 dark:bg-orange-950/50 rounded-2xl mb-3 text-[#FE7D1F] shadow-sm">
            <FaBuilding size={28} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Add New Sports Facility
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Publish a new court or sports ground to the live player discovery network.
          </p>
        </div>

        <BMCForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <BMCInput type="text" name="name" label="Facility / Court Name" />
            <BMCInput type="text" name="description" label="Detailed Overview & Amenities" />

            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12}>
                <BMCInput type="text" name="location" label="Physical Location / Address" />
              </Col>
              <Col xs={24} sm={12}>
                <BMCInput type="number" name="pricePerHour" label="Hourly Rate ($ USD)" />
              </Col>
            </Row>

            <BMCInput
              type="text"
              name="imageUrl"
              label="Banner Image URL (Unsplash or direct image link)"
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ backgroundColor: "#FE7D1F" }}
            className="w-full h-11 mt-6 text-sm font-bold rounded-xl shadow-lg hover:scale-101 transition-transform"
          >
            Publish Facility to Marketplace
          </Button>
        </BMCForm>
      </div>
    </div>
  );
};

export default CreateFacility;

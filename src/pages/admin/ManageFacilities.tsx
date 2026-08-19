import { Button, Pagination, Popconfirm, Space, Table, TableColumnsType, Tag } from "antd";
import { TFacility } from "../../types/facility.types";
import { useState } from "react";
import {
  useDeleteFacilityMutation,
  useGetAllFacilitiesQuery,
} from "../../redux/features/admin/admin.api";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { FaPlus, FaTrash, FaEdit, FaEye } from "react-icons/fa";

export type TTableData = Pick<
  TFacility,
  "name" | "description" | "pricePerHour" | "location"
>;

const ManageFacilities = () => {
  const [page, setPage] = useState(1);
  const { data: facilityData, isFetching } = useGetAllFacilitiesQuery([
    { name: "page", value: page },
    { name: "sort", value: "-createdAt" },
    { name: "limit", value: "8" },
  ]);

  const [deleteFacility] = useDeleteFacilityMutation();

  const handleRemove = async (id: string) => {
    const toastId = toast.loading("Removing facility...");
    try {
      await deleteFacility(id).unwrap();
      toast.success("Facility removed successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to remove facility", { id: toastId });
    }
  };

  const metaData = facilityData?.meta;

  const tableData = facilityData?.data?.map(
    ({ _id, name, description, pricePerHour, location }) => ({
      key: _id,
      name,
      description,
      pricePerHour,
      location,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Facility Name",
      key: "name",
      dataIndex: "name",
      render: (name) => <span className="font-bold text-gray-900 dark:text-white">{name}</span>,
    },
    {
      title: "Location",
      key: "location",
      dataIndex: "location",
      render: (loc) => <span className="text-gray-600 dark:text-gray-300 text-xs">{loc}</span>,
    },
    {
      title: "Hourly Rate",
      key: "pricePerHour",
      dataIndex: "pricePerHour",
      render: (price) => (
        <Tag color="orange" className="font-bold text-sm">
          ${price} / hr
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "x",
      render: (item) => (
        <Space size="small">
          <Link to={`/facility/${item.key}`}>
            <Button size="small" icon={<FaEye size={12} />} className="rounded-lg">
              View
            </Button>
          </Link>
          <Link to={`/admin/updateFacility/${item.key}`}>
            <Button size="small" icon={<FaEdit size={12} />} className="rounded-lg">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Delete Facility"
            description="Are you sure you want to remove this sports venue?"
            onConfirm={() => handleRemove(item.key)}
            okText="Yes, Remove"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" danger icon={<FaTrash size={11} />} className="rounded-lg">
              Remove
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: "220px",
    },
  ];

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Manage Sports Facilities
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            View, edit rates, or decommission sports grounds.
          </p>
        </div>
        <Link to="/admin/createFacility">
          <Button
            type="primary"
            style={{ backgroundColor: "#FE7D1F" }}
            icon={<FaPlus size={12} />}
            className="h-10 font-bold rounded-xl shadow-md"
          >
            Add New Facility
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ x: 700 }}
        />
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit || 8}
          total={metaData?.total || 0}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ManageFacilities;

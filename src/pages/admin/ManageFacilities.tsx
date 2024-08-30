import { Button, Pagination, Space, Table, TableColumnsType } from "antd";
import { TFacility } from "../../types/facility.types";
import { useState } from "react";
import {
  useDeleteFacilityMutation,
  useGetAllFacilitiesQuery,
} from "../../redux/features/admin/admin.api";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type TTableData = Pick<
  TFacility,
  "name" | "description" | "pricePerHour" | "location"
>;

const ManageFacilities = () => {
  const [page, setPage] = useState(1);
  const { data: facilityData, isFetching } = useGetAllFacilitiesQuery([
    { name: "page", value: page },
    { name: "sort", value: "pricePerHour" },
  ]);

  const [deleteFacility] = useDeleteFacilityMutation();

  const handleRemove = (id: string) => {
    deleteFacility(id);
    toast.success("Removed facility Successfully!");
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
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Price Per Hour",
      key: "pricePerHour",
      dataIndex: "pricePerHour",
    },
    {
      title: "Location",
      key: "location",
      dataIndex: "location",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/facility/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/updateFacility/${item.key}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={() => handleRemove(item.key)}>Remove</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  return (
    <div className="">
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 800 }}
      />
      <Pagination
        align="center"
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default ManageFacilities;

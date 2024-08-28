import { Button, Pagination, Space, Table, TableColumnsType } from "antd";
import { TFacility } from "../../types/facility.types";
import { useState } from "react";
import { useGetAllFacilitiesQuery } from "../../redux/features/admin/admin.api";
import { Link } from "react-router-dom";
import { BiSolidPlusCircle } from "react-icons/bi";

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

  console.log(facilityData?.data);

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
            <Link to={`/admin/facility/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/facility/update/${item.key}`}>
              <Button>Update</Button>
            </Link>
            <Button>Remove</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  return (
    <div className="">
      <div className="" style={{ textAlign: "center", margin: "3rem 0" }}>
        To Add more Facility. Please Click Here..
        <Link to="/admin/addFacility">
          <Button style={{ backgroundColor: "#115dfc", color: "#fff" }}>
            <BiSolidPlusCircle />
            Add Facility
          </Button>
        </Link>
      </div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default ManageFacilities;

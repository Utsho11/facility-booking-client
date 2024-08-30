import { Table, TableColumnsType } from "antd";
import { useGetAllBookingForAdminQuery } from "../../redux/features/admin/admin.api";
// import { TBooking } from "../../types/facility.types";

// export type TTableData = Pick<
//   TBooking,
//   "facility" | "isBooked" | "startTime" | "endTime"
// >;

export type TTableData = {
  key: string;
  name: string;
  isBooked: string;
  startTime: string;
  endTime: string;
};

const AllBooking = () => {
  const { data: bookingData, isFetching } = useGetAllBookingForAdminQuery();

  const tableData = bookingData?.map(
    ({ _id, facility, isBooked, startTime, endTime }) => ({
      key: _id,
      name: facility.name,
      isBooked,
      startTime,
      endTime,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "IsBooked",
      key: "isBooked",
      dataIndex: "isBooked",
    },
    {
      title: "Start Time",
      key: "startTime",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      key: "endTime",
      dataIndex: "endTime",
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
    </div>
  );
};

export default AllBooking;

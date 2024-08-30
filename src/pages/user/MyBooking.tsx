import { Button, Space, Table, TableColumnsType } from "antd";
import {
  useCancelBookingMutation,
  useGetAllBookingForUserQuery,
} from "../../redux/features/user/user.api";
import { toast } from "sonner";

export type TTableData = {
  key: string;
  name: string;
  isBooked: string;
  startTime: string;
  endTime: string;
};

const MyBooking = () => {
  const { data: bookingData, isFetching } = useGetAllBookingForUserQuery();

  const [cancelBooking] = useCancelBookingMutation();

  const tableData = bookingData?.map(
    ({ _id, facility, isBooked, startTime, endTime }) => ({
      key: _id,
      name: facility.name,
      isBooked,
      startTime,
      endTime,
    })
  );

  const handleCancel = (id: string) => {
    cancelBooking(id);
    toast.success("Booking Cancelled Successfully.");
  };

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
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Button onClick={() => handleCancel(item.key)}>Cancel</Button>
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
    </div>
  );
};

export default MyBooking;

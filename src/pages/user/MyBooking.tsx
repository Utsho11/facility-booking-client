import { Button, Popconfirm, Space, Table, TableColumnsType, Tag } from "antd";
import {
  useCancelBookingMutation,
  useGetAllBookingForUserQuery,
} from "../../redux/features/user/user.api";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export type TTableData = {
  key: string;
  facilityName: string;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount: number;
  paymentStatus: string;
  isBooked: string;
};

const MyBooking = () => {
  const { data: bookingData, isFetching } = useGetAllBookingForUserQuery();

  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

  const tableData: TTableData[] =
    bookingData?.map(
      ({
        _id,
        facility,
        date,
        isBooked,
        startTime,
        endTime,
        payableAmount,
        paymentStatus,
      }) => ({
        key: _id,
        facilityName: facility?.name || "Deleted Facility",
        date: date || "N/A",
        startTime,
        endTime,
        payableAmount: payableAmount || 0,
        paymentStatus: paymentStatus || "pending",
        isBooked: isBooked || "unconfirmed",
      })
    ) || [];

  const handleCancel = async (id: string) => {
    const toastId = toast.loading("Cancelling booking...");
    try {
      await cancelBooking(id).unwrap();
      toast.success("Booking cancelled successfully.", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel booking.", {
        id: toastId,
      });
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Facility",
      key: "facilityName",
      dataIndex: "facilityName",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Time Slot",
      key: "timeSlot",
      render: (item: TTableData) => `${item.startTime} - ${item.endTime}`,
    },
    {
      title: "Payable Amount",
      key: "payableAmount",
      render: (item: TTableData) => `$${item.payableAmount}`,
    },
    {
      title: "Payment",
      key: "paymentStatus",
      render: (item: TTableData) => (
        <Tag color={item.paymentStatus === "paid" ? "green" : "orange"}>
          {item.paymentStatus.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "isBooked",
      render: (item: TTableData) => {
        const color =
          item.isBooked === "confirmed"
            ? "green"
            : item.isBooked === "canceled"
            ? "red"
            : "gold";
        return <Tag color={color}>{item.isBooked.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "x",
      render: (item: TTableData) => {
        const isCanceled = item.isBooked === "canceled";
        return (
          <Space>
            {!isCanceled && (
              <Popconfirm
                title="Cancel Booking"
                description="Are you sure you want to cancel this booking?"
                onConfirm={() => handleCancel(item.key)}
                okText="Yes, Cancel"
                cancelText="No"
              >
                <Button danger loading={isCancelling} size="small">
                  Cancel
                </Button>
              </Popconfirm>
            )}
            <Link to={`/user/bookings/${item.key}`}>
              <Button size="small">Details</Button>
            </Link>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="" style={{ padding: "1.5rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>My Bookings</h2>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default MyBooking;

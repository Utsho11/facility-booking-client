import { Table, TableColumnsType, Tag } from "antd";
import { useGetAllBookingForAdminQuery } from "../../redux/features/admin/admin.api";

export type TTableData = {
  key: string;
  facilityName: string;
  userName: string;
  userEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount: number;
  paymentStatus: string;
  isBooked: string;
};

const AllBooking = () => {
  const { data: bookingData, isFetching } = useGetAllBookingForAdminQuery();

  const tableData: TTableData[] =
    bookingData?.map(
      ({
        _id,
        facility,
        user,
        date,
        isBooked,
        startTime,
        endTime,
        payableAmount,
        paymentStatus,
      }) => ({
        key: _id,
        facilityName: facility?.name || "Deleted Facility",
        userName: user?.name || "N/A",
        userEmail: user?.email || "N/A",
        date: date || "N/A",
        isBooked: isBooked || "unconfirmed",
        startTime,
        endTime,
        payableAmount: payableAmount || 0,
        paymentStatus: paymentStatus || "pending",
      })
    ) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Facility",
      key: "facilityName",
      dataIndex: "facilityName",
    },
    {
      title: "User",
      key: "userName",
      render: (item: TTableData) => (
        <div>
          <p style={{ margin: 0, fontWeight: 500 }}>{item.userName}</p>
          <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
            {item.userEmail}
          </p>
        </div>
      ),
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
      title: "Amount",
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
      title: "Booking Status",
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
  ];

  return (
    <div className="" style={{ padding: "1.5rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>All Bookings</h2>
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

export default AllBooking;

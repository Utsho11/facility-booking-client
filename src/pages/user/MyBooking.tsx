import React from "react";
import { Button, Popconfirm, Space, Table, TableColumnsType, Tag } from "antd";
import {
  useCancelBookingMutation,
  useGetAllBookingForUserQuery,
} from "../../redux/features/user/user.api";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaReceipt, FaTimesCircle, FaPlus } from "react-icons/fa";

export type TTableData = {
  key: string;
  facilityName: string;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount: number;
  paymentStatus: string;
  isBooked: string;
  transactionId: string;
};

const MyBooking: React.FC = () => {
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
        transactionId,
      }) => ({
        key: _id,
        facilityName: facility?.name || "Sports Arena",
        date: date || "N/A",
        startTime,
        endTime,
        payableAmount: payableAmount || 0,
        paymentStatus: paymentStatus || "pending",
        isBooked: isBooked || "unconfirmed",
        transactionId: transactionId || "",
      })
    ) || [];

  const handleCancel = async (id: string) => {
    const toastId = toast.loading("Cancelling court reservation...");
    try {
      await cancelBooking(id).unwrap();
      toast.success("Reservation cancelled successfully.", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel reservation.", {
        id: toastId,
      });
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Sports Arena",
      key: "facilityName",
      dataIndex: "facilityName",
      render: (text) => <span className="font-bold text-gray-900 dark:text-white">{text}</span>,
    },
    {
      title: "Play Date",
      key: "date",
      dataIndex: "date",
      render: (d) => <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">📅 {d}</span>,
    },
    {
      title: "Time Slot",
      key: "timeSlot",
      render: (item: TTableData) => (
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          ⏰ {item.startTime} — {item.endTime}
        </span>
      ),
    },
    {
      title: "Total Amount",
      key: "payableAmount",
      render: (item: TTableData) => (
        <span className="font-extrabold text-gray-900 dark:text-white">
          ${item.payableAmount}
        </span>
      ),
    },
    {
      title: "Payment",
      key: "paymentStatus",
      render: (item: TTableData) => (
        <Tag color={item.paymentStatus === "paid" ? "green" : "orange"} className="font-bold uppercase text-xs">
          {item.paymentStatus}
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
        return (
          <Tag color={color} className="font-bold uppercase text-xs">
            {item.isBooked}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "x",
      render: (item: TTableData) => {
        const isCanceled = item.isBooked === "canceled";
        return (
          <Space size="small">
            <Link to={`/payment-status?transactionId=${item.transactionId}&status=${item.paymentStatus === "paid" ? "success" : "failed"}`}>
              <Button size="small" icon={<FaReceipt size={11} />} className="rounded-lg text-xs">
                Pass
              </Button>
            </Link>
            {!isCanceled && (
              <Popconfirm
                title="Cancel Reservation"
                description="Are you sure you want to cancel this court booking?"
                onConfirm={() => handleCancel(item.key)}
                okText="Yes, Cancel"
                cancelText="No"
                okButtonProps={{ danger: true }}
              >
                <Button danger loading={isCancelling} size="small" icon={<FaTimesCircle size={11} />} className="rounded-lg text-xs">
                  Cancel
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
      width: "180px",
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Court Reservations
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            View active court passes, match schedules, and transaction receipts.
          </p>
        </div>
        <Link to="/createBooking">
          <Button
            type="primary"
            style={{ backgroundColor: "#FE7D1F" }}
            icon={<FaPlus size={12} />}
            className="h-10 font-bold rounded-xl shadow-md border-none"
          >
            Book New Court
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 8 }}
          scroll={{ x: 750 }}
        />
      </div>
    </div>
  );
};

export default MyBooking;

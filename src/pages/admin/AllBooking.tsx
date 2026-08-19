import React from "react";
import { Table, TableColumnsType, Tag, Button } from "antd";
import { useGetAllBookingForAdminQuery } from "../../redux/features/admin/admin.api";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaReceipt } from "react-icons/fa";

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
  transactionId: string;
};

const AllBooking: React.FC = () => {
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
        transactionId,
      }) => ({
        key: _id,
        facilityName: facility?.name || "Sports Arena",
        userName: user?.name || "N/A",
        userEmail: user?.email || "N/A",
        date: date || "N/A",
        isBooked: isBooked || "unconfirmed",
        startTime,
        endTime,
        payableAmount: payableAmount || 0,
        paymentStatus: paymentStatus || "pending",
        transactionId: transactionId || "",
      })
    ) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Sports Arena",
      key: "facilityName",
      dataIndex: "facilityName",
      render: (name) => <span className="font-bold text-gray-900 dark:text-white">{name}</span>,
    },
    {
      title: "Athlete / Player",
      key: "userName",
      render: (item: TTableData) => (
        <div>
          <p className="font-bold text-gray-900 dark:text-white text-xs m-0">{item.userName}</p>
          <p className="text-[11px] text-gray-400 m-0">{item.userEmail}</p>
        </div>
      ),
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
      title: "Revenue",
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
      title: "Receipt",
      key: "receipt",
      render: (item: TTableData) => (
        <Link to={`/payment-status?transactionId=${item.transactionId}&status=${item.paymentStatus === "paid" ? "success" : "failed"}`}>
          <Button size="small" icon={<FaReceipt size={11} />} className="rounded-lg text-xs">
            Inspect
          </Button>
        </Link>
      ),
      width: "100px",
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Platform Reservations & Revenue Log
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Master registry of all customer court reservations and gateway payments.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
};

export default AllBooking;

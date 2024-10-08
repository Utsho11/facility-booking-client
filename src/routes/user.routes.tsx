import BookingDetailsPage from "../pages/user/BookingDetailsPage";
import MyBooking from "../pages/user/MyBooking";
import UserDashBoard from "../pages/user/UserDashBoard";

export const userPaths = [
  {
    path: "dashboard",
    element: <UserDashBoard />,
  },
  {
    path: "myBookings",
    element: <MyBooking />,
  },
  {
    path: "bookings/:id",
    element: <BookingDetailsPage />,
  },
];

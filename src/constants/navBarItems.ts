export interface TNavItem {
  title: string;
  path: string;
  iconName: "home" | "facilities" | "booking" | "about" | "contact";
}

const navbarItems: TNavItem[] = [
  {
    title: "Home",
    path: "/",
    iconName: "home",
  },
  {
    title: "Explore Arenas",
    path: "/facilities",
    iconName: "facilities",
  },
  {
    title: "Visual Booking Studio",
    path: "/createBooking",
    iconName: "booking",
  },
  {
    title: "About",
    path: "/about",
    iconName: "about",
  },
  {
    title: "Contact",
    path: "/contact",
    iconName: "contact",
  },
];

export default navbarItems;

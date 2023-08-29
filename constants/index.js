import {
  lightModeHome,
  lightModeSearch,
  lightModePlus,
  darkModeSearch,
  darkModePlus,
  darkModeHome,
} from "@/public/svg-icons";

export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Featured", url: "/" },
      { title: "Partnership", url: "/" },
      { title: "Business Relation", url: "/" },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
      { title: "Invite a friend", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Discord", url: "/" },
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];

export const timeOptions = [
  "Midnight",
  "12:30 AM",
  "1:00 AM",
  "1:30 AM",
  "2:00 AM",
  "2:30 AM",
  "3:00 AM",
  "3:30 AM",
  "4:00 AM",
  "4:30 AM",
  "5:00 AM",
  "5:30 AM",
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "Noon",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

export const carTypes = [
  { value: "sport", label: "Sport" },
  { value: "suv", label: "SUV" },
  { value: "mpv", label: "MPV" },
  { value: "sedan", label: "Sedan" },
  { value: "coupe", label: "Coupe" },
  { value: "hatchback", label: "Hatchback" },
];

export const capacities = [
  { value: "2", label: "2 Person" },
  { value: "4", label: "4 Person" },
  { value: "6", label: "6 Person" },
  { value: "8", label: "8 or more" },
];

export const transmissionOptions = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automatic" },
  { value: "semi-automatic", label: "Semi-automatic" },
  { value: "cvt", label: "CVT" },
];

export const fuelCapacityOptions = [
  { value: "40", label: "40 litres" },
  { value: "50", label: "50 litres" },
  { value: "60", label: "60 litres" },
  { value: "80", label: "80 litres or more" },
];

export const typeFilters = [
  "Sport",
  "SUV",
  "MPV",
  "Sedan",
  "Coupe",
  "Hatchback",
];

export const capacityFilters = [
  "2 Person",
  "4 Person",
  "6 Person",
  "8 or More",
];

export const FilterData = [
  {
    label: "type",
    payload: typeFilters,
  },
  {
    label: "capacity",
    payload: capacityFilters,
  },
  {
    label: "price",
    payload: null,
  },
];

export const navButtons = [
  { title: "Home", path: "/", images: [lightModeHome, darkModeHome] },
  {
    title: "Search",
    path: "/search",
    images: [lightModeSearch, darkModeSearch],
  },
  {
    title: "Add Car",
    path: "/cars/new",
    images: [lightModePlus, darkModePlus],
  },
  {
    title: "Profile",
    path: `/profile`,
  },
];

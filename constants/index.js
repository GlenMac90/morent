import {
  lightModeHome,
  lightModeSearch,
  lightModePlus,
  darkModeSearch,
  darkModePlus,
  darkModeHome,
} from '@/public/svg-icons';

export const footerLinks = [
  {
    title: 'About',
    links: [
      { title: 'How it works', url: '/' },
      { title: 'Featured', url: '/' },
      { title: 'Partnership', url: '/' },
      { title: 'Business Relation', url: '/' },
    ],
  },
  {
    title: 'Community',
    links: [
      { title: 'Events', url: '/' },
      { title: 'Blog', url: '/' },
      { title: 'Podcast', url: '/' },
      { title: 'Invite a friend', url: '/' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { title: 'Discord', url: '/' },
      { title: 'Instagram', url: '/' },
      { title: 'Twitter', url: '/' },
      { title: 'Facebook', url: '/' },
    ],
  },
];

export const timeOptions = [
  'Midnight',
  '12:30 AM',
  '1:00 AM',
  '1:30 AM',
  '2:00 AM',
  '2:30 AM',
  '3:00 AM',
  '3:30 AM',
  '4:00 AM',
  '4:30 AM',
  '5:00 AM',
  '5:30 AM',
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  'Noon',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
];

export const carTypes = [
  { value: 'sport', label: 'Sport' },
  { value: 'suv', label: 'SUV' },
  { value: 'mpv', label: 'MPV' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'coupe', label: 'Coupe' },
  { value: 'hatchback', label: 'Hatchback' },
];

export const capacities = [
  { value: '2', label: '2 Person' },
  { value: '4', label: '4 Person' },
  { value: '6', label: '6 Person' },
  { value: '8', label: '8 or more' },
];

export const transmissionOptions = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatic', label: 'Automatic' },
  { value: 'semi-automatic', label: 'Semi-automatic' },
  { value: 'cvt', label: 'CVT' },
];

export const fuelCapacityOptions = [
  { value: '40', label: '40 litres' },
  { value: '50', label: '50 litres' },
  { value: '60', label: '60 litres' },
  { value: '80', label: '80 litres or more' },
];

export const typeFilters = [
  'Sport',
  'SUV',
  'MPV',
  'Sedan',
  'Coupe',
  'Hatchback',
];

export const capacityFilters = [
  "2 Person",
  "4 Person",
  "6 Person",
  "8 or More",
];

export const FilterData = [
  {
    label: 'type',
    payload: typeFilters,
  },
  {
    label: 'capacity',
    payload: capacityFilters,
  },
  {
    label: 'price',
    payload: null,
  },
];

export const navButtons = [
  { title: 'Home', path: '/', images: [lightModeHome, darkModeHome] },
  {
    title: 'Search',
    path: '/search',
    images: [lightModeSearch, darkModeSearch],
  },
  {
    title: 'Add Car',
    path: '/cars/new',
    images: [lightModePlus, darkModePlus],
  },
  {
    title: 'Profile',
    path: `/profile`,
  },
];

export const reviews = [
  'Great car. Real value for money. The car was clean, the fuel tank was full, and it was available on time. ',
  'Solid car with good mileage. I got what I expected, and the return process was smooth.',
  'Not the latest model, but it drove well. Overall, a decent experience with no hitches.',
  'The car performed admirably on our road trip. It has comfortable seats and a smooth drive.',
  'I had some minor issues with the AC. Other than that, the drive was okay.',
  'I loved the car! But I had to wait a bit during pick-up. Still, the driving experience made up for it.',
  'Average car, nothing to rave about. But it got the job done.',
  'Decent experience. The car could use some upgrades, but it was reliable.',
  'I was impressed with the cleanliness. However, the car made some strange noises at high speeds.',
  'Mr Algo was very professional during both pick-up and return. The car itself was in good condition.',
  'A satisfactory experience. The car entertainment system was outdated, but the drive was smooth.',
  'The car was not the one I booked, but it was a decent replacement. No major complaints.',
  'Good value for money. Clean interiors and a full fuel tank. A hassle-free experience.',
  'The pick-up was quick, but the car had some dents. It drove well, though.',
  'I expected more given the price. The car was average, but the service was good.',
  'The car was okay, but the service was outstanding. Kudos to Mr Algo for being so accommodating.',
  'The fuel gauge seemed faulty. I had to refill more often than expected. Otherwise, an okay ride.',
  'A memorable road trip thanks to a comfortable car. I only wish the pick-up location was more convenient.',
  'Smooth drive but the interiors had a weird smell. I had to air it out before heading on our journey.',
  'The service was commendable. However, the car could have been in a better condition.',
];

export const reviewTitles = [
  'Outstanding Car with Efficient Service',
  'Solid Performance with Smooth Return',
  'Old Model but Reliable',
  'Comfortable and Smooth Road Trip Experience',
  'Minor AC Issues',
  'Great Car, A Bit of Wait',
  'Standard Car for Everyday Use',
  'Decent Car, Could Use Upgrades',
  'Clean Car with Noisy Engine',
  'Professional Service with Good Car Condition',
  'Satisfactory Ride with Old Entertainment System',
  'Unexpected Model but Decent Replacement',
  'Hassle-free Experience with Clean Interiors',
  'Quick Pick-up with Minor Dents',
  'Expected More for the Price',
  'Exceptional Service with Average Car',
  'Faulty Fuel Gauge Issue',
  'Comfortable Trip, Inconvenient Pick-up Location',
  'Smooth Drive with Odd Smell',
  'Commendable Service, Car Condition Could Be Better',
];

export const locations = [
  'Edinburgh',
  'Halifax',
  'London',
  'Krakow',
  'Berlin',
  'Madrid',
  'Rome',
  'Kiev',
  'Paris',
  'Bucharest',
  'Budapest',
  'Warsaw',
  'Barcelona',
  'Minsk',
  'Vienna',
  'Hamburg',
  'Munich',
  'Prague',
  'Copenhagen',
  'Dublin',
  'New York City',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
  'Fort Worth',
  'Columbus',
  'San Francisco',
  'Charlotte',
  'Indianapolis',
  'Seattle',
  'Denver',
  'Washington DC',
];

export const shortDescription = [
  'Sleek and stylish.',
  'Compact yet spacious.',
  'A smooth ride.',
  'Fuel-efficient design.',
  'Built for speed.',
  'Sturdy and reliable.',
  'Modern technology inside.',
  "A driver's dream.",
  'Quiet engine hum.',
  'Bold color choices.',
  'Comfortable seating.',
  'Advanced safety features.',
  'Handles turns well.',
  'Impressive acceleration.',
  'Eco-friendly option.',
  'Spacious trunk space.',
  'Luxurious interior touches.',
  'Perfect for road trips.',
  'Great for city drives.',
  'Durable and long-lasting.',
];

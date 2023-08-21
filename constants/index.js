export const adverts = [
  {
    title: "The Best Platform for Car Rental",
    description:
      "Ease of doing a car rental safely and reliably. Of course at a low price.",
    imageSrc: "/pngs/advertWhiteCar.png",
    additionalStyles: "white_car_ad",
    whiteCar: true,
  },
  {
    title: "Easy way to rent a car at a low price",
    description:
      "Providing cheap car rental services and safe and comfortable facilities.",
    imageSrc: "/pngs/advertSilverCar.png",
    additionalStyles: "black_car_ad hidden lg:flex",
    whiteCar: false,
  },
];

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
  'Midnight', '12:30 AM', '1:00 AM', '1:30 AM',
  '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM',
  '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM',
  '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM',
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  'Noon', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
  '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
]

export const typeFilters = [
  'Sport', 'SUV', 'MPV', 'Sedan', 'Coupe', 'Hatchback'
]

export const capacityFilters = [
  '2 Person', '4 Person', '6 Person', '8 or More'
]

export const FilterData = [
  {
    label: 'type',
    payload: typeFilters,
  },
  {
    label: 'capacity',
    payload: capacityFilters
  },
  {
    label: 'price',
    payload: null
  }
]
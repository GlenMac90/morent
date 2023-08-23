import {
  fordRangerImage,
  skodaOctaviaImage,
  trabantImage,
} from "@/public/testCarPictures";

export const dummyReviewList = [
  {
    id: 123,
    ownerId: 321,
    title: "Skoda Octavia",
    imageUrl: skodaOctaviaImage,
    rating: 4,
    review:
      "A lovely car for a good price, a good price, would definitely rent again",
    numberOfReviews: 123,
    date: "22/12/90",
  },
  {
    id: 234,
    ownerId: 432,
    title: "Ford Ranger",
    imageUrl: fordRangerImage,
    rating: 2,
    review:
      "A good car but somebody left a half eaten kilbasa in the glove box and a Die Antwoord CD in the CD player",
    numberOfReviews: 34,
    date: "1/9/2020",
  },
  {
    id: 345,
    ownerId: 543,
    title: "Trabant",
    imageUrl: trabantImage,
    rating: 5,
    review:
      "An iconic collector's item. Thankfully it didn't fall apart. My Grandfather in East Germany had to wait for months on a waiting list to get this car and I'm very glad to have had a chance to drive it",
    numberOfReviews: 7,
    date: "5/10/1991",
  },
];

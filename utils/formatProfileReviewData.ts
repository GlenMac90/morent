export function formatProfileReviewData(data) {
  const formatDate = (date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  return {
    _id: data._id.toString(),
    userId: data.userId.toString(),
    carId: {
      _id: data.carId._id.toString(),
      carTitle: data.carId.carTitle,
      carImages: data.carId.carImages, // Assuming carImages is an array of strings or objects with URLs
    },
    rating: data.rating.toString(),
    title: data.title,
    content: data.content,
    createdAt: formatDate(data.createdAt),
    updatedAt: formatDate(data.updatedAt),
  };
}

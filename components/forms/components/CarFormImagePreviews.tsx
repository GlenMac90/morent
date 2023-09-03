import Image from 'next/image';

interface ImagePreviewProps {
  imagePreviews: string[];
}

const CarFormImagePreviews: React.FC<ImagePreviewProps> = ({
  imagePreviews,
}) => {
  const getImageTitle = (index: number): string => {
    switch (index) {
      case 0:
        return 'Main Image';
      case 1:
        return 'Detail 1';
      case 2:
        return 'Detail 2';
      default:
        return '';
    }
  };

  return (
    <>
      <p className=" text-center font-semibold">Upload Max Three Images</p>
      <div className=" flex justify-between space-x-4">
        {imagePreviews.slice(0, 3).map((preview, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <p className="text-center">{getImageTitle(index)}</p>
            <div className="relative h-24 w-24 overflow-hidden rounded-md border border-black p-2.5">
              <Image
                src={preview}
                alt="Preview"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CarFormImagePreviews;

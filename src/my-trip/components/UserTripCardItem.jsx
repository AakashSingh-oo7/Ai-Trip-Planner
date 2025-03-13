import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const generateImageFilenames = () => {
  const filenames = [];
  for (let i = 1; i <= 56; i++) {
    filenames.push(`img (${i}).jpg`);
  }
  return filenames;
};

const imageFilenames = generateImageFilenames();

function UserTripCardItem({ trip }) {
  const [randomImage, setRandomImage] = useState('');
  const [imageError, setImageError] = useState(false);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageFilenames.length);
    return `/images/${imageFilenames[randomIndex]}`;
  };

  useEffect(() => {
    const imageUrl = getRandomImage();
    setRandomImage(imageUrl);
  }, []);

  const fallbackImage = "/images/fallback.jpg";

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all">
        <img
          src={imageError ? fallbackImage : randomImage}
          alt={trip?.userSelection?.destination || "Trip Image"}
          className="object-cover rounded-xl w-full h-40 md:h-48"
          onError={handleImageError}
        />
        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.destination}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.days} Days trip with {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;

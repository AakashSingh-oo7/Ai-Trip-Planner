import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { FaShareAlt } from "react-icons/fa";

const InfoSection = ({ trip }) => {
  const generateImageFilenames = () => {
    const filenames = [];
    for (let i = 1; i <= 56; i++) {
      filenames.push(`img (${i}).jpg`);
    }
    return filenames;
  };

  const imageFilenames = generateImageFilenames();
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageFilenames.length);
    return `/images/${imageFilenames[randomIndex]}`;
  };

  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
  
    setRandomImage(getRandomImage());
  }, []);

  return (
    <div>
      <img
        src={randomImage}
        alt={trip?.userSelection?.destination || "Trip destination"}
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.destination || "Destination not available"}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              📅 {trip?.userSelection?.days || "N/A"} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💸 {trip?.userSelection?.budget || "N/A"} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              🍷 Traveler : {trip?.userSelection?.travelWith || "N/A"}
            </h2>
          </div>
        </div>
        <Button aria-label="Share this trip">
          <FaShareAlt />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;

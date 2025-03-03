import React from 'react';

const PlacesToVisit = ({ trip }) => {
  const openGoogleMaps = (latitude, longitude, placeName) => {
    const url = `https://www.google.com/maps/search/?api=1&query=$$${encodeURIComponent(
      placeName
    )}&query_place_id=ChIJ${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const getSortedDays = (itinerary) => {
    if (!itinerary) return [];
    return Object.keys(itinerary).sort((a, b) => {
      const dayA = parseInt(a.slice(3));
      const dayB = parseInt(b.slice(3));
      return dayA - dayB;
    });
  };

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      <div className="grid grid-cols-1 gap-5"> {/* Removed md:grid-cols-2 */}
        {getSortedDays(trip?.tripData?.travelPlan?.itinerary).map(
          (day, index) => {
            const dayPlan = trip?.tripData?.travelPlan?.itinerary[day];
            return (
              <div key={index} className="border rounded p-4">
                <h2 className="font-medium text-lg mb-2">{`Day ${day.slice(3)}: ${dayPlan.theme}`}</h2>
                {console.log(day)}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {dayPlan.plan.map((place, placeIndex) => (
                    <div
                      key={placeIndex}
                      className="bg-white rounded-xl shadow-md hover:scale-105 cursor-pointer transition-all p-4"
                      onClick={() =>
                        openGoogleMaps(
                          place.geoCoordinates.latitude,
                          place.geoCoordinates.longitude,
                          place.placeName
                        )
                      }
                    >
                      {place.placeImageUrl && (
                        <img
                          src={place.placeImageUrl}
                          alt={place.placeName}
                          className="rounded-xl w-full h-auto mb-2"
                        />
                      )}
                      <div className="flex-col gap-2">
                        <h2 className="font-medium">{place.placeName}</h2>
                        <p className="text-xs text-gray-500">{place.placeDetails}</p>
                        <div className="my-2">
                          <p className="text-sm">⭐ {place.rating}</p>
                          <p className="text-sm">💰 {place.ticketPricing}</p>
                          <p className="font-medium text-xs text-orange-600">
                            {place.bestTimeToVisit}
                          </p>
                          <p className="text-xs">
                            {place.travelTimeFromHotel || place.travelTimeFromPreviousLocation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default PlacesToVisit;
export const SelectTravelestList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '\u{1F9D4}', // 🧔 - Person with a backpack emoji
        people: '1',
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: '\u{1F469}\u200D\u{1F469}', // 👩‍❤️‍👩 - Couple with heart emoji
        people: '2',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun-loving adventurers',
        icon: '\u{1F46A}', // 👪 - Family emoji
        people: '3 to 10 people',
    },
    {
        id: 4,
        title: 'Friend',
        desc: 'A bunch of thrill-seekers',
        icon: '\u{1F465}', // 👬 - Two men holding hands (friend group)
        people: '5 to 10 people',
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '\u{1F4B0}', // 💰 - Money bag emoji
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '\u{1F4B5}', // 💵 - Dollar bills emoji
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don\'t worry about cost',
        icon: '\u{1F48E}', // 💎 - Gem emoji
    },
];

export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating ,Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format strictly only JSON`;

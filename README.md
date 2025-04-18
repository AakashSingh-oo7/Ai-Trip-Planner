# AI Trip Planner

**AI Trip Planner** is a college minor project that uses artificial intelligence to generate personalized trip plans. The app collects user inputs like destination, budget, number of people, and number of days, then provides detailed recommendations for areas to visit, hotels, attractions, and daily schedules.

## Features

- **Google Authentication:** Secure login via Google.
- **AI-Powered Trip Planning:** Generates detailed itineraries based on user input.
- **View Past Trips:** Access previously created plans from the navbar.
- **Google Maps Integration:** View recommended locations directly on the map.

## Technology Stack

- **Frontend:** Vite, React.js  
- **Backend & Database:** Firebase  
- **APIs:** Genmi API, Google Maps API  
- **Authentication:** Google Auth (React)  
- **HTTP Client:** Axios  
- **Styling:** CDN-based styling  

## Installation

### Prerequisites

- Node.js (v14 or above)  
- npm (v6 or above)  

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/AakashSingh-stack/Ai-Trip-Planner.git
   cd Ai-Trip-Planner

2. Install Dependencies:

npm install


3. Run the Development Server:

npm run dev


4. Firebase Configuration:

Set up Firebase and enable Google Auth.

Update the Firebase configuration file in the project.



5. API Keys:

Configure Genmi API and Google Maps API keys.




Usage

Sign in: Log in with your Google account.

Enter Trip Details: Fill in destination, budget, number of people, and duration.

Generate Plan: Receive a custom trip plan with hotel and sightseeing recommendations.

View Past Trips: Access previous plans via the navbar.

Explore Locations: View locations directly on Google Maps.


API Details

Google Maps API: For map displays and place searches.

Genmi API: For AI-based trip plan generation.

Google Auth API: For user authentication.


Code Structure

/src
  /assets            # Static files
  /components        # Reusable UI components
  /constants         # App-wide constants
  /create-trip       # Trip creation logic and UI
  /lib               # Utility functions
  /my-trip           # User trip history
  /view-trip         # Trip details and itinerary
   App.jsx, index.css, main.jsx
firebaseconfig.jsx   # Firebase setup

Testing

Unit Testing: Jest

Integration Testing: Axios

End-to-End Testing: Cypress


Deployment

1. Build the App:

npm run build


2. Deploy to Firebase:

firebase deploy



Contributing

Contributions are welcome! Please open issues or submit pull requests to improve the project.

License

This project is licensed under the MIT License.

Acknowledgments

Firebase – for backend and authentication

Genmi API – for AI-based trip planning

Google Maps – for location and navigation services


Repository

AI Trip Planner GitHub Repository

---

Let me know if you’d like a version with badges (e.g., Firebase deploy status, license, etc.).

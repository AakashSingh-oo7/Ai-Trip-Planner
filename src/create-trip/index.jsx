import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelestList,
} from "@/constants/opton";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseconfig'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [loading, setLOadng] = useState(false);
  const [openDailog, setOpenDailog] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    travelWith: "", 
  });
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBudgetSelection = (budgetTitle) => {
    setFormData((prevState) => ({
      ...prevState,
      budget: budgetTitle,
    }));
  };

  const handleTravelSelection = (travelWithTitle) => {
    setFormData((prevState) => ({
      ...prevState,
      travelWith: travelWithTitle, // Change 'traveler' to 'travelWith'
    }));
  };

  useEffect(() => {
    window.initMap = () => {
      console.log("GoMaps API loaded successfully!");

      const input = document.getElementById("autocomplete-input");

      if (input) {
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.addListener("place_changed", () => {
          const selectedPlace = autocomplete.getPlace();
          if (selectedPlace.geometry) {
            console.log("Place details:", selectedPlace);
            console.log("Place Label:", selectedPlace.name);
            setPlace(selectedPlace);
            handleInputChange("destination", selectedPlace.name);
          } else {
            console.log("No details available for input: " + input.value);
          }
        });
      }
    };

    if (!window.google || !window.google.maps) {
      console.error("Google Maps API failed to load.");
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }

    const days = Number(formData?.days);
    if (
      !formData?.destination ||
      !formData?.days ||
      !formData?.budget ||
      !formData?.travelWith
    ) {
      toast("Please fill in all required details!");
      return;
    }
    setLOadng(true);

    // Ensure the correct replacement in the prompt
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.destination)
      .replace("{totalDays}", formData?.days)
      .replace("{traveler}", formData?.travelWith)
      .replace("{budget}", formData?.budget);

    console.log("Final Prompt:", FINAL_PROMPT); // Log the full prompt

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLOadng(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLOadng(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLOadng(false);
    navigate(`/view-trip/${docId}`);
  };
  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌳
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <Input
            id="autocomplete-input"
            type="text"
            placeholder="Enter a place"
            className="border p-2 w-full"
            value={formData.destination}
            onChange={(e) => handleInputChange("destination", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            value={formData.days}
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
                onClick={() => handleBudgetSelection(item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelestList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.travelWith === item.title &&
                  "shadow-lg border-black"
                }`}
                onClick={() => handleTravelSelection(item.title)} // Update here
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                <h2 className="text-sm text-gray-500">
                  {" "}
                  Number of people: {item.people}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <img
              src="https://img.icons8.com/?size=100&id=wLdd90QuQjGy&format=png&color=000000"
              className="h-7 w-7 animate-spin"
            />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the app with Google authentication securely.</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <img className="h-7 w-7" src="/google.svg" /> Sign In With
                Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;

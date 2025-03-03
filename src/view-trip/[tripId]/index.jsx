import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore"; // Make sure to import getDoc
import { db } from '@/service/firebaseconfig';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/footer";

const Viewtrip = () => {
    const { tripId } = useParams(); 
    const [Trip, setTrip] = useState([]);

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTrip(docSnap.data());
        } else {
            console.log("No such document!");
            toast.error('No trip found with the provided ID!');
        }
    };

    return (
        <div className='p-10 md:px-20 lg:x-44 xl:px-56'>
            {/* Information section */}
            <InfoSection trip={Trip}/>

            {/* Recomendation Hotel */}
            <Hotels trip={Trip} />

            {/* Daliy plan */}
            <PlacesToVisit trip={Trip}/>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Viewtrip;

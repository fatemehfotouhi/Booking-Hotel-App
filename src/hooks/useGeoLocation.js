import { useState } from "react"

export default function useGeoLocation() {
    const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
    const [userGeoLocation, setUserGeoLocation] = useState({});
    const [errorGeoLocation, setErrorGeoLocation] = useState(null);

    function getUserGeoLocation() {
        if (!navigator.geolocation)
            return setError("Your browser does not support geolocation");
        setIsLoadingGeoLocation(true)
        navigator.geolocation.getCurrentPosition(
            (location) => {
                setUserGeoLocation({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                });
                setIsLoadingGeoLocation(false)
            },
            (err) => {
                setErrorGeoLocation(err.message)
                setIsLoadingGeoLocation(false);
            }
        )
    }
    return { isLoadingGeoLocation, userGeoLocation, errorGeoLocation, getUserGeoLocation }
}
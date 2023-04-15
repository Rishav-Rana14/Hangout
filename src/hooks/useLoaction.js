



import { useEffect,useState } from "react";




const useGeoLocation = () => {

    const [location, setLocation] = useState({ loaded: false, coordinates: { lat: "", lng: "" } })

    const onSuccess = (location) => {
        setLocation({
            loaded: true, coordinates: {
                lat: location.coords.latitude,
                Ing: location.coords.longitude
            }
        })

    }

    const onError = (error) => {
        setLocation({
            loaded: true,
            error
        })

    }

    // cator

    useEffect(() => {

        if (!("geolocation" in navigator)) {

            onError({

                code: 0,

                message: "Geolocation not supported",
            },)

            // setLocation((state) =›({

            //     ...state, loaded: true,


            // }))
        } 

        navigator.geolocation.getCurrentPosition(onSuccess, onError)


    }, [])

    return location;
}

export default useGeoLocation;


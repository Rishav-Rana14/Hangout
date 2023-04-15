// import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

const Location = ({ data }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDP0fuhmcRSsreQdZNezEAmymZpGYbqWxY",
    libraries: ["places"],
  });

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  const latLong = reactLocalStorage.get("latLong", false);
  let parseData = JSON.parse(latLong);

  const User_Details = reactLocalStorage.get("User_Details", false);
  let parseDataUser_Details = JSON.parse(User_Details);

  console.log("navsddsvn", data);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);

  useEffect(() => {
     
      const datat = async () => {
        if (!parseData?.coordinates?.lat && !parseData?.coordinates?.Ing) {
          if (
            originRef?.current?.value === "" ||
            destiantionRef?.current?.value === ""
          ) {
            return;
          }
        } else {
          // eslint-disable-next-line no-undef
          const directionsService = new google.maps.DirectionsService();
          const results = await directionsService.route({
            // origin: originRef.current.value,
            origin: `${parseData?.coordinates?.lat}, ${parseData?.coordinates?.Ing}`,

            // destination: destiantionRef.current.value,
            destination: `${parseDataUser_Details?.latitude}, ${parseDataUser_Details?.longitude}`,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
          });

          console.log("dshgdfhdjs", originRef.current.value);

          setDirectionsResponse(results);
          setDistance(results.routes[0].legs[0].distance.text);
          setDuration(results.routes[0].legs[0].duration.text);
        }
      };
      if (parseDataUser_Details && parseData) {
        datat();
    }

     
  }, [parseData,parseDataUser_Details]);

  function showPosition(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }

  const center = { lat: lat, lng: long };

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const calculateRoute = async () => {
    // if (!parseData?.coordinates?.lat && !parseData?.coordinates?.Ing) {
    //   if (
    //     originRef?.current?.value === "" ||
    //     destiantionRef?.current?.value === ""
    //   ) {
    //     return;
    //   }
    // } else {
    //   // eslint-disable-next-line no-undef
    //   const directionsService = new google.maps.DirectionsService();
    //   const results = await directionsService.route({
    //     // origin: originRef.current.value,
    //     origin: `${parseData?.coordinates?.lat}, ${parseData?.coordinates?.Ing}`,
    //     // destination: destiantionRef.current.value,
    //     destination: `${parseDataUser_Details?.latitude}, ${parseDataUser_Details?.longitude}`,
    //     // eslint-disable-next-line no-undef
    //     travelMode: google.maps.TravelMode.DRIVING,
    //   });
    //   console.log("dshgdfhdjs", originRef.current.value);
    //   setDirectionsResponse(results);
    //   setDistance(results.routes[0].legs[0].distance.text);
    //   setDuration(results.routes[0].legs[0].duration.text);
    // }
  };

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>

            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          {/* <ButtonGroup>
            <Button
              colorScheme="pink"
              type="submit"
             >
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup> */}
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
};

export default Location;

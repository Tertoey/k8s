import React, { useState, useEffect } from "react";
import moment from "moment";

function User() {
  const [data, setData] = useState("");
  const [os, setOs] = useState("");

  async function fetchData() {
    try {
      const res = await fetch(`http://192.168.1.77:30002/sensors`);
      // const res = await fetch(`https://kubernetes-p211.vercel.app/am319`)
      const result = await res.json();
      setData(result.result[0]);
      setOs(result.Server);
      console.log(result.result[0], result.Server);
      // setData(result.result[0])
      // console.log(result.result[0].Temperature)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 15000); // 10000 milliseconds = 10 seconds
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div>
      <h3>Temperature sensors</h3>
      {!data.Temperature ? (
        <p>Loading Data....</p>
      ) : (
        <>
          <p>
            Last update:{" "}
            {(data?.Timestamp).replace(/T/, " ").replace(/\..+/, "")}
          </p>
          <p>Temperature: {data?.Temperature}</p>
          <p>Humidity: {data?.Humidity}</p>
        </>
      )}
      {!os ? (
        <p>Loading OS Data....</p>
      ) : (
        <>
          <p>From server: {os}</p>
        </>
      )}
    </div>
  );
}

export default User;

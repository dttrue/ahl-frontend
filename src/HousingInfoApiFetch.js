import React, { useState } from "react";

const fetchData = async (input, inputType) => {
  const baseUrl = "https://data.cityofnewyork.us/resource/hg8x-zxpr.json";
  let url = "";

  if (inputType === "postcode") {
    url = `${baseUrl}?postcode=${encodeURIComponent(input)}`;
  } else {
    url = `${baseUrl}?borough=${encodeURIComponent(input.toUpperCase())}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return { data: null, error: error.message };
  }
};

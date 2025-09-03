import React from "react";
import { useState, useEffect } from "react";

export const useData = (type) => {
  const [items, setItems] = useState(null);
  {
    /*  useState null permite que items se inicialize como null, podendo receber tipos de dados como por exemplo um array ou um objeto, ou número ou string. */
  }
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRjM2ZlOWIyZGQ5YmQxNTQzYzhlZWRiYTU0ZTkzMSIsIm5iZiI6MTc0MjE1NzE2My4wMjksInN1YiI6IjY3ZDczNTZiMzE1MzhkZTYwOGYxYmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1NFgZQFkQCTa6A5ffKDJXyLcmnKxXKA2xoTRTViHcE", // Replace with your Bearer token
        },
      };

      setIsLoading(true);

      try {
        const data = await fetch(`https://api.themoviedb.org/3/${type}`, options);
        const newDataList = await data.json();
        console.log("new " + `${type}` + " list", newDataList);
        setItems(newDataList.results || newDataList); // Se newDataList.results for undefined, usa newDataList
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [type]);

  return { items, isLoading };
};

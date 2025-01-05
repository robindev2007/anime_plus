"use client";
import React, { useEffect } from "react";
import axios from "axios";

function Text() {
  useEffect(() => {
    const get = async () => {
      const data = await axios.get("/api/anime/trending?page=3", {});

      console.log(data);
    };

    get();
  }, []);
  return <div></div>;
}

export default Text;

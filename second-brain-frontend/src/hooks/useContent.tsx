import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useContents = () => {
  const [contents, setContents] = useState([]);

  function refresh() {
    axios
      .get(`${BACKEND_URL}/content/api/v1/getAllContent`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setContents(response.data);
      });

  }

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { refresh, contents };
};

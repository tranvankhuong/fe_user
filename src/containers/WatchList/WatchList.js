/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  deleteWatchItem,
  getWatchList,
} from "../../services/watchlist.service";

function WatchList() {
  const [watchs, setWatchs] = React.useState(null);
  const [change, setChange] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    async function getWatchs() {
      const res = await getWatchList();
      if (res.status === 201) {
        console.log(res.data);
        setWatchs(res.data);
      } else {
        console.log(res.message);
        setMessage(res.message);
      }
    }

    getWatchs();
    return () => {};
  }, [change]);

  const handleDelete = React.useCallback((courseID) => {
    const res = deleteWatchItem(courseID);
    res
      .then((res) => {
        if (res.status === 201) {
          setMessage(res.message);
          setChange(!change);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  return <div></div>;
}

export default WatchList;

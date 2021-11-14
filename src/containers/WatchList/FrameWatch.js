import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppProvider";
import {
  deleteWatchItem,
  getWatchList,
} from "../../services/watchlist.service";
import WatchItem from "./WatchItem";

function FrameWatch() {
  const [watchs, setWatchs] = React.useState(null);
  const { changeWish, setChangeWish } = React.useContext(AppContext);
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
  }, [changeWish]);

  const handleDelete = React.useCallback(
    (courseID) => {
      const res = deleteWatchItem(courseID);
      res
        .then((res) => {
          if (res.status === 201) {
            setMessage(res.message);
            setChangeWish(!changeWish);
          }
        })
        .catch((error) => console.error(error));
    },
    [changeWish, setChangeWish]
  );

  return (
    <div className="watch-nav frame-watch">
      <div style={{ position: "relative" }}>
        <div className="arrow-up"></div>
        <div
          className="form-wh"
          style={{
            background: "#fff",
          }}
        >
          <div className="top">Watch List</div>
          <ListGroup className="content">
            {watchs?.map((item) => (
              <WatchItem
                key={item.course_id}
                item={item}
                handleDelete={handleDelete}
              />
            ))}
          </ListGroup>
          <div className="footer">
            <span style={{ marginTop: 5 }}>{`${
              watchs?.length | 0
            } Course`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrameWatch;

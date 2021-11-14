import React, { useContext } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import CourseContext from "../courseContext";
import emptyCourse from "../../../assets/images/emptyCourse.jpg";
import { addToWatchList } from "../../../services/watchlist.service";
import { AppContext } from "../../../contexts/AppProvider";
export default function CourseImage() {
  const { store } = useContext(CourseContext);
  const { changeWish, setChangeWish } = useContext(AppContext);
  const btnWishList_Clicked = () => {
    const res = addToWatchList(store?.course?.course_id);
    res
      .then((res) => {
        console.log(res);
        setChangeWish(!changeWish);
      })
      .catch((error) => console.error(error));
  };
  return (
    <Card border="light" style={{ width: "350px" }}>
      <Card.Img
        className="card-img-img"
        variant="top"
        src={
          store.course.course_image
            ? "https://bct-onlinecourses-be.herokuapp.com/uploads/images/" +
              store.course.course_image
            : emptyCourse
        }
      />
      <Card.Body className="card-img-body">
        <Row>
          <Col>
            <Card.Text>
              Share:
              {/* <Button variant="primary">Primary</Button>{' '} */}
              <FacebookShareButton>
                <FacebookIcon size={32} round={true}></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton>
                <TwitterIcon size={32} round={true}></TwitterIcon>
              </TwitterShareButton>
              <EmailShareButton>
                <EmailIcon size={32} round={true}></EmailIcon>
              </EmailShareButton>
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              <a className="btn" onClick={() => btnWishList_Clicked()}>
                <FontAwesomeIcon
                  icon={faHeart}
                  size="lg"
                  color="red"
                  className="heart_hv"
                ></FontAwesomeIcon>
              </a>
              Wishlist({store.course.totalWishList})
            </Card.Text>
          </Col>
        </Row>
        {/* <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                </Card.Text> */}
      </Card.Body>
      {/* <Card.Footer className="card-img-footer">
                <small className="text-muted">Some thing some thing</small>
            </Card.Footer> */}
    </Card>
  );
}

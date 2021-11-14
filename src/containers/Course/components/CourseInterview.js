/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import CourseContext from "../courseContext";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes } from "@fortawesome/free-regular-svg-icons";
import Rating from "react-rating";
import { getFormattedDate } from "../../../services/common.service";
import { addToCart } from "../../../services/cart.service";
import { AppContext } from "../../../contexts/AppProvider";
import { useHistory } from "react-router-dom";
export default function CourseInterview() {
  const history = useHistory();
  const initialRating = 5;
  // Bạn dùng biến mesage này để hiển thị thông tin tạo thành công
  const [message, setMessage] = React.useState(null);
  const { store } = useContext(CourseContext);
  const { changeCart, setChangeCart } = useContext(AppContext);
  const btnRatingClicked = () => {
    console.log("Btn rating clicked");
    console.log(store);
  };
  const btnAddCart = () => {
    const res = addToCart(store.course.course_id);
    res
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          setMessage(res.data.message);
          setChangeCart(!changeCart);
        }
      })
      .catch((error) => console.error(error));
  };

  const btnAddCheckout = () => {
    const res = addToCart(store.course.course_id);
    res
      .then((res) => {
        if (res.status === 201) {
        }
      })
      .catch((error) => console.error(error));
    history.push("/checkout");
  };

  return (
    <div>
      <h1 className="course-name">{store.course.course_name}</h1>
      <h4 className="course-title">{store.course.course_shortdescription}</h4>
      <div>
        <h4>
          Rating: {store.course.averageRating}
          <a className="btn" onClick={() => btnRatingClicked()}>
            <Rating
              className="course-rating"
              emptySymbol="fa fa-star-o fa-sm"
              fullSymbol="fa fa-star fa-sm"
              fractions={10}
              initialRating={store.course.averageRating}
              readonly="true"
            ></Rating>
          </a>
          <span>({store.course.totalReview} ratings)</span>
        </h4>

        <div>{store.course.totalStudent} students</div>
        <div>Created By {store.lecturer.username}</div>
        <div>
          <span>
            <FontAwesomeIcon icon={faCalendarTimes}></FontAwesomeIcon> Last
            Updated: {getFormattedDate(store.course.last_update)}
          </span>
        </div>
        <div>
          <h5 style={{paddingBottom:"10px",paddingTop:"10px"}}>Price: {parseInt(store.course.price*(1-store.course.saleoff))}VND <del class="badge badge-secondary">{store.course.price} VND</del> <span class="badge badge-warning">{store.course.saleoff*100}% off</span></h5>
          <Button variant="primary" onClick={() => btnAddCart()}>
            Add to cart
          </Button>{" "}
          <Button variant="success" onClick={() => btnAddCheckout()}>
            Buy Course
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";

function CourseItem({ course, index }) {
  return (
    <tr>
      <td align="center" className="number-product-table">
        <span className="font-19 color-blue-light">{index + 1}</span>
      </td>
      <td align="left" className="item-product-table">
        <a
          href="#asdsd"
          className="img-product-item-cart"
          style={{
            backgroundImage: `url('https://bct-onlinecourses-be.herokuapp.com/uploads/images/${course.course_image}')`,
          }}
          tabIndex="0"
        ></a>
        <h2 className="title-product-item-product-cart font-19 font-bold color-blue">
          <a href="#asAS">{course.course_name}</a>
          <span className="quantity-item-checkout-table font-14 color-blue-light">
            Quantity: 1
          </span>
        </h2>
      </td>
      <td align="right" className="price-item-cart">
        <span className="font-14 font-bold color-blue-light value-price-item-cart">
          ${course.price}
        </span>
      </td>
    </tr>
  );
}

export default CourseItem;

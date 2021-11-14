import React from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function WatchItem({ item, handleDelete }) {
  return (
    <ListGroup.Item>
      <Row>
        <Col lg={3} md={3}>
          <img
            src={`https://bct-onlinecourses-be.herokuapp.com/uploads/images/${
              item.course_image
            }`}
            style={{ width: "100%" }}
            alt={`${item.course_name}`}
          />
        </Col>
        <Col lg={7} md={7}>
          <Link to={`/courses/${item.course_id}`}>
            <h2 style={{ fontSize: "14px" }}>{item.course_name}</h2>
            <p
              style={{ fontSize: "13px", color: "#d82a4e" }}
            >{`$${item.price}`}</p>
          </Link>
        </Col>
        <Col lg={2} md={2} style={{ textAlign: "center" }}>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(item.course_id)}
          >
            <i class="fa fa-times-circle" aria-hidden="true"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default WatchItem;

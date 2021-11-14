import { Button, Row, Col } from "react-bootstrap";
import React from "react";
import { useHistory } from "react-router";

function Frame() {
  const history = useHistory();
  const btnAddToCart_Clicked = (e)=>{
    alert(1);
    history.push("/");
    
  }
  const btnAddToWishList_Clicked = (e)=>{
  }

  return (
    <div className="frame">
      <div style={{ position: "relative" }}>
        <div className="arrow-up"></div>
        <div
          className="form-wh"
          style={{
            background: "#fff",
          }}
        >
          <div className="footer">
            <Button variant="warning" class="hvr-grow" onClick={(e)=>btnAddToCart_Clicked(e)}><i class="fa fa-cart-plus" aria-hidden="true">Cart</i></Button>

            <Button  variant="danger" class="hvr-grow" onClick={(e)=>btnAddToWishList_Clicked(e)}><i class="fa fa-heart" aria-hidden="true">Wishlist</i></Button>

            </div>
          
        </div>
      </div>
    </div>
  );
}

export default Frame;

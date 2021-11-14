/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import "./assets/index.css";
import neteller from "./assets/images/neteller-checkbox.png";
import skrill from "./assets/images/skrill-checkbox.png";
import paypal from "./assets/images/paypal-checkbox.png";
import visa from "./assets/images/visa-checkbox.png";
import paysafe from "./assets/images/paysafe-checkbox.png";
import bitcoin from "./assets/images/bitcoin-checkbox.png";
import { getCartList } from "../../services/cart.service";
import { setMySubscribeCourses } from "../../services/course.service";

import CourseItem from "./components/CourseItem";

import Swal  from "sweetalert2";
import { useHistory } from "react-router";
//import { coursesSearchAll } from "../../../../backend1/models/course.model";



function Checkout() {
  const [cartList, setCartList] = React.useState(null);
  const history = useHistory();
  React.useEffect(() => {
    async function getCarts() {
      const res = await getCartList();
      if (res.status === 201) {
        setCartList(res.data);
      }
    }

    getCarts();
    return () => {};
  }, []);
  const total = React.useMemo(() => {
    let total = 0;
    cartList?.forEach((cart) => (total += cart.price));
    
    //console.log(cartList);
    return total;
  }, [cartList]);
  const btnOrderNow_Clicked =async () =>{
    const courseIdList = cartList.map (c=> c.course_id);
    console.log(courseIdList);
    const res = await setMySubscribeCourses(courseIdList);
    if(res.status  === 200){
      Swal.fire({
        title: "Purchasing Course Successfully",
        icon:"success"
      })
      history.push("/mysubcribecourses");
    }else{
      Swal.fire({
        title: "Purchasing Course Successfully",
        text:`${res.data.message}`,
        icon:"success"
      })
    }
  }

  return (
    <main id="main-section" style={{ marginBottom: "3em" }}>
      <div className="main-conten content_page_checkout" id="content-layout">
        <div className="box-content">
          <section className="section-content-main">
            <div className="container">
              <form className="form-checkout-main" action="">
                <div className="padding-top-60">
                  <h2
                    className="color-blue font-34 wow fadeInUp"
                    data-delay="0.5s"
                  >
                    Check Out
                  </h2>
                  <div className="row row-eq-height justify-content-center align-items-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 row-cart-content wow fadeInUp">
                      <div className="box-cart-page bg-white">
                        <div className="table-default-page">
                          <div className="table-responsive">
                            <table className="table table-cart table-checkout-page detail-table-default">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    style={{ width: "10%" }}
                                    className="text-left th-number-cart"
                                  >
                                    Number
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-left th-item-cart"
                                  >
                                    Item
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-right th-price-item-cart"
                                  >
                                    Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {cartList?.map((item, index) => (
                                  <CourseItem
                                    key={item.id}
                                    course={item}
                                    index={index}
                                  />
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="bottom-infor-cart col-12 col-sm-12 col-md-7 col-lg-5">
                            <div className="row-bottom-cart-table">
                              <div className="form-counpon-box">
                                <span className="font-14 color-blue txt-coupon-form">
                                  Discount Coupon
                                </span>
                                <div className="form-inline">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control input-fullwidth"
                                      id="input-coupon"
                                      placeholder="e.x SALEOFF0613"
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Apply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row-total-cart-table">
                        <div className="bottom-infor-cart col-12 col-sm-12 col-md-7 col-lg-5">
                          <div className="row-bottom-cart-table">
                            <div className="sub-total-table">
                              <h2 className="font-14 color-blue title-total-checkout">
                                Payment Fee (7,00 %)
                              </h2>
                              <h2 className="font-14 font-bold color-blue value-total-checkout">
                                +$2
                              </h2>
                            </div>
                          </div>
                          <div className="row-bottom-cart-table">
                            <div className="sub-total-table">
                              <h2 className="font-19 font-bold color-blue title-total-checkout">
                                Total
                              </h2>
                              <h2 className="font-24 font-bold color-orange value-total-checkout">
                                ${total}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="padding-top-60">
                  <h2
                    className="color-blue font-34 wow fadeInUp"
                    data-delay="0.5s"
                  >
                    Choose Your Payment
                  </h2>
                  <div className="row row-eq-height justify-content-center align-items-center">
                    <div className="col-12 col-sm-12 col-md-7 col-lg-6 row-payment-content wow fadeInUp">
                      <div className="box-payment-checkout bg-white padding-40">
                        <div className="main-payment-choose">
                          <div className="payment-choose row justify-content-center align-items-center">
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 row-detail-payment-content">
                              <div className="payment-radio paypal-payment-radio">
                                <div className="custom-control custom-checkbox-payment">
                                  <input
                                    type="radio"
                                    name="payment-method"
                                    className="custom-control-input"
                                    id="paypal"
                                    value="paypal"
                                    onChange={(e) => {
                                      console.log(e.target.checked);
                                    }}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="paypal"
                                    style={{
                                      backgroundImage: `url('${paypal}')`,
                                    }}
                                  ></label>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 row-detail-payment-content">
                              <div className="payment-radio visa-payment-radio">
                                <div className="custom-control custom-checkbox-payment">
                                  <input
                                    type="radio"
                                    name="payment-method"
                                    className="custom-control-input"
                                    value="visa"
                                    id="visa"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="visa"
                                    style={{
                                      backgroundImage: `url('${visa}')`,
                                    }}
                                  ></label>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 row-detail-payment-content">
                              <div className="payment-radio paysafe-payment-radio">
                                <div className="custom-control custom-checkbox-payment">
                                  <input
                                    type="radio"
                                    name="payment-method"
                                    className="custom-control-input"
                                    value="paysafe"
                                    id="paysafe"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="paysafe"
                                    style={{
                                      backgroundImage: `url('${paysafe}')`,
                                    }}
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="payment-choose row justify-content-center align-items-center">
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 row-detail-payment-content">
                              <div className="payment-radio bitcoin-payment-radio">
                                <div className="custom-control custom-checkbox-payment">
                                  <input
                                    type="radio"
                                    name="payment-method"
                                    className="custom-control-input"
                                    id="bitcoin"
                                    value="bitcoin"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="bitcoin"
                                    style={{
                                      backgroundImage: `url('${bitcoin}')`,
                                    }}
                                  ></label>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 row-detail-payment-content">
                              <div className="payment-radio skrill-payment-radio">
                                <div className="custom-control custom-checkbox-payment">
                                  <input
                                    type="radio"
                                    name="payment-method"
                                    className="custom-control-input"
                                    value="skrill"
                                    id="skrill"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="skrill"
                                    style={{
                                      backgroundImage: `url('${skrill}')`,
                                    }}
                                  ></label>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 row-detail-payment-content">
                              <div className="payment-radio neteller-payment-radio">
                                <div className="custom-control custom-checkbox-payment">
                                  <input
                                    type="radio"
                                    name="payment-method"
                                    className="custom-control-input"
                                    value="neteller"
                                    id="neteller"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="neteller"
                                    style={{
                                      backgroundImage: `url('${neteller}')`,
                                    }}
                                  ></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="des-payment-choose">
                          <p className="font-12 font-ita">
                            As soon as you push the confirm order button you
                            will be forwarded to Paypal. Afterwards, please
                            follow the further instructions from Paypal and
                            process the payment. Please take care that you get
                            forwarded by Paypal back to us which completes the
                            order.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-5 col-lg-6 row-btn-order-content wow fadeInUp">
                      <div className="box-btn-checkout">
                        <h2 className="color-blue font-34 text-center  fadeInUp">
                          Confirm Order
                        </h2>
                        <p className="agreen-order-checkout text-center color-blue font-14 wow fadeInUp">
                          By Click Order, You accept our{" "}
                          <a className="color-orange" target="_blank" href="#">
                            Terms
                          </a>{" "}
                          and{" "}
                          <a className="color-orange" target="_blank" href="#">
                            Policies
                          </a>
                        </p>
                        <p className="btn-order-checkout text-center form-default-submit wow fadeInUp">

                        <button type="button" class="btn btn-primary" onClick = {btnOrderNow_Clicked} >
                            Order Now
                        </button>

                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}


export default Checkout;

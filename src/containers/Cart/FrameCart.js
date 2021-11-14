import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppProvider";
import { deleteCartItem, getCartList } from "../../services/cart.service";
import CartItem from "./CartItem";

function FrameCart() {
  const [message, setMessage] = React.useState("");
  const [carts, setCarts] = React.useState(null);

  const { changeCart, setChangeCart } = React.useContext(AppContext);

  React.useEffect(() => {
    async function getCarts() {
      const res = await getCartList();
      if (res.status === 201) {
        setCarts(res.data);
        console.log(res.data);
      } else {
        // Thông báo những lỗi xảy ra
      }
    }

    getCarts();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeCart]);

  //   Hàm dùng để xóa một phần tử trong carts
  const handleDelete = React.useCallback(
    (courseID) => {
      const list = [...carts];
      const res = deleteCartItem(courseID);
      res
        .then((res) => {
          if (res.status === 201) {
            setMessage(res.data.message);
            const index = list.findIndex((item) => item.course_id === courseID);
            if (index !== -1) {
              list.splice(index, 1);
              setCarts([...list]);
            }
            setChangeCart(!changeCart);
          } else {
            setMessage(res.data.err);
          }
        })
        .catch((error) => console.error(error));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [carts, changeCart]
  );

  return (
    <div className="frame-cart">
      <div style={{ position: "relative" }}>
        <div className="arrow-up"></div>
        <div
          className="form-wh"
          style={{
            background: "#fff",
          }}
        >
          <div className="top">Cart List</div>
          <ListGroup className="content">
            {carts?.map((item) => (
              <CartItem
                key={item.course_id}
                item={item}
                handleDelete={handleDelete}
              />
            ))}
          </ListGroup>
          <div className="footer">
            <span style={{ marginTop: 5 }}>{`${
              carts?.length | 0
            } Course`}</span>
            <Link to="/checkout" className="btn btn-primary">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrameCart;

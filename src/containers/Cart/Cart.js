import React from "react";
import { AppContext } from "../../contexts/AppProvider";
import { deleteCartItem, getCartList } from "../../services/cart.service";

function Cart() {
  const [message, setMessage] = React.useState("");
  const [carts, setCarts] = React.useState(null);
  const [change, setChange] = React.useState(false);

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
  }, [change]);

  //   Hàm dùng để xóa một phần tử trong carts
  const handleDelete = (courseID) => {
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
          setChange(!change);
        } else {
          setMessage(res.data.err);
        }
      })
      .catch((error) => console.error(error));
  };

  // Tổng số tiền trong cart
  const total = React.useMemo(() => {
    let total = 0;
    carts.forEach((element) => {
      total += element.course_price;
    });
    return total;
  }, [carts]);
  return <div></div>;
}

export default Cart;

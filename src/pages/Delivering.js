import React, { useState, use } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faArrowAltCircleUp,
  faBook,
  faBookBookmark,
  faBoxesPacking,
  faCaretDown,
  faCheckToSlot,
  faFileCirclePlus,
  faHome,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBook, addListBook } from "../redux/orderSlice";
import { useEffect } from "react";
import { logout } from "../redux/userSlice";
import moment from "moment";
import { currencyFormat } from "../ultils/constant";
import StatusBill from "../components/StatusBill";
import { Tooltip } from "recharts";
import { url } from "../config/api";

export default function Delivering() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;
  console.log("itemDetail...", itemDetail);
  const newDate = new Date(itemDetail?.createDate[6]);
  const createdDateDetail = moment(newDate).format("YYYY-MM-DD");
  const [successBill, setSuccessBillState] = useState(null);
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    getSuccessBillApi();
  }, []);
  const getSuccessBillApi = async () => {
    try {
      const res = await customAxios.get("/admin/bill/delivering");
      setSuccessBillState(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };
  console.log("suBill...", successBill);
  // const [editBook, seteditBook] = useState(bookState);
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
  //   const newData = {
  //     data: {
  //       auth: authorBook,
  //       bookImage: itemDetail?.bookImage,
  //       bookName: nameBook,
  //       category: genreBook,
  //       description: descriptionBook,
  //       price: itemDetail?.price,
  //       publisher: issueBook,
  //     },
  //     updateFields: [
  //       "auth",
  //       "bookImage",
  //       "bookName",
  //       "category",
  //       "description",
  //       "price",
  //       "publisher",
  //     ],
  //   };
  //   const response = await customAxios.post(
  //     `/lbm/v1/book/info/update?id=${bookId}`,
  //     newData
  //   );
  //   // seteditBook(response.data);
  //   navigate("/bookList");
  //   console.log("testdata", response.data);
  // };

  // const handleCancel = (e) => {
  //   navigate("/bookList");
  // };

  const params = useParams();
  const bookId = params.bookId;
  // useEffect(() => {
  //   editBookItem();
  // }, []);
  // const editBookItem = async () => {
  //   try {
  //     const dataBook = await customAxios.get(`/bookList/${bookId}`);
  //     seteditBook(dataBook.data);
  //     console.log("id: ", bookId);
  //   } catch (error) {
  //     console.log("Lỗi: ", error);
  //   }
  // };
  const goToDetail = (id) => {
    navigate("/orderList/" + id);
  };
  const handleClickSuccess = async (id) => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   delivered: true,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch(`${url}/admin/bill/set-delivered?id=${id}`, requestOptions)
    //   .then((response) => response.text())
    //   .then(
    //     (result) => alert("Giao hàng thành công"),
    //     navigate("/successDeliver")
    //   )
    //   .catch((error) => console.log("error", error));
    try {
      await customAxios.post(`/admin/bill/set-delivered?id=${id}`);
      getSuccessBillApi();
      alert("Giao hàng thành công");
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-2" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">Sport 9</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link
                  className="nav-link"
                  type="button"
                  to="/"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>

                <div
                  className="dropdown product nav-link"
                  style={{ color: "white" }}
                >
                  <div
                    className="dropdown-btn"
                    onClick={(e) => setisActiveProduct(!isActiveProduct)}
                  >
                    <FontAwesomeIcon icon={faFileCirclePlus} /> Quản lý sản phẩm
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ paddingLeft: "10px" }}
                    />
                  </div>
                  {isActiveProduct && (
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/productList"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {/* <FontAwesomeIcon icon={faHome} /> */}
                          Tất cả sản phẩm
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/addProduct"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {/* <FontAwesomeIcon icon={faHome} /> */}
                          Thêm sản phẩm
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="dropdown order nav-link"
                  style={{ color: "white" }}
                >
                  <div
                    className="dropdown-btn"
                    onClick={(e) => setisActiveOrder(!isActiveOrder)}
                  >
                    <FontAwesomeIcon icon={faBoxesPacking} /> Quản lý đơn hàng
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ paddingLeft: "10px" }}
                    />
                  </div>
                  {!isActiveOrder && (
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/orderList"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Tất cả đơn hàng
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/successDeliver"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng thành công
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link active"
                          type="button"
                          to="/deliveringBill"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng đang giao
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/confirmBill"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng chờ duyệt
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* <Link
                className="nav-link"
                type="button"
                to="/productList"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faFileCirclePlus} /> Quản lý sản phẩm
              </Link>
              <Link
                className="nav-link"
                type="button"
                to="/bookList"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faBoxesPacking} /> Quản lý đơn hàng
              </Link> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-10" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <h5 className="content-account">
                <Button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Thoát
                </Button>
              </h5>
            </div>

            <div className="control-addReader container">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4
                  className="ml-0 mt-0"
                  style={{ color: "black", textAlign: "center" }}
                >
                  Đơn hàng đang giao
                </h4>
                <table className="table recently-violated">
                  <thead>
                    <tr>
                      <th scope="col">Tài khoản mua</th>
                      <th scope="col">Sản phẩm</th>
                      <th scope="col">Tổng đơn hàng</th>
                      <th scope="col">Trạng thái đơn</th>
                      <th scope="col"></th>
                      {/* <th scope="col">Tác giả</th> */}
                      {/* <th scope="col">Giao thành</th> */}
                    </tr>
                  </thead>
                  <tbody id="myTable">
                    {successBill?.map((item, index) => (
                      <tr>
                        <td>{item?.bill?.userInfo?.username}</td>
                        <td onClick={() => goToDetail(item?.bill?.id)}>
                          {item?.billItems[0]?.item?.name} x{" "}
                          {item?.billItems[0]?.quantity}
                        </td>
                        <td>{currencyFormat(item?.bill?.totalPrice)}</td>
                        <td>
                          <StatusBill deli={item?.bill?.delivered} />
                        </td>
                        <td>
                          <button
                            onClick={() => handleClickSuccess(item?.bill?.id)}
                            type="button"
                            className="btn btn-success btn-xs"
                            data-toggle="modal"
                            data-target="#delModal"
                          >
                            <span
                              className={{
                                dataToggle: Tooltip,
                                title: "Thành công",
                              }}
                            >
                              <FontAwesomeIcon icon={faCheckToSlot} /> Giao hàng
                              thành công
                              {/* Hủy */}
                            </span>
                          </button>
                        </td>
                        {/* <td>
                          <button
                            onClick={() => goToDetail(item.id)}
                            type="button"
                            className="btn btn-primary btn-xs"
                            data-toggle="modal"
                            data-target="#moreModal"
                            variant="primary"
                          >
                            <span
                              className={{
                                dataToggle: Tooltip,
                                title: "Xem thêm",
                              }}
                            >
                              <FontAwesomeIcon icon={faStickyNote} />
                            </span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-xs"
                            data-toggle="modal"
                            data-target="#editModal"
                            variant="primary"
                            onClick={() => handleConfirm(item.id, item)}
                          >
                            <span
                              className={{
                                dataToggle: Tooltip,
                                title: "Chỉnh sửa",
                              }}
                            >
                              <FontAwesomeIcon icon={faPencilSquare} />
                            </span>
                          </button>
                          <button
                            onClick={() => handleClickDelete(item?.bill?.id)}
                            type="button"
                            className="btn btn-danger btn-xs"
                            data-toggle="modal"
                            data-target="#delModal"
                          >
                            <span
                              className={{
                                dataToggle: Tooltip,
                                title: "Xóa",
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </span>
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                  {/* ) */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

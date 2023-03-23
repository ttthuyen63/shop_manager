import React, { useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesPacking,
  faCaretDown,
  faFileCirclePlus,
  faHome,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBook, addListBook } from "../redux/orderSlice";
import { logout } from "../redux/userSlice";

export default function AddOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookImageData, setbookImageData] = useState();
  const [categoryData, setcategoryData] = useState();
  const [statusBookData, setstatusBookData] = useState();
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const bookNameRef = useRef(null);
  const categoryRef = useRef(null);
  const descriptionRef = useRef(null);
  const publisherRef = useRef(null);
  const authRef = useRef(null);
  const amountRef = useRef(null);
  const codeBookRef = useRef(null);
  const dateAddBookRef = useRef(null);
  const bookImageRef = useRef(null);

  const getBookApi = async () => {
    try {
      const res = await customAxios.post("/lbm/v1/book/info/create");
      dispatch(addListBook(res.data));
      // setbookState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    // dispatch(
    //   addBook({
    //     bookName: bookNameRef.current.value,
    //     category: categoryRef.current.value,
    //     description: descriptionRef.current.value,
    //     publisher: publisherRef.current.value,
    //     auth: authRef.current.value,
    //     amount: amountRef.current.value,
    //     // codeBook: codeBookRef.current.value,
    //     // dateAddBook: dateAddBookRef.current.value,
    //     bookImage: bookImageData,
    //   })
    // )
    //   .unwrap()
    //   .then(() => {
    //     navigate("/bookList");
    //     // getBookApi();
    //   });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      amount: Number(amountRef.current.value),
      auth: authRef.current.value,
      bookImage: bookImageData,
      bookName: bookNameRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      price: 0,
      isDisable: true,
      publisher: publisherRef.current.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://192.168.189.75:9992/lbm/v1/book/info/create", requestOptions)
      .then((response) => response.text())
      .then((result) => navigate("/bookList"))
      .catch((error) => console.log("error", error));
  };

  const handleCancel = (e) => {
    navigate("/bookList");
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-2" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">Library Manager</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link
                  className="nav-link active"
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
                          style={{ color: "white" }}
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
                          style={{ color: "white" }}
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
                  {isActiveOrder && (
                  <div className="dropdown-content">
                    <div className="dropdown-item">
                      <Link
                        className="nav-link"
                        type="button"
                        to="/"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Tất cả đơn hàng
                      </Link>
                    </div>
                    <div className="dropdown-item">
                      <Link
                        className="nav-link"
                        type="button"
                        to="/"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Đơn hàng thành công
                      </Link>
                    </div>
                    <div className="dropdown-item">
                      <Link
                        className="nav-link"
                        type="button"
                        to="/"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Đơn hàng hủy
                      </Link>
                    </div>
                  </div>
                )}
                </div>
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
                <h4 className="ml-0 mt-0">Thêm sách</h4>
                <Form>
                  <div className="row">
                    <div className="form-horizontal col-sm-5">
                      <div className="form-group">
                        <label className="control-label">Tên sách:</label>
                        <input
                          ref={bookNameRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter name"
                        />
                      </div>
                      <div className="form-group">
                        <label for="">Thể loại: </label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          ref={categoryRef}
                          onChange={(e) => setcategoryData(e.target.value)}
                        >
                          <option selected disabled>
                            Thể loại
                          </option>
                          <option value="Giáo trình">Giáo trình</option>
                          <option value="Kinh dị">Kinh dị</option>
                          <option value="Tình cảm">Tình cảm</option>
                          <option value="Giả tưởng">Giả tưởng</option>
                          <option value="Self-help">Self-help</option>
                          <option value="Tiểu sử">Tiểu sử</option>
                          <option value="Tâm lý">Tâm lý</option>
                          <option value="Văn học">Văn học</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label for="">Số phát hành:</label>
                        <input
                          ref={publisherRef}
                          type="number"
                          className="form-control"
                          placeholder="Enter number"
                        />
                      </div>

                      <div className="form-group">
                        <label>Tác giả:</label>
                        <input
                          ref={authRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter Author"
                        />
                      </div>

                      <div className="form-group">
                        <label for="email">Số lượng:</label>
                        <input
                          ref={amountRef}
                          type="number"
                          className="form-control"
                          placeholder="Enter quantity"
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label">Mô tả:</label>
                        <textarea
                          ref={descriptionRef}
                          className="form-control"
                          rows="4"
                          cols="50"
                        ></textarea>
                      </div>
                    </div>

                    <div class="form-horizontal col-sm-5">
                      <input
                        value={bookImageData}
                        ref={bookImageRef}
                        onChange={(e) => setbookImageData(e.target.value)}
                        name="image"
                        type="text"
                      />
                      <img
                        variant="bottom"
                        width={400}
                        height={400}
                        src={bookImageData}
                      />
                    </div>

                    {/* <div className="form-horizontal col-sm-5"> */}
                    {/* <div className="form-group">
                      <label className="control-label">Mô tả:</label>
                      <textarea
                        ref={descriptionRef}
                        className="form-control"
                        rows="4"
                        cols="50"
                      ></textarea> */}
                    {/* </div> */}

                    {/* <div className="form-group">
                        <label className="control-label" for="pwd">
                          Mã sách:
                        </label>
                        <input
                          ref={codeBookRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter code book"
                        />
                      </div> */}

                    {/* <div className="form-group">
                        <label className="control-label" for="email">
                          Ngày thêm:
                        </label>
                        <input
                          ref={dateAddBookRef}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                        />
                      </div> */}
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-10">
                        <Button
                          type="submit"
                          className="btn btn-success"
                          onClick={handleSubmit}
                        >
                          <FontAwesomeIcon icon={faSave} /> Lưu
                        </Button>
                        <Button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleCancel}
                        >
                          &times; Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

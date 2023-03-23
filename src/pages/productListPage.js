import React, { useState, useEffect } from "react";
import { Button, Container, Modal, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesPacking,
  faCaretDown,
  faFileCirclePlus,
  faHome,
  faPencilSquare,
  faPlusCircle,
  faSave,
  faStickyNote,
  faTrash,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { addListproduct } from "../redux/productSlice";
import HomePage from "./homePage";
import { logout } from "../redux/userSlice";
import { useMemo } from "react";
import moment from "moment";
import { currencyFormat } from "../ultils/constant";

export default function ProductListPage() {
  const [productState, setproductState] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(productState);
  const [deleteId, setdeleteId] = useState("");
  const [deleteCode, setdeleteCode] = useState("");
  const [filterproduct, setfilterproduct] = useState();
  const [showDel, setshowDel] = useState(false);
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const [imageproductData1, setImageproductData1] = useState();

  console.log("productState...", productState);
  const productList = useSelector((state) => state.productReducer);

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    getproductApi();
  }, []);
  const getproductApi = async () => {
    try {
      const res = await customAxios.get("/home/all");
      dispatch(addListproduct(res.data));
      setproductState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  console.log("test", productState);

  const filterData = (props) => {
    props?.forEach((currentValue, index, arr) => {
      let code = currentValue.code;

      let objIndex = arr.findIndex((item) => {
        return item.code == code;
      });
      if (index == objIndex) {
        currentValue.color = [currentValue.color];
        currentValue.size = [currentValue.size];
        currentValue.quantity = [currentValue.quantity];
      } else {
        if (!arr[objIndex].color.includes(currentValue.color)) {
          arr[objIndex].color = [...arr[objIndex].color, currentValue.color];
        }
        if (!arr[objIndex].size.includes(currentValue.size)) {
          arr[objIndex].size = [...arr[objIndex].size, currentValue.size];
        }

        if (!arr[objIndex].quantity.includes(currentValue.quantity)) {
          arr[objIndex].quantity = [
            ...arr[objIndex].quantity,
            currentValue.quantity,
          ];
        }
        currentValue.code = null;
      }
    });
    return props?.filter((e) => e.code !== null);
  };

  console.log("data....", filterData(productState));
  const handleEdit = (item) => {
    console.log("item...", item);
    navigate("/editproduct/" + item?.code, {
      state: item,
    });
  };

  const handleClose = () => {
    setshowDel(false);
  };

  const handleClickDelete = (code) => {
    setdeleteCode(code);
    setshowDel(true);
    // console.log("id...", id);
  };

  const handleDelete = async () => {
    // console.log("id: ", deleteId);
    try {
      await customAxios.post(`/admin/item/delete/${deleteCode}`);
      getproductApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };
  const goToDetail = (code) => {
    navigate("/productList/" + code);
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...filterData(productState)];
    searchList = searchList?.filter((item) => {
      return item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
  };
  function getFilterList() {
    if (!filterproduct) {
      return filterData(productState);
    }
    return filterData(productState)?.filter(
      (item) => item.categoryCode === filterproduct
    );
  }

  var filterList = useMemo(getFilterList, [
    filterproduct,
    filterData(productState),
  ]);
  function handleChange(event) {
    setfilterproduct(event.target.value);
  }

  const navigate = useNavigate();

  return (
    <div>
      {show === false ? (
        <div>
          {productState?.map((item, index) => (
            <Modal show={showDel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Bạn có chắc là sẽ xóa?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  // onClick={() => handleDelete(item?.id)
                  onClick={handleDelete}
                  // }
                >
                  Xóa
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Hủy
                </Button>
              </Modal.Footer>
            </Modal>
          ))}
        </div>
      ) : (
        <div>
          {search?.map((item, index) => (
            <Modal show={showDel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Bạn có chắc là sẽ xóa?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </Modal.Body>
              <Modal.Footer>
                {/* <Button variant="danger" onClick={() => handleDelete(item?.id)}> */}
                <Button
                  variant="danger"
                  // onClick={() => handleDelete(item?.id)
                  onClick={handleDelete}
                  // }
                >
                  Xóa
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Hủy
                </Button>
              </Modal.Footer>
            </Modal>
          ))}
        </div>
      )}
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
                  {!isActiveProduct && (
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <Link
                          className="nav-link active"
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
                  {isActiveOrder && (
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
                          className="nav-link"
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
              {/* <h4 className="ml-0 mt-0" style={{ color: "black" }}>
                Tất cả sản phẩm
              </h4> */}
            </div>

            <div className="control-product">
              <div className="mt-3 control-product-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4
                  className="ml-0 mt-0"
                  style={{ color: "black", textAlign: "center" }}
                >
                  Tất cả sản phẩm
                </h4>

                <form className="form-inline w-100">
                  <input
                    type="text"
                    className="input-userCode form-control w-30 mb-2 mr-3"
                    placeholder="Tìm kiếm theo tên sản phẩm"
                    onChange={handleChangeSearch}
                  />
                  <select
                    className="browser-default custom-select w-30 mb-2 mr-3"
                    // value={filterStatus}
                    onChange={handleChange}
                  >
                    <option selected disabled>
                      Lọc theo danh mục
                    </option>
                    <option value="">Tất cả</option>
                    {/* {filterData(productState)?.map((item) => (
                      <option value={item?.categoryCode}>
                        {item?.categoryCode}
                      </option>
                    ))}
                       */}
                    <option value="trang-phuc_bong-da">
                      trang-phuc_bong-da
                    </option>
                    <option value="trang-phuc_bong-chuyen">
                      trang-phuc_bong-chuyen
                    </option>
                    <option value="trang-phuc_bong-ban">
                      trang-phuc_bong-ban
                    </option>
                    <option value="trang-phuc_tennis">trang-phuc_tennis</option>
                    <option value="trang-phuc_boi-loi">
                      trang-phuc_boi-loi
                    </option>
                    <option value="trang-phuc_bong-ro">
                      trang-phuc_bong-ro
                    </option>
                    <option value="dung-cu_bong-da">dung-cu_bong-da</option>
                    <option value="dung-cu_bong-chuyen">
                      dung-cu_bong-chuyen
                    </option>
                    <option value="dung-cu_bong-ban">dung-cu_bong-ban</option>
                    <option value="dung-cu_tennis">dung-cu_tennis</option>
                    <option value="dung-cu_boi-loi">dung-cu_boi-loi</option>
                    <option value="dung-cu_bong-ro">dung-cu_bong-ro</option>
                  </select>
                  <Link
                    className="btn btn-success mb-2 mr-3 mg-right"
                    type="button"
                    to="/addproduct"
                  >
                    <FontAwesomeIcon icon={faPlusCircle} /> Thêm
                  </Link>
                </form>

                <table className="table recently-violated">
                  <thead>
                    <tr>
                      {/* <th scope="col">ID</th> */}

                      {/* <th scope="col">Mã phân loại</th> */}
                      <th scope="col"></th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Mã phân loại</th>
                      <th scope="col">Giá</th>
                      {/* <th scope="col">Số lượng</th> */}
                      <th scope="col">Ngày thêm</th>
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  {show === false ? (
                    <tbody id="myTable">
                      {filterList?.map((item, index) => (
                        <tr>
                          {/* <td>{item.id}</td> */}

                          {/* <td>{item.image}</td> */}
                          <td>
                            <img
                              src={item.image[0]}
                              width={100}
                              height={120}
                            ></img>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.categoryCode}</td>
                          <td>{currencyFormat(item.price)}</td>
                          {/* <td>{item.quantity}</td> */}
                          <td>{item?.createdDate?.slice(0, 10)}</td>
                          {/* <td>{item.gender === "MALE" ? "Nam" : "Nữ"}</td> */}
                          {/* <td>{moment(item.birthDate).format("YYYY-MM-DD")}</td> */}
                          {/* <td>
                            <ConvertToString item={item.birthDate} />
                          </td>
                          <td>
                            <Statusproduct item={item?.status} />
                          </td> */}
                          <td>
                            <button
                              onClick={() => goToDetail(item.code)}
                              variant="primary"
                              type="button"
                              className="btn btn-primary btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
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
                              onClick={() => handleEdit(item)}
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
                              onClick={() => handleClickDelete(item?.code)}
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
                          </td>
                        </tr>
                      ))}
                      <div></div>
                    </tbody>
                  ) : (
                    ""
                  )}
                  {show === true ? (
                    <tbody id="myTable">
                      {search?.map((item, index) => (
                        <tr>
                          <td>
                            <img
                              src={item.image[0]}
                              width={80}
                              height={100}
                            ></img>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.categoryCode}</td>
                          <td>{currencyFormat(item.price)}</td>
                          {/* <td>{item.quantity}</td> */}
                          <td>{item?.createdDate?.slice(0, 10)}</td>
                          <td>
                            <button
                              onClick={() => goToDetail(item.code)}
                              variant="primary"
                              type="button"
                              className="btn btn-primary btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
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
                              onClick={() => handleEdit(item)}
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
                              onClick={() => handleClickDelete(item?.code)}
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    ""
                  )}
                </table>
                {/* <!-- Modal xem thêm --> */}
                <div id="moreModal" className="modal fade" role="dialog">
                  <div className="modal-dialog">
                    {/* <!-- Modal content--> */}
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Thông tin chi tiết</h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body row">
                        <div className="col-sm-6 text-center">
                          <img
                            className="avatar-wrapper mt-1 mb-1"
                            src="./OK.jpg"
                            alt=""
                          />
                        </div>
                        <div className="col-sm-6 mt-2">
                          <h5>Họ và tên</h5>
                          <h5>Ngày sinh</h5>
                          <h5>Giới tính</h5>
                          <h5>029943598</h5>
                          <h5>Địa chỉ</h5>
                          <h5>Trạng thái đọc</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

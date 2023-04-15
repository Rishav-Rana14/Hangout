import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAdminDashboardViewOrder,
  GetB2bCompanyInfo,
  PostAdminDashboardShippingMatrix,
  PostAdminDashboardTransaction,
  PostDashboardRevenue,
} from "../Redux/action/ApiCollection";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import { TokenDataValidCheck } from ".././Authanticate";
import { Select, Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
// import { PermissionData } from "../Permission";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import Location from "../Location";

const AdminDashboard = () => {
  const [pickuppopup, setPickUpPopup] = useState(false);
  const [totalorder, setTotalOrder] = useState("");
  const [pendingorder, setPendingOrder] = useState("");
  const [deliveredorder, setDeliveredOrder] = useState("");
  const [indeliveryorder, setIndeliveryOrder] = useState("");
  const [issues, setIssues] = useState("");
  const [popupcheckdata, setPopupCheckData] = useState("");
  const [lateorder, setLateOrder] = useState("");
  const [datapicker, setDataPicker] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  const [shipmentmatrixdata, setShipmentMatrixData] = useState("");
  const [revenuedata, setRevenueData] = useState("");
  const [shipmentmatrixdelivereddata, setShipmentMatrixDeliveredData] =
    useState("");
  const [shipmentmatrixdatadate, setShipmentMatrixDataDate] = useState("");
  const [revenuedate, setRevenueDate] = useState("");
  const [opendropdown, setOpenDropDown] = useState(false);
  const [opendropdownnn, setOpenDropDownnn] = useState(false);
  const [dropdownshowdata, setDropDownShowData] = useState("Last 7 days");
  const [dropdownshowdatannn, setDropDownShowDatannn] = useState("Last 7 days");
  const [opentransectiondropdown, setOpenTransectionDropDown] = useState(false);
  const [dropdownshowtransectiondata, setDropDownShowTransectionData] =
    useState("Last 7 days");

  const [openrevenuedropdown, setOpenRevenueDropDown] = useState(false);
  const [dropdownshowrevenuedata, setDropDownShowRevenueData] =
    useState("Last 7 days");

  const [filtershowhidebtn, setFilterShowHideBtn] = useState(false);
  const [domesticcheckBox, setDomesticCheckBox] = useState(false);
  const [b2bpartnerselectedvalue, setB2BPartnerSelectedValue] = useState("");

  const [last7dayscheckbox, setLast7daysCheckBox] = useState(false);
  const [last30dayscheckbox, setLast30daysCheckBox] = useState(false);
  const [currentmonthcheckbox, setCurrentMonthCheckBox] = useState(false);
  const [customcheckbox, setCustomCheckBox] = useState(false);

  const [startdate, setStatrtDate] = useState("");
  const [enddate, setEndDate] = useState("");

  const [pagepathdata, setPagePathData] = useState("");
  const [revenuealladata, setRevenueAllData] = useState("");

  const [filterActive, setFilterActive] = useState(false);

  const [ActivityData, setActivityData] = useState(false);

  const [ActivityUSerDetailData, setActivityUSerDetailData] = useState([]);

  // const dispatch = useDispatch()
  const navigate = useNavigate();

  const GetAdminDashboardViewOrderData = useSelector(
    (state) =>
      state.GetAdminDashboardViewOrderReducer.GetAdminDashboardViewOrderData
        ?.data
  );
  const PostAdminDashboardTransactionData = useSelector(
    (state) =>
      state.PostAdminDashboardTransactionReducer
        .PostAdminDashboardTransactionData?.data
  );
  const PostAdminDashboardShippingMatrixData = useSelector(
    (state) =>
      state.PostAdminDashboardShippingMatrixReducer
        .PostAdminDashboardShippingMatrixData?.data
  );
  const PostDashboardRevenueData = useSelector(
    (state) => state.PostDashboardRevenueReducer.PostDashboardRevenueData?.data
  );
  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );

  const GetB2bCompanyInfoData = useSelector(
    (state) => state.GetB2bCompanyInfoReducer?.GetB2bCompanyInfoData?.data
  );

  const HeaderToggleClassAddData = useSelector(
    (state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
  );

  console.log("112121212", GetB2bCompanyInfoData);

  useEffect(() => {
    navigate(TokenDataValidCheck());

    setTotalOrder(
      GetAdminDashboardViewOrderData &&
        GetAdminDashboardViewOrderData[0]?.total_order
    );
    setPendingOrder(
      GetAdminDashboardViewOrderData &&
        GetAdminDashboardViewOrderData[0]?.pending_order
    );
    setDeliveredOrder(
      GetAdminDashboardViewOrderData &&
        GetAdminDashboardViewOrderData[0]?.delivered_order
    );
    setIndeliveryOrder(
      GetAdminDashboardViewOrderData &&
        GetAdminDashboardViewOrderData[0]?.indelivery_order
    );
    setIssues(
      GetAdminDashboardViewOrderData &&
        GetAdminDashboardViewOrderData[0]?.issues
    );
    setLateOrder(
      GetAdminDashboardViewOrderData &&
        GetAdminDashboardViewOrderData[0]?.late_order
    );

    // first time page render will show the 7 days data
  }, [GetAdminDashboardViewOrderData]);

  useEffect(() => {
    let Alldata = {
      filter_type: "all",
    };

    // dispatch(PostAdminDashboardTransaction(Alldata))
    // dispatch(PostAdminDashboardShippingMatrix(Alldata))
    // dispatch(PostDashboardRevenue(Alldata))

    // dispatch(GetAdminDashboardViewOrder(Alldata))

    // dispatch(GetB2bCompanyInfo())
  }, []);

  // console.log("GetB2bCompanyInfoData",PermissionData())

  useEffect(() => {
    // navigate(tokenData()) //if token (persone is not login then he/she will be not access this page)

    let allDataShiping =
      PostAdminDashboardShippingMatrixData &&
      PostAdminDashboardShippingMatrixData.shipment_data.map((item, id) => {
        return item.in_transit;
      });
    let allDataDelivere =
      PostAdminDashboardShippingMatrixData &&
      PostAdminDashboardShippingMatrixData.shipment_data.map((item, id) => {
        return item.delivered;
      });
    let allDataDate =
      PostAdminDashboardShippingMatrixData &&
      PostAdminDashboardShippingMatrixData.shipment_data.map((item, id) => {
        console.log(item.date);
        let splitData = item.date.split();
        console.log(splitData[0]);
        return splitData[0];
      });

    console.log("sho", PostAdminDashboardShippingMatrixData);

    setShipmentMatrixData(allDataShiping);
    setShipmentMatrixDeliveredData(allDataDelivere);
    setShipmentMatrixDataDate(allDataDate);

    let RevenueData =
      PostDashboardRevenueData &&
      PostDashboardRevenueData.map((item, id) => {
        return item.amount;
      });

    let allRevenueDate =
      PostDashboardRevenueData &&
      PostDashboardRevenueData.map((item, id) => {
        console.log(item.date);
        let splitData = item.date.split("-");
        console.log(splitData[2]);
        return splitData[2];
      });

    console.log("RevenueDataRevenueData", RevenueData);
    setRevenueAllData(RevenueData);
    setRevenueData(allRevenueDate);
  }, [PostAdminDashboardShippingMatrixData, PostDashboardRevenueData]);

  useEffect(() => {
    // navigate(tokenData())

    let RevenueData =
      PostDashboardRevenueData &&
      PostDashboardRevenueData.map((item, id) => {
        return item.amount;
      });
    let RevenueDate =
      PostDashboardRevenueData &&
      PostDashboardRevenueData.map((item, id) => {
        console.log(item.date);
        let splitData = item.date.split();
        console.log(splitData[0]);
        return splitData[0];
      });
    setRevenueData(RevenueData);
    setRevenueDate(RevenueDate);
  }, [PostDashboardRevenueData]);

  const TransectionFun = (e, checkFun, TargetValue) => {
    console.log("checkFun", checkFun, TargetValue);

    setOpenDropDown(false);
    setOpenTransectionDropDown(false);
    setOpenRevenueDropDown(false);

    const ThisMonthConvert = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    };

    const LastMonthConvert = (str) => {
      var date = new Date(str),
        mnth = ("0" + date.getMonth()).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    };
    let today = new Date();

    let this_month = {
      filter_type: TargetValue,
      start_date: ThisMonthConvert(today),
    };
    let seven_days = {
      filter_type: TargetValue,
    };

    let last_month = {
      filter_type: TargetValue,
      start_date: LastMonthConvert(today),
    };

    if (TargetValue === "7days") {
      if (checkFun === "Transection") {
        console.log("TransectionData");
        // dispatch(PostAdminDashboardTransaction(seven_days))
      } else if (checkFun === "Revenue") {
        console.log("RevenueData");
        // dispatch(PostDashboardRevenue(seven_days))
      } else {
        // dispatch(PostAdminDashboardShippingMatrix(seven_days))
      }
    } else if (TargetValue === "last_month") {
      if (checkFun === "Transection") {
        // dispatch(PostAdminDashboardTransaction(last_month))
      } else if (checkFun === "Revenue") {
        // dispatch(PostDashboardRevenue(last_month))
      } else {
        // dispatch(PostAdminDashboardShippingMatrix(last_month))
      }
    } else if (TargetValue === "this_month") {
      if (checkFun === "Transection") {
        // dispatch(PostAdminDashboardTransaction(this_month))
      } else if (checkFun === "Revenue") {
        // dispatch(PostDashboardRevenue(this_month))
      } else {
        // dispatch(PostAdminDashboardShippingMatrix(this_month))
      }
    } else if (TargetValue === "custom") {
      setPickUpPopup(true);
      setPopupCheckData(checkFun);
    }
  };

  const DataPickerFun = (e) => {
    setDataPicker([e.selection]);
  };

  const DatePickerSaveFun = () => {
    const selectedEndDate = new Date(datapicker[0].endDate);
    const selectedStartDate = new Date(datapicker[0].startDate);
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);

    if (selectedEndDate <= maxDate && selectedStartDate <= maxDate) {
      const startDateFun = (str) => {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      };
      const endDateFun = (str) => {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      };
      let startDateValue = startDateFun(datapicker[0].startDate);
      let endDateValue = endDateFun(datapicker[0].endDate);

      setStatrtDate(startDateValue);
      setEndDate(endDateValue);
    } else {
      setCustomCheckBox(false); //this will uncheck the sort by
      toast.warn("Please Select Correct Date");
    }
    setPickUpPopup(false);
    setDataPicker([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 0),
        key: "selection",
      },
    ]);
  };

  const NationalityFun = (data) => {
    if (data == "Last 7 Days") {
      setLast7daysCheckBox((o) => !o);
      setLast30daysCheckBox(false);
      setCurrentMonthCheckBox(false);
      setCustomCheckBox(false);
    } else if (data == "Last 30 Days") {
      setLast7daysCheckBox(false);
      setLast30daysCheckBox((o) => !o);
      setCurrentMonthCheckBox(false);
      setCustomCheckBox(false);
    } else if (data == "Current month") {
      setLast7daysCheckBox(false);
      setLast30daysCheckBox(false);
      setCurrentMonthCheckBox((o) => !o);
      setCustomCheckBox(false);
    } else if (data == "Custom") {
      setLast7daysCheckBox(false);
      setLast30daysCheckBox(false);
      setCurrentMonthCheckBox(false);
      setCustomCheckBox((o) => !o);
      setPickUpPopup(true); //this will open the calender popup
    }
  };

  const SearchPage = (e) => {
    let value = e.target.value.toUpperCase();
    let result = [];
    result = GetB2bCompanyInfoData?.filter((data) => {
      //get client data c-2 -3a

      if (isNaN(+value)) {
        return data?.company_name.toUpperCase().search(value) !== -1;
      }
    });
    setPagePathData(result);
  };

  const ApplyFilterFun = () => {
    let SortedByData = "";
    let payloadData = "";

    const ThisMonthConvert = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    };
    const LastMonthConvert = (str) => {
      var date = new Date(str),
        mnth = ("0" + date.getMonth()).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    };
    let today = new Date();

    if (last7dayscheckbox) {
      SortedByData = "7days";
      payloadData = {
        filter_type: "7days",
        b2b_patner_id: b2bpartnerselectedvalue,
      };
    } else if (last30dayscheckbox) {
      SortedByData = "last_month";

      payloadData = {
        filter_type: "last_month",
        start_date: LastMonthConvert(today),
        b2b_patner_id: b2bpartnerselectedvalue,
      };
    } else if (currentmonthcheckbox) {
      SortedByData = "this_month";
      payloadData = {
        filter_type: "this_month",
        start_date: ThisMonthConvert(today),
        b2b_patner_id: b2bpartnerselectedvalue,
      };
    } else if (customcheckbox) {
      SortedByData = "custom";
      payloadData = {
        filter_type: "custom",
        start_date: startdate,
        end_date: enddate,
        b2b_patner_id: b2bpartnerselectedvalue,
      };
    }

    if (
      customcheckbox ||
      currentmonthcheckbox ||
      last30dayscheckbox ||
      last7dayscheckbox
    ) {
      // dispatch(PostAdminDashboardTransaction(payloadData))
      // dispatch(PostAdminDashboardShippingMatrix(payloadData))
      // dispatch(PostDashboardRevenue(payloadData))
      // dispatch(GetAdminDashboardViewOrder(payloadData))
    } else {
      payloadData = {
        filter_type: "all",
        b2b_patner_id: b2bpartnerselectedvalue,
      };

      // dispatch(PostAdminDashboardTransaction(payloadData))
      // dispatch(PostAdminDashboardShippingMatrix(payloadData))
      // dispatch(PostDashboardRevenue(payloadData))
      // dispatch(GetAdminDashboardViewOrder(payloadData))

      // toast.warn("Please Select Sort By ")
    }

    console.log("payloadData", payloadData);

    setFilterShowHideBtn(false);

    if (SortedByData || payloadData.filter_type !== "all") {
      setFilterActive(true);
      console.log("data is available", payloadData, SortedByData);
    } else {
      console.log("data is not available");
    }
  };
  const FilterShowHideBtnFun = () => {
    // setFilterShowHideBtn(false)
    // setLast7daysCheckBox(false)
    // setLast30daysCheckBox(false)
    // setCurrentMonthCheckBox(false)
    // setCustomCheckBox(false)
    // setFilterActive(false)
    // ApplyFilterFun()
    window.location.reload(false);
  };

  useEffect(() => {
    console.log(
      "PostAdminDashboardTransactionData",
      PostAdminDashboardTransactionData
    );
    if (PostAdminDashboardTransactionData) {
      let data = PostAdminDashboardTransactionData?.transaction_details.map(
        (item, id) => {
          let payload;
          if (item.method == "DIRECT") {
            return (payload = {
              amount: item.amount,
              date: item.date,
              id: item.id,
              method: "PREPAID",
              product_order_id: item.product_order_id,
              payment_status: item.payment_status,
            });
          } else {
            return (payload = {
              amount: item.amount,
              date: item.date,
              id: item.id,
              method: item.method,
              product_order_id: item.product_order_id,
              payment_status: item.payment_status,
            });
          }
        }
      );

      PostAdminDashboardTransactionData.transaction_details = data;

      console.log(data, "jhdvkjbkv");

      console.log(
        "PostAdminDashboardTransactionData12",
        PostAdminDashboardTransactionData
      );
    }
  }, [PostAdminDashboardTransactionData]);

  // const clearCacheData = () => {
  //   caches.keys().then((names) => {
  //     names.forEach((name) => {
  //       caches.delete(name);
  //     });
  //   });
  //   alert('Complete Cache Cleared')
  // };

  const userId = reactLocalStorage.get("User_Id", false);

  const latLong = reactLocalStorage.get("latLong", false);
  let parseData = JSON.parse(latLong);

  const SendFun = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/auth/sent-fcm-to-topic`,
        {
          latitude: parseData?.coordinates?.Ing.toString(),
          longitude: parseData?.coordinates?.lat.toString(),
          title: "Play",
          body: ActivityData,
        },
        {
          headers: {
            userId: userId,
            "Content-Type": "application/json",
          },
        }
      )
      .then((Response) => {
        console.log("vgfgsdfcghd", Response);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const GetUserFun = async () => {
      // let config = {
      //    method: 'GET',
      //    url:`${process.env.REACT_APP_BASE_URL}/auth/activities`,

      //   };

      //   axios.request(config)
      //   .then((response) => {
      //    console.log("mahgsfjhbs",JSON.stringify(response.data));
      //   })
      //   .catch((error) => {
      //    console.log("mahgsfjhbs",error);
      //   });

      var config = {
        method: `get`,
        url: `${process.env.REACT_APP_BASE_URL}/auth/activities`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const responce = await axios(config)
        .then((res) => {
          console.log(JSON.stringify(res.data));
          return res.data;

          // console.log(JSON.stringify(response.data));
        })
        .catch((err) => {
          console.log(err);
          return;
        });
        setActivityUSerDetailData(responce?.activityResponse)

        console.log("bnfdhge",responce)
    };
    GetUserFun();
  }, []);


const getLocationFun =(e,items)=>{
   console.log("hmgafjgfsdjf",items)
   reactLocalStorage.set("User_Details",JSON.stringify(items));
   navigate("/location")


}


  return (
    <>
      {/* <button onClick={() => clearCacheData()} >
        Clear Cache Data</button> */}
      <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
        <Header />
        <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
          <Sidebar />
          <div className="content-sec">
            <div className="dashboardcontent-title">
              <h2>All Activitys </h2>
              <div>
                <div className="data_picker_btn">
                  <input
                    type="text"
                    placeholder="Your Activity"
                    className="p-3"
                    onChange={(e) => setActivityData(e.target.value)}
                  />
                  <button onClick={(e) => SendFun(e)} className="mt-2 ms-2">
                    {" "}
                    Send{" "}
                  </button>
                </div>

                 
                {/* <button>send</button> */}
              </div>
            </div>
            <div className="dashboardcontent-part ">
              <div className="meter-box">
              <div   >
                  {ActivityUSerDetailData?.map((item)=>{
                    return<div className=" m-3 p-5 bg-light" onClick={(e)=>getLocationFun(e,item)}>
                      <div>Title: {item.title}</div>
                     <div> message: {item.message} </div>
                      </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Popup open={pickuppopup} position="" model className="sign_up_loader">
          <div className="container">
            <div className="loader-sec">
              <div className=" data_picker rounded  bg-white">
                <div className="py-1 text-warning">
                  <DateRangePicker
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    direction="horizontal"
                    months={2}
                    ranges={datapicker}
                    onChange={(e) => DataPickerFun(e)}
                  />
                  <h4
                    className="text-danger calender_popup_cancel"
                    onClick={(e) => {
                      setPickUpPopup(false);
                      setCustomCheckBox(false);
                    }}
                  >
                    {" "}
                    X{" "}
                  </h4>
                </div>
                <div className="data_picker_btn">
                  <button onClick={(e) => DatePickerSaveFun(e)}> save </button>
                </div>
              </div>
            </div>
          </div>
        </Popup>

        <div className="wallet-popup d-none">
          <div className="popupinner">
            <h4
              className="text-danger calender_popup_cancel"
              onClick={(e) => {
                setPickUpPopup(false);
                setCustomCheckBox(false);
              }}
            >
              {" "}
              X{" "}
            </h4>
            <h2>Recharge your wallet</h2>
            <p>
              Current Wallet Amount <b>0.00</b>
            </p>
            <div className="popup-body">
              <div className="amout">
                <p>Enter Amount in multiples of 100 below</p>
                <div className="">
                  <p>Rs</p>
                  <input type="number" class="form-control" placeholder="500" />
                  <span>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.364324 0.0337138C0.166958 0.0965594 -0.00147244 0.347004 1.20969e-05 0.575441C0.0014185 0.791715 0.0178524 0.809816 2.15557 2.94899L4.2052 5L2.15557 7.05101C0.0178524 9.19018 0.0014185 9.20828 1.20969e-05 9.42456C-0.00204543 9.74137 0.258635 10.002 0.575441 9.99999C0.791715 9.99858 0.809816 9.98215 2.94899 7.84443L5 5.7948L7.05101 7.84443C9.19018 9.98215 9.20828 9.99858 9.42456 9.99999C9.74137 10.002 10.002 9.74137 9.99999 9.42456C9.99858 9.20828 9.98215 9.19018 7.84443 7.05101L5.7948 5L7.84443 2.94899C9.98215 0.809816 9.99858 0.791715 9.99999 0.575441C10.002 0.258635 9.74137 -0.00204543 9.42456 1.20969e-05C9.20828 0.0014185 9.19018 0.0178524 7.05101 2.15557L5 4.2052L2.94899 2.15557C1.36511 0.572785 0.871282 0.0939549 0.780777 0.0532732C0.652637 -0.0043374 0.505485 -0.0112652 0.364324 0.0337138Z"
                        fill="#858585"
                      />
                    </svg>
                  </span>
                </div>
                <span>Min. value Rs.100</span>
              </div>
              <div className="row recharge">
                <div className="col-6">
                  <p>Recharge Amount</p>
                </div>
                <div className="col-6  text-end">
                  <p>Rs. 500</p>
                </div>
                <hr />
                <div className="col-6 ">
                  <p className="mb-3 dark-text">Recharge Amount</p>
                </div>
                <div className="col-6 dark-text text-end">
                  <p className="mb-3">Rs. 500</p>
                </div>
              </div>
              <button type="button" class="btn pr-pay">
                Proceed To Pay{" "}
              </button>
              <button type="button" class="btn pr-onl">
                Proceed Online{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="wallet-popup  d-none">
          <div className="popupinner">
            <h4
              className="text-danger calender_popup_cancel"
              onClick={(e) => {
                setPickUpPopup(false);
                setCustomCheckBox(false);
              }}
            >
              {" "}
              X{" "}
            </h4>
            <h2>Select your payment Mode</h2>
            <p>Total Amount to pay Rs. 500</p>
            <div className="popup-body">
              <ul className="pay-list">
                <li className="row mx-0">
                  <div className="col-2 ">
                    <img src="/images/wallet.svg" alt="img" />
                  </div>
                  <div className="col-9">
                    <p className="mb-1">Wallet</p>
                    <p className="mb-0">
                      Current Balance :<b>1000/-</b>
                    </p>
                  </div>
                  <div className="col-1 d-flex justify-content-end align-items-center">
                    {" "}
                    <b> &gt; </b>{" "}
                  </div>
                </li>
                <li className="row mx-0">
                  <div className="col-2">
                    <img src="/images/online.svg" alt="img" />
                  </div>
                  <div className="col-9">
                    <p className="mb-1">Online</p>
                    <p className="mb-0">example123@Gmail.com</p>
                  </div>
                  <div className="col-1 d-flex justify-content-end align-items-center">
                    {" "}
                    <b> &gt; </b>{" "}
                  </div>
                </li>
              </ul>

              <button type="button" class="btn pr-pay mb-0">
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* ==================== cancel popup ============================= */}

        <div
          className="callbuyerpopup_outer cancelorder-popup"
          style={{ display: "none" }}
        >
          <div className="callbuyerpopup">
            <div className="popup-body">
              <div className="row">
                <div className="col-12 text-center">
                  <span>
                    <svg
                      width="73"
                      height="73"
                      viewBox="0 0 73 73"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M28.8468 0.557017C20.1183 2.48032 12.3738 7.48163 6.94451 14.7015C3.82271 18.8528 1.04352 25.7631 0.312867 31.1904C-0.944031 40.5273 1.62946 50.441 7.25209 57.9207C9.09525 60.3726 13.2537 64.3503 15.7318 66.0319C20.1234 69.0116 25.747 71.2226 30.8411 71.9721C35.0099 72.5856 41.5011 72.2378 45.4557 71.1892C59.1901 67.548 69.535 56.2758 71.9998 42.2666C72.263 40.7722 72.3473 38.1361 72.2441 34.6422C72.0592 28.3885 71.3915 25.598 68.7921 20.2171C64.1989 10.7095 55.7513 3.7807 45.2312 0.891844C41.4907 -0.135347 32.7946 -0.313143 28.8468 0.557017ZM30.9333 24.2512L36.1468 29.4212L41.4099 24.2512C45.0684 20.6576 46.8963 19.0815 47.405 19.0815C48.4614 19.0815 53.1801 23.8281 53.1801 24.891C53.1801 25.4838 51.8969 26.9791 48.1512 30.7514C45.3853 33.5368 43.1223 35.9578 43.1223 36.1314C43.1223 36.305 45.3853 38.7065 48.1512 41.4682C52.052 45.3628 53.1801 46.6778 53.1801 47.3289C53.1801 47.9512 52.5166 48.8146 50.6219 50.6587C49.2148 52.0279 47.8352 53.1482 47.5565 53.1482C46.8512 53.1482 43.9224 50.6139 39.7248 46.3708L36.1646 42.7728L30.9424 47.9606C28.0701 50.8138 25.4956 53.1482 25.2211 53.1482C24.0985 53.1482 19.1134 48.3817 19.1134 47.3082C19.1134 46.7725 21.7369 43.8077 25.5605 40.0218L29.4788 36.1418L24.836 31.424C22.2826 28.8291 19.9362 26.3082 19.6219 25.8222C19.0687 24.9676 19.0732 24.9011 19.7526 23.8018C20.7204 22.2357 24.2721 19.0815 25.0677 19.0815C25.4758 19.0815 27.6713 21.0165 30.9333 24.2512Z"
                        fill="#F8485E"
                      />
                    </svg>
                  </span>
                  <h3 className="mt-2">
                    Are you sure you want to cancel your order?
                  </h3>
                  <p>You can’t undo this action.</p>
                  <div class="btngroups text-end">
                    <button type="button" class="cancel-btn">
                      {" "}
                      Cancel
                    </button>
                    <button type="button" class="accept-btn">
                      {" "}
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================ sharefeedback-popup =============================== */}

        <div className="popupouter sharefeedback-popup d-none">
          <div className="popupinner">
            <h4>Share your Feedback</h4>
            <p>How satisfied are you with our services...!</p>
            <div class="close-btn" type="button">
              <svg
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z"
                  fill="black"
                ></path>
              </svg>
            </div>
            <div class="popup-body">
              <span>
                <svg
                  width="325"
                  height="48"
                  viewBox="0 0 325 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.2222 8.55787C17.9728 16.8229 17.8489 17.1162 17.608 17.1148C17.0318 17.111 0.714412 18.2027 0.373383 18.2678L0 18.339L6.82018 24.2015C10.5712 27.4258 13.6403 30.1217 13.6403 30.1924C13.6403 30.2631 12.6411 34.29 11.4199 39.1411C10.1987 43.9922 9.21173 47.9737 9.2266 47.9889C9.24157 48.0039 12.7156 45.8002 16.9467 43.0914L24.6396 38.1665L32.3396 43.0954C36.5745 45.8063 40.0494 48.0133 40.0616 47.9999C40.0787 47.9812 37.3423 37.0471 35.8135 31.0258L35.5828 30.117L42.44 24.228L49.2973 18.339L48.9258 18.2678C48.5853 18.2024 32.2756 17.112 31.684 17.1151C31.4312 17.1163 31.352 16.9291 28.0622 8.55846C26.2123 3.8517 24.6736 0.000391261 24.6429 1.67678e-08C24.6121 -0.000293416 23.0728 3.85072 21.2222 8.55787Z"
                    fill="#FFC900"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M89.979 8.55787C86.7296 16.8229 86.6057 17.1162 86.3649 17.1148C85.7887 17.111 69.4712 18.2027 69.1302 18.2678L68.7568 18.339L75.577 24.2015C79.328 27.4258 82.3971 30.1217 82.3971 30.1924C82.3971 30.2631 81.398 34.29 80.1767 39.1411C78.9555 43.9922 77.9686 47.9737 77.9834 47.9889C77.9984 48.0039 81.4724 45.8002 85.7036 43.0914L93.3965 38.1665L101.096 43.0954C105.331 45.8063 108.806 48.0133 108.818 47.9999C108.836 47.9812 106.099 37.0471 104.57 31.0258L104.34 30.117L111.197 24.228L118.054 18.339L117.683 18.2678C117.342 18.2024 101.032 17.112 100.441 17.1151C100.188 17.1163 100.109 16.9291 96.819 8.55846C94.9692 3.8517 93.4305 0.000391261 93.3997 1.67678e-08C93.3689 -0.000293416 91.8296 3.85072 89.979 8.55787Z"
                    fill="#FFC900"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M158.736 8.55787C155.486 16.8229 155.363 17.1162 155.122 17.1148C154.545 17.111 138.228 18.2027 137.887 18.2678L137.514 18.339L144.334 24.2015C148.085 27.4258 151.154 30.1217 151.154 30.1924C151.154 30.2631 150.155 34.29 148.934 39.1411C147.712 43.9922 146.725 47.9737 146.74 47.9889C146.755 48.0039 150.229 45.8002 154.46 43.0914L162.153 38.1665L169.853 43.0954C174.088 45.8063 177.563 48.0133 177.575 47.9999C177.592 47.9812 174.856 37.0471 173.327 31.0258L173.096 30.117L179.954 24.228L186.811 18.339L186.44 18.2678C186.099 18.2024 169.789 17.112 169.198 17.1151C168.945 17.1163 168.866 16.9291 165.576 8.55846C163.726 3.8517 162.187 0.000391261 162.157 1.67678e-08C162.126 -0.000293416 160.586 3.85072 158.736 8.55787Z"
                    fill="#FFC900"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M227.493 8.55787C224.243 16.8229 224.119 17.1162 223.879 17.1148C223.302 17.111 206.985 18.2027 206.644 18.2678L206.271 18.339L213.091 24.2015C216.842 27.4258 219.911 30.1217 219.911 30.1924C219.911 30.2631 218.912 34.29 217.69 39.1411C216.469 43.9922 215.482 47.9737 215.497 47.9889C215.512 48.0039 218.986 45.8002 223.217 43.0914L230.91 38.1665L238.61 43.0954C242.845 45.8063 246.32 48.0133 246.332 47.9999C246.349 47.9812 243.613 37.0471 242.084 31.0258L241.853 30.117L248.711 24.228L255.568 18.339L255.196 18.2678C254.856 18.2024 238.546 17.112 237.954 17.1151C237.702 17.1163 237.623 16.9291 234.333 8.55846C232.483 3.8517 230.944 0.000391261 230.913 1.67678e-08C230.883 -0.000293416 229.343 3.85072 227.493 8.55787Z"
                    fill="#FFC900"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M296.249 8.55787C293 16.8229 292.876 17.1162 292.635 17.1148C292.059 17.111 275.741 18.2027 275.4 18.2678L275.027 18.339L281.847 24.2015C285.598 27.4258 288.667 30.1217 288.667 30.1924C288.667 30.2631 287.668 34.29 286.447 39.1411C285.226 43.9922 284.239 47.9737 284.253 47.9889C284.268 48.0039 287.742 45.8002 291.974 43.0914L299.666 38.1665L307.366 43.0954C311.601 45.8063 315.076 48.0133 315.088 47.9999C315.106 47.9812 312.369 37.0471 310.84 31.0258L310.61 30.117L317.467 24.228L324.324 18.339L323.953 18.2678C323.612 18.2024 307.302 17.112 306.711 17.1151C306.458 17.1163 306.379 16.9291 303.089 8.55846C301.239 3.8517 299.7 0.000391261 299.67 1.67678e-08C299.639 -0.000293416 298.1 3.85072 296.249 8.55787Z"
                    fill="#DFDFDF"
                  />
                </svg>
              </span>
              <textarea
                type="text"
                class="form-control"
                placeholder="Describe what you like the most..."
              ></textarea>
              <div class="btngroups text-end my-3">
                <button type="button" class="btn save-btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================================ Open Ticket popup =============================== */}

        <div className="popupouter query-popup d-none">
          <div className="popupinner">
            <h2>User Query</h2>
            <div className="title">
              <div className="left-part">
                <img src="/images/user.png" alt="img" />
                <div className="">
                  <h4>John Doe</h4>
                  <p>#1234565</p>
                </div>
              </div>
              <div className="right-part">
                <p>Lorem Ipsum Inc.</p>
                <span>
                  {" "}
                  <a href="mailto:example123@gmail.com">example123@gmail.com</a>
                </span>
                <span>+91 85695 51486</span>
              </div>
            </div>
            <p>20/9/2022</p>
            <div class="close-btn" type="button">
              <svg
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z"
                  fill="black"
                ></path>
              </svg>
            </div>
            <div class="popup-body">
              <p>
                Lörem ipsum pang kan ett aspludd. Dism miplangen. Afåst ming att
                ösaligt monotyskap. Ojåhyvis monosat om mobilmissbruk. Bin
                Ladinrabatt rel: hexaskap ditoledes. Gögen oliga. Ennomi kogon i
                pal inte antemolig. Sutreng niligt på terall osk kadungar.
                Spevis pomoskap av tedor i behyr onat. Parartad makrosade.
                Krofäre. Sens makromos, ontograf antehylig som prerade.
                Kvasikärade av. Tjejkött. Dev saktiga eurobusa i däs nepadade.
                Prohet. Panerade fisk. Plalåprerat. Krokrosat der. Giganyrat
                obur inframeliga tetrans. Pobelt dihiledes. Sänangen biminade
                jymilår påsam rening. Obunera vöber, vack pas. Epikrorade
                dirade, som tirad lockdown. Presm beling, derinas kust dos. Nånt
                fassa transtopi odett, även om plan. Mobilvirus cookie, syna. Or
                vijäska provör.{" "}
              </p>
            </div>
            <div className=" mt-3 d-flex  justify-content-between">
              <div className="">
                <button className="btn mail-btn me-2" type="button">
                  <svg viewBox="0 0 10 7" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.26669 0.0178526C0.974869 0.0789949 0.7268 0.34912 0.670244 0.667347C0.646377 0.801566 0.646377 5.72447 0.670244 5.85869C0.728143 6.18445 0.974699 6.44752 1.28 6.50929C1.40655 6.5349 8.60281 6.5349 8.72935 6.50929C9.03466 6.44752 9.28121 6.18445 9.33911 5.85869C9.36298 5.72447 9.36298 0.801566 9.33911 0.667347C9.28121 0.341593 9.03466 0.0785234 8.72935 0.0167462C8.61556 -0.00628867 1.37675 -0.0052186 1.26669 0.0178526ZM6.98537 2.13161C5.96596 3.21354 5.45986 3.73828 5.39595 3.77964C5.15772 3.93372 4.85163 3.93372 4.61341 3.77964C4.54949 3.73828 4.04339 3.21354 3.02398 2.13161L1.52835 0.544246H5.00468H8.48101L6.98537 2.13161ZM2.68422 2.53635L3.36412 3.26304L2.51423 4.17109C2.04679 4.67051 1.5515 5.19382 1.4136 5.33399L1.16286 5.58882V3.26295V0.937073L1.58359 1.37336C1.815 1.61332 2.31027 2.13667 2.68422 2.53635ZM8.84236 4.42837L8.83799 5.59372L7.74155 4.42799L6.6451 3.26224L7.74155 2.09858L8.83799 0.934914L8.84236 2.09898C8.84477 2.7392 8.84477 3.78742 8.84236 4.42837ZM3.90855 3.84448C4.21619 4.17526 4.39442 4.30694 4.64769 4.39055C4.75442 4.42579 4.81259 4.43265 5.00468 4.43265C5.26602 4.43265 5.40234 4.3987 5.59965 4.28452C5.74577 4.19994 5.82297 4.13258 6.07068 3.87343L6.27822 3.6563L6.68265 4.07517C6.90508 4.30554 7.40068 4.82921 7.78396 5.23885L8.48086 5.98368L5.00459 5.9829L1.52835 5.98212L2.62155 4.82208C3.22281 4.18407 3.72019 3.66205 3.72682 3.66205C3.73344 3.66205 3.81523 3.74414 3.90855 3.84448Z"
                      fill="#FFC900"
                    />
                  </svg>
                  Mail
                </button>

                <button className="btn chat-btn" type="button">
                  <svg viewBox="0 0 9 8" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.693363 0.027649C0.386961 0.101228 0.146631 0.31892 0.0658023 0.596075C0.0244906 0.737696 0.0251613 4.96722 0.0665093 5.10899C0.147954 5.38821 0.389553 5.60328 0.703895 5.67641C0.783401 5.69491 0.921294 5.70056 1.29277 5.70056H1.77784L1.78293 6.39552C1.78786 7.06848 1.7892 7.09189 1.8254 7.13516C1.91558 7.243 2.06144 7.28284 2.17971 7.23196C2.21354 7.2174 2.71432 6.86722 3.29257 6.45376L4.34395 5.70199L6.15739 5.70128C8.12887 5.7005 8.06583 5.70324 8.27233 5.60978C8.40013 5.55195 8.56061 5.41135 8.62829 5.29793C8.74567 5.10127 8.73977 5.23065 8.73977 2.85131C8.73977 0.961719 8.73628 0.676777 8.71202 0.593631C8.63058 0.314404 8.38898 0.0993336 8.07464 0.0262081C7.92048 -0.0096504 0.842912 -0.00827433 0.693363 0.027649ZM8.02584 0.561577C8.05337 0.579935 8.09271 0.615065 8.11326 0.639656C8.15059 0.684289 8.15064 0.68798 8.15064 2.84971V5.01506L8.0984 5.07622C8.00225 5.1888 8.12282 5.18252 6.05872 5.18252C4.9064 5.18252 4.17466 5.18848 4.14633 5.19811C4.12108 5.20667 3.7128 5.49079 3.23905 5.82948C2.76528 6.16815 2.37377 6.44526 2.36903 6.44526C2.36429 6.44526 2.35805 6.19808 2.35519 5.896C2.35018 5.37034 2.34835 5.34481 2.31259 5.30204C2.29203 5.27748 2.25271 5.24235 2.2252 5.22399C2.17729 5.19202 2.14629 5.19027 1.48893 5.18252C0.831564 5.17476 0.800567 5.17301 0.752657 5.14104C0.72514 5.12268 0.685822 5.08755 0.665266 5.06296C0.628015 5.01843 0.62787 5.01062 0.622686 2.89465C0.619822 1.72666 0.622178 0.747571 0.627942 0.718885C0.640958 0.653999 0.717146 0.57129 0.790126 0.542814C0.835661 0.525038 1.47424 0.521849 4.4106 0.524714L7.97577 0.528195L8.02584 0.561577ZM1.95026 2.09692C1.83033 2.14377 1.7612 2.26792 1.7869 2.39026C1.8028 2.46596 1.89332 2.55541 1.97551 2.57663C2.02107 2.5884 2.78873 2.59227 4.42873 2.58898C6.80706 2.58421 6.81583 2.58408 6.8657 2.55081C6.96083 2.48738 6.99051 2.43564 6.99051 2.33326C6.99051 2.23088 6.96083 2.17914 6.8657 2.11572C6.8158 2.08243 6.80837 2.08232 4.4106 2.07882C2.43881 2.07596 1.9956 2.07921 1.95026 2.09692ZM1.95026 3.13293C1.83026 3.17999 1.7612 3.30403 1.7869 3.42636C1.8028 3.50201 1.89327 3.59147 1.97551 3.61281C2.02029 3.62443 2.44011 3.62844 3.26859 3.62516C4.47506 3.62037 4.49622 3.61973 4.54543 3.5869C4.64056 3.52347 4.67024 3.47173 4.67024 3.36936C4.67024 3.26698 4.64056 3.21524 4.54543 3.15181C4.49616 3.11893 4.47638 3.11838 3.25047 3.11483C2.24318 3.11194 1.995 3.11538 1.95026 3.13293Z"
                      fill="#FFC900"
                    />
                  </svg>{" "}
                  Chat
                </button>
              </div>
              <button className="btn dismiss-btn" type="button">
                Dismiss
              </button>
            </div>
          </div>
        </div>

        {/* ========================= download invoice popup ================================= */}

        <div className="popupouter downloadinvoice-popup d-none">
          <div className="popupinner">
            <h2>Lorem ipsum dolor sit amet,</h2>
            <p>
              How satisfied are you with our services...!Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Fermentum tristique tortor
              felis lacus,
            </p>
            <div class="btngroups">
              <div class="close-btn" type="button">
                <svg
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z"
                    fill="black"
                  ></path>
                </svg>
              </div>
              <button type="button" className="btn save-btn">
                {" "}
                <span>
                  <svg
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.7751 16.4434C9.65576 16.2746 8.77539 15.821 7.94874 14.9873C7.60748 14.6432 7.25418 14.2548 7.16344 14.1241C7.0184 13.9153 6.97688 13.8981 6.81923 13.9825C6.25186 14.2862 5.16495 14.2473 4.4821 13.8989C3.67224 13.4857 3.02133 12.5652 2.9048 11.6683C2.85468 11.2824 2.81864 11.2272 2.44348 10.963C1.70609 10.4436 1.11702 9.60584 0.77347 8.58805C0.548913 7.92256 0.569387 6.59758 0.815318 5.8855C1.07206 5.14205 1.46958 4.5203 2.025 3.99322C2.9749 3.09196 4.04437 2.69158 5.50211 2.69158H6.30796V3.26484V3.83811H5.54715C5.12875 3.83811 4.5726 3.8938 4.31135 3.96186C2.48001 4.43881 1.32938 6.41569 1.85367 8.18414C2.13662 9.13855 2.60768 9.74924 3.49133 10.3073L4.01489 10.638V11.1596C4.01489 12.2434 4.74925 13.0525 5.72609 13.0452C6.08946 13.0424 6.30837 12.9788 6.77681 12.7394C7.10226 12.5732 7.40135 12.4371 7.44139 12.4371C7.48152 12.4371 7.68962 12.7388 7.90386 13.1077C8.4234 14.0018 9.01329 14.5799 9.77533 14.9418C11.3501 15.6897 13.0518 15.4243 14.2869 14.2383C15.1422 13.417 15.5584 12.4093 15.5609 11.1532L15.5621 10.5654L16.0404 10.2748C18.1215 9.01071 18.4562 6.36016 16.7396 4.73675C16.0059 4.04285 15.1797 3.75622 13.9131 3.75622H13.2691V3.17091V2.5856L14.2313 2.63327C15.7674 2.70943 16.6781 3.07755 17.617 4.0019C19.0407 5.40354 19.3863 7.5976 18.4686 9.40856C18.198 9.9426 17.61 10.6274 17.1339 10.963C16.7348 11.2443 16.7262 11.2596 16.6685 11.7806C16.5897 12.492 16.3444 13.2712 16.0078 13.8791C15.0113 15.6794 12.8221 16.7522 10.7751 16.4434ZM8.09058 8.48764L6.40476 6.25403L7.50183 6.23126L8.5989 6.20849L8.62044 3.32397L8.64198 0.439453H9.78852H10.9351L10.9566 3.32397L10.9781 6.20849L12.0788 6.23126L13.1794 6.25403L11.5389 8.42425C10.6366 9.61788 9.8709 10.6231 9.83733 10.6579C9.80375 10.6928 9.01772 9.71615 8.09058 8.48764Z"
                      fill="black"
                    />
                  </svg>
                </span>{" "}
                Download Invoice{" "}
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================================ */}
      </div>
    </>
  );
};

export default AdminDashboard;

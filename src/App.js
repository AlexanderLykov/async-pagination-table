import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeUserParams, fetchPassengers } from "./redux/actions/passengers";

import "antd/dist/antd.css";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "20%",
  },
  {
    title: "Trips",
    dataIndex: "trips",
    width: "20%",
  },
  {
    title: "Airline",
    children: [
      {
        title: "Country",
        dataIndex: "airline",
        key: "country",
        render: (airline) => {
          if (Array.isArray(airline)) {
            return `${airline[0].country}`;
          } else {
            return `${airline.country || "----"}`;
          }
        },
      },
      {
        title: "Name",
        dataIndex: "airline",
        key: "name",
        render: (airline) => {
          if (Array.isArray(airline)) {
            return `${airline[0].name}`;
          } else {
            return `${airline.name || "----"}`;
          }
        },
      },
      {
        title: "Website",
        dataIndex: "airline",
        key: "website",
        render: (airline) => {
          if (Array.isArray(airline)) {
            return `${airline[0].website}`;
          } else {
            return `${airline.website || "----"}`;
          }
        },
      },
    ],
    dataIndex: "airline",
  },
];

export const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.passengers.data);
  const userParams = useSelector((state) => state.passengers.userParams);
  const loading = useSelector((state) => state.passengers.loading);
  const totalPassengers = useSelector((state) => state.passengers.totalPassengers);

  useEffect(() => {
    dispatch(fetchPassengers());
  }, [dispatch]);

  const handleTableChange = (pagination) => {
    dispatch(changeUserParams(pagination));
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={data}
      pagination={{
        current: userParams.current,
        pageSize: userParams.pageSize,
        total: totalPassengers,
      }}
      loading={loading}
      onChange={handleTableChange}
      scroll={{ y: 550 }}
      bordered
    />
  );
}
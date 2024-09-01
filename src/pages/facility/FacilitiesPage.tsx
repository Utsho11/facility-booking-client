import React, { useState } from "react";
import { Row, Col, Card, Input, Select, Pagination, Button } from "antd"; // Your RTK Query hook
import { useGetAllFacilitiesQuery } from "../../redux/features/admin/admin.api";
import { Link } from "react-router-dom";
import { FaLocationDot, FaMoneyCheckDollar } from "react-icons/fa6";
import { IoInformationCircleSharp } from "react-icons/io5";

const { Search } = Input;
const { Option } = Select;

const FacilitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState<string | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);

  const getQueryParams = () => {
    const queryParams: { name: string; value: string }[] = [];

    if (searchTerm) {
      queryParams.push({ name: "searchTerm", value: searchTerm });
    }

    if (filterLocation) {
      queryParams.push({
        name: "sort",
        value: filterLocation === "asc" ? "asc" : "desc",
      });
    }

    queryParams.push({ name: "page", value: page.toString() });
    queryParams.push({ name: "limit", value: "6" });

    return queryParams;
  };

  const { data, isLoading } = useGetAllFacilitiesQuery(getQueryParams());

  const metaData = data?.meta;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value: string) => {
    setFilterLocation(value);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ margin: "3rem 2rem", padding: "1rem 0" }}>
      {/* Search Bar */}
      <div style={{ margin: "auto" }}>
        <Row
          gutter={[8, 8]}
          justify="center"
          align="middle"
          style={{ margin: "2rem 0" }}
        >
          <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
            <Search
              placeholder="Search facilities"
              enterButton="Search"
              onSearch={handleSearch}
              style={{ width: "350px" }}
            />
          </Col>
          {/* Filter Dropdown */}
          <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
            <Select
              placeholder="Filter by price"
              allowClear
              defaultValue="asc"
              style={{ width: "350px" }}
              onChange={handleFilterChange}
            >
              <Option value="asc"> Low to High</Option>
              <Option value="desc">High to Low</Option>
            </Select>
          </Col>
        </Row>
      </div>

      {/* Facilities Cards */}
      <Row gutter={[16, 16]}>
        {data?.data?.map((facility, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <Card
              title={facility.name}
              bordered={false}
              hoverable
              style={{ width: "100%", height: "100%" }}
            >
              <img className="facility-card-img" src={facility?.image} />
              <p style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <FaLocationDot />
                <strong>{facility.location}</strong>
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <FaMoneyCheckDollar />
                <strong>{facility.pricePerHour}$</strong>
              </p>
              <hr style={{ margin: "1rem 0" }} />
              <div>
                <Row gutter={8}>
                  <Col>
                    <Link to={`/facility/${facility._id}`}>
                      <Button>
                        <IoInformationCircleSharp />
                        Details
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/createBooking">
                      <Button
                        style={{ backgroundColor: "#fe7d1f", color: "#fff" }}
                      >
                        Book Now
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination (if required) */}
      <div>
        <Pagination
          style={{ marginTop: "2rem" }}
          align="center"
          current={page}
          pageSize={metaData?.limit}
          total={metaData?.total}
          onChange={(value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default FacilitiesPage;

import React, { useState } from "react";
import { Row, Col, Card, Input, Select, Pagination } from "antd"; // Your RTK Query hook
import { useGetAllFacilitiesQuery } from "../../redux/features/admin/admin.api";

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
    <div style={{ margin: "3rem 2rem", height: "100vh" }}>
      {/* Search Bar */}
      <Row gutter={8} justify="center" align="middle">
        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
          <Search
            placeholder="Search facilities"
            enterButton="Search"
            onSearch={handleSearch}
            style={{ marginBottom: "20px", width: "300px" }}
          />
        </Col>
        {/* Filter Dropdown */}
        <Col>
          <Select
            placeholder="Filter by price"
            allowClear
            defaultValue="asc"
            style={{ marginBottom: "20px", width: "300px" }}
            onChange={handleFilterChange}
          >
            <Option value="asc"> Low to High</Option>
            <Option value="desc">High to Low</Option>
          </Select>
        </Col>
      </Row>

      {/* Facilities Cards */}
      <Row gutter={[16, 16]}>
        {data?.data?.map((facility, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <Card
              title={facility.name}
              bordered={false}
              hoverable
              style={{ width: "100%" }}
            >
              <img className="facility-card-img" src={facility?.image} />
              <p>
                <strong>Location:</strong> {facility.location}
              </p>
              <p>
                <strong>Hourly Rate:</strong> ${facility.pricePerHour}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination (if required) */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
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

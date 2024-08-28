import { useParams } from "react-router-dom";

const FacilityDetailsPage = () => {
  const { id } = useParams();
  console.log(id);

  return <div className="">This is FacilityDetailsPage page.</div>;
};

export default FacilityDetailsPage;

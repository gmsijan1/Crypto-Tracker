import CoinsTable from "../components/CoinsTable";
import Header from "../components/Header";
import Banner from "../components/Banner";

const Homepage = () => {
  return (
    <>
      <div className="page-bg">
        <Header />
        <Banner />
        <CoinsTable />
      </div>
    </>
  );
};

export default Homepage;

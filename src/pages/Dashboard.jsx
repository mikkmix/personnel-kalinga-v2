import React from "react";
import Layout from "../layouts/Layout";
import DateRow from "../components/DateRow";
import Cards from "../components/Cards";
import Reports from "../components/Reports";
import MapCard from "../components/MapCard";
import ResourcesCard from "../components/ResourcesCard";
import TriageCard from "../components/TriageCard"; // ✅ import triage
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <Layout>
      <DateRow />
      <Cards />

      {/* Reports & Map side by side */}
      <div className="cards-grid mt-4">
        <Reports />
        <MapCard />
      </div>

      {/* ✅ Triage System placed here */}
      <div className="mt-4">
        <TriageCard />
      </div>

      {/* Resources */}
      <div className="mt-4">
        <ResourcesCard />
      </div>

      <Footer />
    </Layout>  /* <-- kulang ito sa code mo */
  );
};

export default Dashboard;

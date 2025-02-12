import Layout from "../components/Layout";
import Header from "../components/Header";
import CustomerTable from "../components/CustomerTable";
import AnalyticsCard from "../components/AnalyticsCard";
import HeroCard from "@/components/HeroCard";

export default function Home() {
  return (
    <Layout>
      <Header />
      <HeroCard />
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
          <CustomerTable />
        </div>
        <AnalyticsCard />
      </div>
    </Layout>
  );
}
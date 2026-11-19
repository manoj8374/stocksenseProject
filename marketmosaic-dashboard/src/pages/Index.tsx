import { Card } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [niftyData, setNiftyData] = useState([]);
  const [bankNiftyData, setBankNiftyData] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("http://192.168.1.10:8000/market-data");
        const result = await response.json();
        console.log(result.banknifty)
        setNiftyData(result.nifty);
        setBankNiftyData(result.banknifty);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Market Overview */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {/* NIFTY Chart */}
          <Card className="p-6 glass card-gradient">
            <h3 className="text-lg font-semibold mb-2">NIFTY 50 Overview</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={niftyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={["auto", "auto"]} /> {/* Set to 'auto' */}
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* BANKNIFTY Chart */}
          <Card className="p-6 glass card-gradient">
            <h3 className="text-lg font-semibold mb-2">BANKNIFTY Overview</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bankNiftyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={['dataMin - 500', 'dataMax + 500']} /> {/* Set to 'auto' */}
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Market Updates */}
          {/* <Card className="p-6 glass">
            <h3 className="text-lg font-semibold mb-4">Market Updates</h3>
            <div className="space-y-4">
              {[
                { title: "Market Rally", description: "S&P 500 reaches new high", type: "success" },
                { title: "Tech Sector", description: "Major tech stocks showing volatility", type: "warning" },
                { title: "Market Alert", description: "Federal Reserve announces policy change", type: "danger" },
              ].map((update, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {update.type === "success" && <TrendingUp className="h-5 w-5 text-green-500" />}
                  {update.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                  {update.type === "danger" && <TrendingDown className="h-5 w-5 text-red-500" />}
                  <div>
                    <h4 className="font-medium">{update.title}</h4>
                    <p className="text-sm text-muted-foreground">{update.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card> */}
        </section>
      </div>
    </Layout>
  );
};

export default Index;

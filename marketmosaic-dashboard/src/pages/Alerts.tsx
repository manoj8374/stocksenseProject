import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Bell, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Alerts = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Alerts</h2>
        <div className="grid gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Price Alert: TSLA</h3>
                  <Badge variant="destructive">-5.2%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Tesla stock has dropped below your alert threshold of $180</p>
              </div>
              <p className="text-sm text-muted-foreground">2 min ago</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Price Alert: AAPL</h3>
                  <Badge variant="default" className="bg-green-500">+3.1%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Apple stock has exceeded your target price of $190</p>
              </div>
              <p className="text-sm text-muted-foreground">1 hour ago</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Market Update</h3>
                  <Badge variant="secondary">News</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Federal Reserve announces unexpected interest rate decision</p>
              </div>
              <p className="text-sm text-muted-foreground">3 hours ago</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;
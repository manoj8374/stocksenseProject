import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Loader } from "lucide-react";

interface HistoryItem {
  id: number;
  title: string;
  date: string;
  type: "AI Generated" | "Custom";
  summary: string;
  details: string;
}

const initialHistoryData: HistoryItem[] = [
  {
    id: 1,
    title: "Today's Market Summary",
    date: "February 11, 2025",
    type: "AI Generated",
    summary: "The market remains bearish, with Sensex crashing 1,000 points, Nifty forming long bear candles, and global cues driving negative sentiment.",
    details: "The technology sector demonstrated remarkable strength today, primarily driven by semiconductor and AI-focused companies. NVIDIA Corporation (NVDA) led the charge with a 4.1% increase, reaching new all-time highs on expanded AI chip demand. Other notable performers included AMD (+2.8%) and Intel (+1.9%). Cloud computing services also saw significant activity, with Microsoft Azure and Amazon AWS reporting increased AI workload adoption. The NASDAQ Composite closed up 1.2%, outperforming broader market indices."
  }
];

const MarketOverview = ({ text }) => {
  const formattedText = text.replace(/\n/g, "<br>");
  return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

const History = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>(initialHistoryData);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(false);

  const changeItem = async (item: HistoryItem) => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.1.10:8000/daily-report");
      const data = await response.json();
      
      const updatedItem = {
        ...item,
        details: data
      };

      setHistoryData((prevData) =>
        prevData.map((historyItem) =>
          historyItem.id === item.id ? updatedItem : historyItem
        )
      );

      setSelectedItem(updatedItem);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">History</h2>
        
        {selectedItem ? (
          <Card className="p-6 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setSelectedItem(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{selectedItem.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedItem.date}</p>
                </div>
                <Badge>{selectedItem.type}</Badge>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-4">
                  <Loader className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Summary</h4>
                    <p className="text-sm">{selectedItem.summary}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Details</h4>
                    <p className="text-sm whitespace-pre-line"><MarketOverview text={selectedItem.details} /></p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {historyData.map((item) => (
              <Card 
                key={item.id} 
                className="p-6 hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => changeItem(item)}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <Badge variant={item.type === "AI Generated" ? "default" : "secondary"}>
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-sm">{item.summary}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;

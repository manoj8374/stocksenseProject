// // import { useState } from "react";
// // import { Layout } from "@/components/layout/Layout";
// // import { Card } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Send } from "lucide-react";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import LineChartComponent from "./LineChartComponent";
// // import axios from 'axios';

// // interface Message {
// //   sender: string;
// //   content: JSX.Element;
// //   isChart?: boolean;
// // }

// // const MarketSummary = ({ text }) => {
// //   const formattedText = text.replace(/\n/g, "<br>");
// //   return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
// // };

// // const Chat = () => {
// //   const [messages, setMessages] = useState<Message[]>([
// //     { sender: "bot", content: <p>Hello! How can I help you with market analysis today?</p> }
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const sendMessage = async () => {
// //     if (!input.trim()) return;

// //     const userMessage = { sender: "user", content: <p>{input}</p> };
// //     setMessages((prev) => [...prev, userMessage]);
// //     setInput(""); 
// //     setLoading(true);

// //     try {
// //       const response = await fetch("http://192.168.1.10:8000/query", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ query: input }),
// //       });

// //       const data = await response.json();
// //       console.log(data)
// //       let validJsonString = data["response"]
// //         .replace(/'/g, '"')  // Replace single quotes with double quotes
// //         .replace(/`/g, '"')  // Replace backticks with double quotes
// //         .replace(/(\w)"s/g, "$1's");
// //       console.log(validJsonString)
// //       const dataJson = JSON.parse(validJsonString);
// //       let chatRes;

// //       if (dataJson["commodity"]) {
// //         chatRes = {
// //           sender: "bot",
// //           content: (
// //             <div className="p-4 bg-gray-100 rounded-md">
// //               <h3 className="text-lg font-bold text-black">📊 Commodity: {dataJson.commodity}</h3>
// //               <ul className="mt-2 space-y-2">
// //                 {dataJson.last_5_dates_data.map((entry, index) => (
// //                   <li key={index} className="text-sm text-black">
// //                     📅 {entry.date}: <strong className="text-black">${parseFloat(entry.value).toFixed(2)}</strong>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ),
// //         };
// //       }else if(dataJson["stock_price"]){
// //         chatRes = {
// //           sender: "bot",
// //           content: (
// //             <div className="p-4 bg-gray-100 rounded-md">
// //               <h3 className="text-lg font-bold text-black">📈 Stock Price Chart</h3>
// //               <div className='w-full'><LineChartComponent data={dataJson["stock_price"]} /></div>
// //             </div>
// //           ),
// //           isChart: true
// //         };
// //         console.log("Stock Price:", dataJson["stock_price"]);
// //       }else if(dataJson["summary"]){
// //         chatRes = { sender: "bot", content: <MarketSummary text={dataJson.summary} /> };
// //       }else if(dataJson["name"] === "Real Gross Domestic Product"){
// //         chatRes = {
// //           sender: "bot",
// //           content: (
// //             <div className="p-4 bg-gray-100 rounded-md">
// //               <h3 className="text-lg font-bold text-black">📈 Real Gross Domestic Product (GDP)</h3>
// //               <table className="w-full border-collapse border border-gray-300 mt-2">
// //                 <thead>
// //                   <tr className="bg-gray-200">
// //                     <th className="border border-gray-300 px-4 py-2 text-black">Year</th>
// //                     <th className="border border-gray-300 px-4 py-2 text-black">GDP (Billions USD)</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {dataJson.data.slice(0, 10).map((entry, index) => (
// //                     <tr key={index} className="text-center">
// //                       <td className="border border-gray-300 px-4 py-2 text-black">{entry.date.split("-")[0]}</td>
// //                       <td className="border border-gray-300 px-4 py-2 text-black">{parseFloat(entry.value).toLocaleString()}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )
// //         };
// //       }else if(dataJson["crypto_data"]){
// //         const crypto = dataJson["crypto_data"]["Realtime Currency Exchange Rate"];
// //         chatRes = {
// //           sender: "bot",
// //           content: (
// //             <div className="p-4 bg-gray-100 rounded-md">
// //               <h3 className="text-lg font-bold text-black">💰 Crypto Exchange Rate</h3>
// //               <div className="mt-2 text-black space-y-2">
// //                 <p><strong>From:</strong> {crypto["2. From_Currency Name"]} ({crypto["1. From_Currency Code"]})</p>
// //                 <p><strong>To:</strong> {crypto["4. To_Currency Name"]} ({crypto["3. To_Currency Code"]})</p>
// //                 <p><strong>Current Price:</strong> ${parseFloat(crypto["5. Exchange Rate"]).toLocaleString()}</p>
// //               </div>
// //             </div>
// //           )
// //         };
// //     }else {
// //         chatRes = { sender: "bot", content: <p>{dataJson.text || "No response available."}</p> };
// //       }

// //       setMessages((prev) => [...prev, chatRes]);
// //     } catch (error) {
// //       console.error("Error fetching response:", error);
// //       setMessages((prev) => [...prev, { sender: "bot", content: <p>❌ Failed to fetch response.</p> }]);
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <Layout>
// //       <div className="max-w-4xl mx-auto">
// //         <Card className="p-6">
// //           <div className="space-y-4">
// //             <div className="h-[60vh] overflow-y-auto border rounded-lg p-4">
// //               <div className="space-y-4">
// //                 {messages.map((msg, index) => (
// //                   <div key={index} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}>
// //                     {msg.sender === "bot" && (
// //                       <Avatar>
// //                         <AvatarImage src = "./public/bot.png" />
// //                         <AvatarFallback>AI</AvatarFallback>
// //                       </Avatar>
// //                     )}
// //                     <div
// //                       className={`p-3 rounded-lg ${
// //                         msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
// //                       }`} style={msg.isChart ? { width: '90%' } : {}}>
// //                       {msg.content}
// //                     </div>
// //                     {msg.sender === "user" && (
// //                       <Avatar>
// //                         <AvatarImage src="./public/boy.png" />
// //                         <AvatarFallback>ME</AvatarFallback>
// //                       </Avatar>
// //                     )}
// //                   </div>
// //                 ))}
// //                 {loading && (
// //                   <div className="flex gap-3">
// //                     <Avatar>
// //                       <AvatarImage src="/placeholder.svg" />
// //                       <AvatarFallback>AI</AvatarFallback>
// //                     </Avatar>
// //                     <div className="bg-muted p-3 rounded-lg max-w-[80%]">
// //                       <p>Thinking...</p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="flex gap-2">
// //               <Input
// //                 placeholder="Type your message..."
// //                 className="flex-1"
// //                 value={input}
// //                 onChange={(e) => setInput(e.target.value)}
// //                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// //               />
// //               <Button onClick={sendMessage} disabled={loading}>
// //                 <Send className="h-4 w-4 mr-2" />
// //                 {loading ? "Loading..." : "Send"}
// //               </Button>
// //             </div>
// //           </div>
// //         </Card>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default Chat;


// import { useState } from "react";
// import { Layout } from "@/components/layout/Layout";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Send } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import LineChartComponent from "./LineChartComponent";
// import axios from 'axios';

// const faqQuestions = [
//   "What is the price of copper?",
//   "Stock price of Apple?",
//   "Live gold prices?",
//   "Latest market news?",
//   "Real GDP data for USA?",
// ];

// const MarketSummary = ({ text }) => {
//   const formattedText = text.replace(/\n/g, "<br>");
//   return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
// };

// const Chat = () => {
//   const [messages, setMessages] = useState([
//     { sender: "bot", content: <p>Hello! How can I help you with market analysis today?</p> }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", content: <p>{input}</p> };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput(""); 
//     setLoading(true);

//     try {
//       const response = await axios.post("http://192.168.1.10:8000/query", { query: input });
//       const dataJson = response.data;
//       let chatRes;

//       if (dataJson["commodity"]) {
//         chatRes = {
//           sender: "bot",
//           content: (
//             <div className="p-4 bg-gray-100 rounded-md">
//               <h3 className="text-lg font-bold text-black">📊 Commodity: {dataJson.commodity}</h3>
//               <ul className="mt-2 space-y-2">
//                 {dataJson.last_5_dates_data.map((entry, index) => (
//                   <li key={index} className="text-sm text-black">
//                     📅 {entry.date}: <strong className="text-black">${parseFloat(entry.value).toFixed(2)}</strong>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ),
//         };
//       } else if (dataJson["stock_price"]) {
//         chatRes = {
//           sender: "bot",
//           content: (
//             <div className="p-4 bg-gray-100 rounded-md">
//               <h3 className="text-lg font-bold text-black">📈 Stock Price Chart</h3>
//               <div className='w-full'><LineChartComponent data={dataJson["stock_price"]} /></div>
//             </div>
//           ),
//           isChart: true
//         };
//       } else if (dataJson["summary"]) {
//         chatRes = { sender: "bot", content: <MarketSummary text={dataJson.summary} /> };
//       } else {
//         chatRes = { sender: "bot", content: <p>{dataJson.text || "No response available."}</p> };
//       }
//       setMessages((prev) => [...prev, chatRes]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setMessages((prev) => [...prev, { sender: "bot", content: <p>❌ Failed to fetch response.</p> }]);
//     }
//     setLoading(false);
//   };

//   return (
//     <Layout>
//       <div className="max-w-4xl mx-auto">
//         <Card className="p-6">
//           <div className="space-y-4">
//             <div className="flex flex-wrap gap-2 mb-4">
//               {faqQuestions.map((question, index) => (
//                 <Button key={index} variant="outline" onClick={() => setInput(question)}>
//                   {question}
//                 </Button>
//               ))}
//             </div>

//             <div className="h-[60vh] overflow-y-auto border rounded-lg p-4">
//               <div className="space-y-4">
//                 {messages.map((msg, index) => (
//                   <div key={index} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}>
//                     {msg.sender === "bot" && (
//                       <Avatar>
//                         <AvatarImage src="./public/bot.png" />
//                         <AvatarFallback>AI</AvatarFallback>
//                       </Avatar>
//                     )}
//                     <div
//                       className={`p-3 rounded-lg ${
//                         msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
//                       }`} style={msg.isChart ? { width: '90%' } : {}}>
//                       {msg.content}
//                     </div>
//                     {msg.sender === "user" && (
//                       <Avatar>
//                         <AvatarImage src="./public/boy.png" />
//                         <AvatarFallback>ME</AvatarFallback>
//                       </Avatar>
//                     )}
//                   </div>
//                 ))}
//                 {loading && (
//                   <div className="flex gap-3">
//                     <Avatar>
//                       <AvatarImage src="/placeholder.svg" />
//                       <AvatarFallback>AI</AvatarFallback>
//                     </Avatar>
//                     <div className="bg-muted p-3 rounded-lg max-w-[80%]">
//                       <p>Thinking...</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <Input
//                 placeholder="Type your message..."
//                 className="flex-1"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               />
//               <Button onClick={sendMessage} disabled={loading}>
//                 <Send className="h-4 w-4 mr-2" />
//                 {loading ? "Loading..." : "Send"}
//               </Button>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </Layout>
//   );
// };

// export default Chat;


import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LineChartComponent from "./LineChartComponent";
import axios from 'axios';

interface Message {
  sender: string;
  content: JSX.Element;
  isChart?: boolean;
}

const faqQuestions = [
  "What is the price of copper?",
  "Stock price of Apple?",
  "Live gold prices?",
  "Latest market news?",
  "Real GDP data for USA?",
];

const MarketSummary = ({ text }) => {
  const formattedText = text.replace(/\n/g, "<br>");
  return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", content: <p>Hello! How can I help you with market analysis today?</p> }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", content: <p>{input}</p> };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); 
    setLoading(true);

    try {
        const response = await fetch("http://192.168.1.10:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      console.log(data)
      let validJsonString = data["response"]
        .replace(/'/g, '"')
        .replace(/`/g, '"')  
        .replace(/(\w)"s/g, "$1's");
      console.log(validJsonString)
      const dataJson = JSON.parse(validJsonString);
      let chatRes;

      if (dataJson["commodity"]) {
        chatRes = {
          sender: "bot",
          content: (
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold text-black">📊 Commodity: {dataJson.commodity}</h3>
              <ul className="mt-2 space-y-2">
                {dataJson.last_5_dates_data.map((entry, index) => (
                  <li key={index} className="text-sm text-black">
                    📅 {entry.date}: <strong className="text-black">${parseFloat(entry.value).toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ),
        };
      } else if (dataJson["stock_price"]) {
        chatRes = {
          sender: "bot",
          content: (
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold text-black">📈 Stock Price Chart</h3>
              <div className='w-full'><LineChartComponent data={dataJson["stock_price"]} /></div>
            </div>
          ),
          isChart: true
        };
      } else if (dataJson["summary"]) {
        chatRes = { sender: "bot", content: <MarketSummary text={dataJson.summary} /> };
      }else if(dataJson["name"] === "Real Gross Domestic Product"){
                chatRes = {
          sender: "bot",
          content: (
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold text-black">📈 Real Gross Domestic Product (GDP)</h3>
              <table className="w-full border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-black">Year</th>
                    <th className="border border-gray-300 px-4 py-2 text-black">GDP (Billions USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataJson.data.slice(0, 10).map((entry, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 px-4 py-2 text-black">{entry.date.split("-")[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-black">{parseFloat(entry.value).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        };
      } else {
        chatRes = { sender: "bot", content: <p>{dataJson.text || "No response available."}</p> };
      }
      setMessages((prev) => [...prev, chatRes]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { sender: "bot", content: <p>❌ Failed to fetch response.</p> }]);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="h-[60vh] overflow-y-auto border rounded-lg p-4">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}>
                    {msg.sender === "bot" && (
                      <Avatar>
                        <AvatarImage src="./public/bot.png" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`} style={msg.isChart ? { width: '90%' } : {}}>
                      {msg.content}
                    </div>
                    {msg.sender === "user" && (
                      <Avatar>
                        <AvatarImage src="./public/boy.png" />
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                      <p>Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {faqQuestions.map((question, index) => (
                <Button key={index} variant="outline" onClick={() => setInput(question)}>
                  {question}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                className="flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} disabled={loading}>
                <Send className="h-4 w-4 mr-2" />
                {loading ? "Loading..." : "Send"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Chat;

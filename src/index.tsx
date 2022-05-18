import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import { createServer, Model } from "miragejs";

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelancer de website",
          category: "Dev",
          amount: 6000,
          createdAt: new Date("2022-05-05 09:00:00"),
          type: "deposit",
        },
        {
          id: 2,
          title: "Aluguel",
          category: "Casa",
          amount: 1100,
          createdAt: new Date("2022-05-05 09:15:00"),
          type: "withdraw",
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";
    this.get("transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transaction", data);
    });
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

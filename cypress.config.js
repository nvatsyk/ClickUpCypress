import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN;
      return config;
    },
    baseUrl: "https://api.clickup.com/api/v2",
  },
});


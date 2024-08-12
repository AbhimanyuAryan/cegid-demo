import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  verbose: true,
  moduleDirectories: ["node_modules", "src"],
};

export default config;

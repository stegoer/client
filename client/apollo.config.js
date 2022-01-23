module.exports = {
  client: {
    service: {
      name: "stegoer",
      url: "http://localhost:8080/graphql",
    },
    includes: ["**/*.model.ts", "**/*.fragments.ts"],
    excludes: ["node_modules/**"],
  },
};

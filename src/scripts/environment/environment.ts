export const environment = () => {
  const dev = {
    CLOUD_FUNCTION_ENDPOINT: "http://localhost:8080",
  };
  const production = {
    CLOUD_FUNCTION_ENDPOINT:
      "https://us-central1-project-coco-251813.cloudfunctions.net",
  };
  switch (window.location.host) {
    case "localhost:3006":
      return dev;
    case "pearcoco.com":
      return production;
    default:
      throw new Error(`unknown window host:${window.location.host}`);
  }
};

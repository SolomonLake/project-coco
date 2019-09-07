export const config = () => {
  const dev = {
    CLOUD_FUNCTION_ENDPOINT__ZOOM_GET_TOKEN_DATA: "http://localhost:8080",
    CLOUD_FUNCTION_ENDPOINT__ZOOM_API_PROXY: "http://localhost:8081",
  };
  const production = {
    CLOUD_FUNCTION_ENDPOINT__ZOOM_GET_TOKEN_DATA:
      "https://us-central1-project-coco-251813.cloudfunctions.net",
    CLOUD_FUNCTION_ENDPOINT__ZOOM_API_PROXY:
      "https://us-central1-project-coco-251813.cloudfunctions.net",
  };
  switch (window.location.host) {
    case "localhost:3006":
      return dev;
    case "solomonlake.github.io":
      return production;
    default:
      throw new Error(`unknown window host:${window.location.host}`);
  }
};

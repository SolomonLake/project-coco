export type ZoomApiProxyBody = GetUser_ZoomApiProxy;

export type GetUser_ZoomApiProxy = {
  endPoint: "https://api.zoom.us/v2/users/me";
  requestInit: {
    method: "GET";
  };
};

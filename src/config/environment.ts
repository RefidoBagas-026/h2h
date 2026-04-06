type Environment = {
  AUTH_API: string;
  DL_SUPPORT_API: string;
  TPB_API: string;
  PEB_API: string;
  CEISA_API: string;
};

const ENV: Environment = {
  AUTH_API: import.meta.env.VITE_AUTH_API || "",
  DL_SUPPORT_API: import.meta.env.VITE_DL_SUPPORT_API || "",
  TPB_API: import.meta.env.VITE_TPB_API || "",
  PEB_API: import.meta.env.VITE_PEB_API || "",
  CEISA_API: import.meta.env.VITE_CEISA_API || ""
};

export default ENV;

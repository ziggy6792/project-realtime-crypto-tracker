declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_GSG_INTERNAL_URL: string;
      REACT_APP_API_GSG_INTERNAL_WS_URL: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

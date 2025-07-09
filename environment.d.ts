declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOC_DIR: string;
      DEMO_DIR: string;
      LITEX_DIR: string;
      LITEX_TMP_DIR: string;
      LITEX_VERSION: string;
    }
  }
}

export {};

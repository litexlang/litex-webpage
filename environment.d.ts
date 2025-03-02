declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DOC_DIR: string;
      }
    }
  }
  
  export {};
  
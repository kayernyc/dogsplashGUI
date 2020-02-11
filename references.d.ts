declare namespace NodeJS {
  interface Global {
      fetch: (url: string, config: object) => any;
  }
}
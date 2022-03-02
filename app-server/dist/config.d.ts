interface Config {
    port: number;
    mongoHost: string;
    mongoDb: string;
    uploadSizeLimit: number;
}
declare const config: Config;
export default config;

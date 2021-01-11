/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}
declare module "*.json" {
    const value: any;
    export default value;
}

interface Process {
    env: Env
}

interface Env {
    GOOGLE_API: string,
    DEFAULT_ENCRYPTKEY: string,
    DEFAULTPPASSWORD: string,
    GOOGLE_RECAPTHA: string
}

interface GlobalEnvironment {
    process: Process;
}
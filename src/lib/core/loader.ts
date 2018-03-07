import { AppEnv } from "archappenv";

export const Loader = {
  loadLoggerModule: (val: { type: string; resource: string; options?: any; }) =>
    AppEnv.Util.loader.load(val.type, val.resource, val.options),
};

Object.freeze(Loader);

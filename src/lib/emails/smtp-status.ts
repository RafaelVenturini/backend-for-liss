import {transporters} from "@emails/transporters.js";

export type TransporterKey = keyof typeof transporters;
export type TransporterStatus = Record<TransporterKey, "ok" | "error" | "unknown">;

export const smtpStatus: TransporterStatus = Object.fromEntries(Object.keys(transporters).map(k => [k, "unknown"])) as TransporterStatus;
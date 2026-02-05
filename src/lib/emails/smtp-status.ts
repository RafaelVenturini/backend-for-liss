import {TransporterKey, transporters} from "@emails/transporters.js";

export type TransporterStatus = Record<TransporterKey, "ok" | "error" | "unknown">;

export const smtpStatus: TransporterStatus = Object.fromEntries(Object.keys(transporters).map(k => [k, "unknown"])) as TransporterStatus;
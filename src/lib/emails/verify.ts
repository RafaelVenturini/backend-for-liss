import {transporters} from "@emails/transporters.js";
import {smtpStatus, TransporterKey} from "@emails/smtp-status.js";

export function verifyAllTransporters() {
    Promise.allSettled(
        (Object.entries(transporters) as [TransporterKey, any][])
            .map(async ([key, transporter]) => {
                try {
                    await transporter.verify();
                    smtpStatus[key] = "ok";
                } catch (err) {
                    smtpStatus[key] = "error";
                    console.error(`SMTP ${key} failed`, err);
                }
            })
    );
}
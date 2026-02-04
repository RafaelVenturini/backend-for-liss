import {isTransporterKey, TransporterKey, transporters, transportersStatus} from "@emails/transporters.js";
import {smtpStatus,} from "@emails/smtp-status.js";

export async function verifyAllTransporters() {
    await Promise.allSettled(
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

export const checkConnection = async (trans: string, attempts = 0) => {
    if (!isTransporterKey(trans)) return
    try {
        await transporters[trans].verify();
        transportersStatus[trans] = "ok";
        console.info(`SMTP de ${trans} Conectado e pronto para uso.`);
    } catch (err: any) {
        console.error(`Erro SMTP ${trans} (Tentativa ${attempts + 1}): ${err.message}`);
        transportersStatus[trans] = "error";
        if (attempts < 5) {
            setTimeout(() => checkConnection(trans, attempts + 1), 30000);
        }
    }
};
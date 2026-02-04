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

export const checkConnection = async (trans: string, attempts = 0): Promise<void> => {
    if (!isTransporterKey(trans)) return
    try {
        await Promise.race([
            transporters[trans].verify(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 10000)
            )
        ]);

        transportersStatus[trans] = "ok";
        console.info(`✅ SMTP de ${trans} conectado e pronto`);
    } catch (err: any) {
        console.error(`Erro SMTP ${trans} (Tentativa ${attempts + 1}): ${err.message}`);
        transportersStatus[trans] = "error";
        if (attempts < 5) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            return checkConnection(trans, attempts + 1);
        }
    }
};
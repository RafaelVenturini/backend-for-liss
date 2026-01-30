import {appConfig} from "@config";
import {generateToken} from "@api/zuma/generate-token.js";

export async function getProduct(id?: string, date?: string) {
    if (!appConfig.zuma.token) await generateToken()

    let url = "http://erp.zuma.net.br:9000/integracao/produtos"
    if (id) url += `/${id}`
    else if (date) url += `?dt_atualizacao=${date}`
    else url += `?dt_atualizacao=01/01/2025`

    const opt = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${appConfig.zuma.token}`
        }
    }
    const resp = await fetch(url, opt)
    return await resp.json()
}
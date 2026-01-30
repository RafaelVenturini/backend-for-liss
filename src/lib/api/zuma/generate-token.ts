import {appConfig} from "@config";

export async function generateToken() {
    const failAuth = "Falha na autenticacao dos dados!"
    let response = {code: 0, text: ""}
    const opt = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: appConfig.zuma.email,
            senha: appConfig.zuma.password,
        })
    }

    const url = 'http://erp.zuma.net.br:9000/integracao/logar'

    const resp = await fetch(url, opt)
    const text = await resp.text()


    if (!text) {
        response.code = 403;
        response.text = "Não foi retornado um token"
    }
    if (text === failAuth) {
        response.code = 400;
        response.text = "Falha na autenticacao dos dados!"
    }

    appConfig.zuma.token = text

    response.code = 200;
    response.text = "Token Atualizado"

    return response
}
export async function invalidateFitness(whatsapp: boolean) {
    const zap = ["catalogomoda.com.br", "suamoda.online",]
    const show = ["catalogofitness.com", "pricefull-lavi-fitness-production.up.railway.app",]
    const links = whatsapp ? zap : show
    const cachePath = "/api/server/invalidar-cache"

    const opt = {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({"tag": "catalogo"}),
    }

    for (const link of links) {
        const url = 'https://' + link + cachePath
        await fetch(url, opt)
        console.log('Cache invalidated in ', link)
    }
}
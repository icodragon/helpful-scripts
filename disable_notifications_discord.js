(async function () {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    const discord_token = (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()
    const flag_message_notifications = 2;

    const sendRequest = async (method, url, body) => {
        const res = await fetch(url, {
            headers: {
                authorization: discord_token,
                'content-type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined,
            method
        });
        const json = await res.json();
        return json;
    };

    const getGuilds = async () => {
        const res = await sendRequest('GET', 'https://discordapp.com/api/v8/users/@me/guilds');
        return res;
    };
    const guilds = await getGuilds();
    console.log('[DragonDev] Найдено серверов:', guilds.length);

    for (const guild of guilds) {
        await sendRequest('PATCH', `https://discordapp.com/api/v8/users/@me/guilds/${guild.id}/settings`, {
            message_notifications: 2
        });
        console.log(`[DragonDev] На сервер ${guild.name} был отправлен запрос. Жду 5 секунд до следующего запроса.`);
        //enter the desired ms to run the script faster or slower
        await sleep(5000);
    }
    console.log(`[DragonDev] Готово! На всех серверах были отключены уведомления!\nНаш паблик: https://t.me/icodragondev`);
})();

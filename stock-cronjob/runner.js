const axios = require('axios');

let lastRunDate = -1;

const runEndpoint = async () => {
    await axios.get('https://set-index-prediction.software/api/update-indexes');
    console.log('done');
}

const process = async () => {
    while (0x1) {
        const today = new Date();
    
        if (lastRunDate == today.getUTCDate())
            continue;
        
        if (today.getUTCDay() >= 5)
            continue;
    
        if (today.getUTCHours() == 3) {
            console.log(
                'Run at ' +
                today.getUTCDate() + '-' +
                today.getUTCMonth() + '-' +
                today.getUTCFullYear() + ' ' +
                today.getUTCHours() + ' '
            );
            await runEndpoint();
            lastRunDate = today.getUTCDate();
        }
    }
}

process();
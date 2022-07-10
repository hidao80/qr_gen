import "./common.js";

window.onload = () => {
    // Initialized by URL parameter
    const obj = getUrlParams();

    if (obj) {
        _$('chkIsSjis').checked = obj['chkIsSjis'] ? true : false;

        // set default value once only
        // setTimeout is an autocomplete countermeasure
        setTimeout(() => {
            for (const key of Object.keys(obj)) {
                if (_$(key) !== null && _$(key).type?.match(/hidden|checkbox/)) {
                    _$(key).value = obj[key];
                    console.log(`${key}: ${obj[key]}`);
                }
            }

            downloadVcardFile();
        }, 100);
    }
};

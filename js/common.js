/**
 * sugar-coated syntax to getElementById
 *
 * @param {string} text
 */
window._$ = (id) => {
    return document.getElementById(id);
}

/**
 * sugar-coated syntax to querySelector
 */
window.$$ = (query) => {
    return document.querySelectorAll(query);
}

/**
 * Character Encoding Conversion
 *
 * @param {string} str String to be encoded
 * @return {string} String after encoding
 */
window.encode = (str) => {
    return _$("chkIsSjis").checked
        ? Encoding.convert(str, "SJIS")
        : Encoding.convert(str, "UTF-8");
}

/**
 * Combine get parameters into an object
 * @return {object} key-value object for input forms.
 */
window.getUrlParams = () => {
    const params = document.location.search.substring(1).split('&');
    const object = {};
    let pair;

    for (const param of params) {
        pair = param.split("=");
        object[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return object;
}


/**
 * Generate string for vCard
 *
 * @returns {string}
 */
window.generateVcard = () => {
    const charset = _$("chkIsSjis").checked
        ? "CHARSET=SHIFT_JIS:"
        : "CHARSET=UTF-8:";

    const first_name = _$("first_name").value;
    const family_name = _$("family_name").value;
    const first_name_kana = _$("first_name_kana").value;
    const family_name_kana = _$("family_name_kana").value;
    const organization = _$("organization").value;
    const title = _$("title").value;
    const postal_code = _$("postal_code").value;
    const address = _$("address").value;
    const tel_voice = _$("tel_voice").value;
    const tel_fax = _$("tel_fax").value;
    const email = _$("email").value;
    const url_work = _$("url_work").value;
    const url_private = _$("url_private").value;

    let source = "BEGIN:VCARD\nVERSION:3.0\n";
    if (family_name || first_name) {
        source += `FN;${charset}${family_name} ${first_name}\n`
            + `N;${charset}${family_name};${first_name}\n`;
    }
    if (family_name_kana || first_name_kana) {
        source += `SORT-STRING;${charset}${family_name_kana} ${first_name_kana}\n`;
        if (family_name_kana) {
            source += `X-PHONETIC-LAST-NAME;${charset}${family_name_kana}\n`;
        }
        if (first_name_kana) {
            source += `X-PHONETIC-FIRST-NAME;${charset}${first_name_kana}\n`;
        }
    }
    if (organization) {
        source += `ORG;${charset}${organization}\n`;
    }
    if (title) {
        source += `TITLE;${charset}${title}\n`;
    }
    if (address || postal_code) {
        source += `ADR;TYPE=home,${charset};${address};;;${postal_code}; \n`;
    }
    if (tel_voice) {
        source += `TEL;;VOICE:${tel_voice}\n`;
    }
    if (tel_fax) {
        source += `TEL;;FAX:${tel_fax}\n`;
    }
    if (email) {
        source += `EMAIL;;INTERNET:${email}\n`;
    }
    if (url_work) {
        source += `URL;WORK:${url_work}\n`;
    }
    if (url_private) {
        source += `URL;HOME:${url_private}\n`;
    }
    source += "END:VCARD";

    return source;
}

/**
 * Download vCard file
 */
window.downloadVcardFile = () => {
    // Creating Anchor Tags
    const downLoadLink = document.createElement("a");

    // Generate HTML text to download
    const contentType = `text/x-vcard`;
    const outputData = stringToArray(encode(generateVcard()));  // Pass byte strings as they are
    const downloadFileName = (_$('title').value != "" ? _$('title').value : _$('first_name').value + _$('family_name').value) + ".vcf"
    downLoadLink.download = downloadFileName;
    downLoadLink.href = URL.createObjectURL(new Blob([new Uint8Array(outputData)], { type: contentType }));
    downLoadLink.dataset.downloadurl = [contentType, downloadFileName, downLoadLink.href].join(":");
    downLoadLink.click();
}

/**
 * Convert string to array
 *
 * @param {string} str String to be converted to an array
 * @returns {Uint8Array} array of bytes
 */
window.stringToArray = (str) => {
    let array = [];
    for (let i = 0; i < str.length; i++) {
        array.push(str.charCodeAt(i));
    }
    return array;
};

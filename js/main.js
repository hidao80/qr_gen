import lang from "./multilingualization.js";

/**
 * sugar-coated syntax to getElementById
 *
 * @param {string} text
 */
    function _$(id) {
    return document.getElementById(id);
}

/**
 * sugar-coated syntax to querySelector
 */
function $$(query) {
    return document.querySelectorAll(query);
}

/**
 * Character Encoding Conversion
 *
 * @param {string} str String to be encoded
 * @return {string} String after encoding
 */
function encode(str) {
    return _$("chkIsSjis").checked
        ? Encoding.convert(str, "SJIS")
        : Encoding.convert(str, "UTF-8");
}

// After drawing the screen, perform the initial setup.
window.onload = () => {
    _$("btnGen").addEventListener("click", e => {
        const size = 200; // QR Code image size (both portrait and landscape)
        let source = "";

        // Change the value to be retrieved depending on the tab being displayed.
        switch ($$(".nav-link.active")[0].getAttribute("value")) {
            case "free_text":
                source = _$("value").value;
                break

            case "url":
                source = encode(_$("basic-url").value);
                break

            case "wifi":
                const essid = _$("essid").value
                const password = _$("password").value
                source = `WIFI:T:WPA;S:${essid};P:${password};;`;
                break

            case "vcard":
                source = encode(generateVcard());
                break
        }
        console.log(source)

        // QR Code generation
        try {
            const strlen = source.length;
            $("#QRCode").html("").qrcode({
                width: strlen > size ? strlen : size,
                height: strlen > size ? strlen : size,
                text: source,
            });
        } catch (e) {
            $("#QRCode").html("").append(lang.translate("error-1"));
        }
    });

    // Download vCard
    _$("btnVcard").addEventListener("click", e => {
        downloadVcardFile();
    });

    // Tab Switching
    $$(".nav-link").forEach(nav_elem => {
        nav_elem.addEventListener("click", event => {
            $$(".nav-link").forEach(elem => {
                elem.classList.remove("active")
            })
            $$(".tab").forEach(elem => {
                elem.classList.add("d-none")
            })
            event.target.classList.add("active")
            _$(event.target.getAttribute("value")).classList.remove("d-none")

            if (event.target.getAttribute("value") === "vcard") {
                _$("btnVcard").disabled = false
            } else {
                _$("btnVcard").disabled = true
            }
        })
    })

    // multilingualization
    lang.translateAll();
}

/**
 * Generate string for vCard
 *
 * @returns {string}
 */
function generateVcard() {
    const charset = _$("chkIsSjis").checked
        ? "CHARSET=SHIFT_JIS:"
        : "CHARSET=UTF-8:";

    const first_name = _$("first_name").value
    const family_name = _$("family_name").value
    const first_name_kana = _$("first_name_kana").value
    const family_name_kana = _$("family_name_kana").value
    const organization = _$("organization").value
    const title = _$("title").value
    const tel_voice = _$("tel_voice").value
    const tel_fax = _$("tel_fax").value
    const email = _$("email").value
    const url_work = _$("url_work").value
    const url_private = _$("url_private").value

    let source = "BEGIN:VCARD\nVERSION:3.0\n"
    if (family_name || first_name) {
        source += `FN;${charset}${family_name} ${first_name}\n`
            + `N;${charset}${family_name};${first_name}\n`
    }
    if (family_name_kana || first_name_kana) {
        source += `SORT-STRING;${charset}${family_name_kana} ${first_name_kana}\n`
        if (family_name_kana) {
            source += `X-PHONETIC-LAST-NAME;${charset}${family_name_kana}\n`
        }
        if (first_name_kana) {
            source += `X-PHONETIC-FIRST-NAME;${charset}${first_name_kana}\n`
        }
    }
    if (organization) {
        source += `ORG;${charset}${organization}\n`
    }
    if (title) {
        source += `TITLE;${charset}${title}\n`
    }
    if (tel_voice) {
        source += `TEL;;VOICE:${tel_voice}\n`
    }
    if (tel_fax) {
        source += `TEL;;FAX:${tel_fax}\n`
    }
    if (email) {
        source += `EMAIL;;INTERNET:${email}\n`
    }
    if (url_work) {
        source += `URL;WORK:${url_work}\n`
    }
    if (url_private) {
        source += `URL;HOME:${url_private}\n`
    }
    source += "END:VCARD";

    return source;
}

/**
 * Download vCard file
 */
function downloadVcardFile() {
    const charset = _$("chkIsSjis").checked
        ? "CHARSET=SHIFT_JIS:"
        : "CHARSET=UTF-8:";

    // Creating Anchor Tags
    const downLoadLink = document.createElement("a");

    // Generate HTML text to download
    const outputDataString = encode(stringToArray(generateVcard()));  // Pass byte strings as they are
    const downloadFileName = (_$('title').value != "" ? _$('title').value : _$('first_name').value + _$('family_name').value) + ".vcf"
    downLoadLink.download = downloadFileName;
    downLoadLink.href = URL.createObjectURL(new Blob([new Uint8Array(outputDataString)], { type: `text/x-vcard` }));
    downLoadLink.dataset.downloadurl = [`text/x-vcard`, downloadFileName, downLoadLink.href].join(":");
    downLoadLink.click();
}

/**
 * Convert string to array
 *
 * @param {string} str String to be converted to an array
 * @returns {Uint8Array} array of bytes
 */
function stringToArray(str) {
    let array = [];
    for (let i = 0; i < str.length; i++) {
        array.push(str.charCodeAt(i));
    }
    return array;
};

import lang from "./multilingualization.js";
import "./common.js";

/**
 * Copying URLs with initial values
 */
async function copyUrlWithValues() {
    let params = [];
    const elems = Object.setPrototypeOf([...$$('input[type="text"]'), ...$$('input[type="password"]'), ...$$('textarea')], NodeList.prototype);

    for (const elem of elems) {
        if (elem?.value) {
            params.push(`${elem.id}=${encodeURIComponent(elem.value)}`);
        }
    }
    for (const elem of $$('input[type="checkbox"]')) {
        if (elem?.checked) {
            params.push(`${elem.id}=${encodeURIComponent(1)}`);
        }
    }

    const url = `${location.protocol}://${location.host}${location.pathname}?${params.join("&")}`;
    console.log(url);

    try {
        await navigator.clipboard.writeText(url);
        toastr.success(lang.translate('success-1'));
    } catch (error) {
        toastr.success(lang.translate('error-2'));
    }
}

// After drawing the screen, perform the initial setup.
window.onload = () => {
    _$("btnGen").addEventListener("click", e => {
        const size = 200; // QR Code image size (both portrait and landscape)
        let source = "";

        // Change the value to be retrieved depending on the tab being displayed.
        switch ($$(".nav-link.active")[0].getAttribute("value")) {
            case "free_text":
                source = encode(_$("text").value);
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

    // The use of the function is discontinued because personal
    // information remains in the web server's access log.
    // // Copying URLs with initial values
    // _$("btnUrl").addEventListener("click", e => {
    //     copyUrlWithValues();
    // });

    // Download vCard
    _$("btnVcard").addEventListener("click", e => {
        downloadVcardFile();
    });

    // Tab Switching
    for (const nav_elem of $$(".nav-link")) {
        nav_elem.addEventListener("click", event => {
            for (const elem of $$(".nav-link")) {
                elem.classList.remove("active")
            }
            for (const elem of $$(".tab")) {
                elem.classList.add("d-none")
            }
            event.target.classList.add("active")
            _$(event.target.getAttribute("value")).classList.remove("d-none")

            if (event.target.getAttribute("value") === "vcard") {
                _$("btnVcard").disabled = false
            } else {
                _$("btnVcard").disabled = true
            }
        });
    };



    // Initialized by URL parameter
    const obj = getUrlParams();

    // set default value once only
    // setTimeout is an autocomplete countermeasure
    setTimeout(() => {
        for (const key of Object.keys(obj)) {
            if (_$(key) !== null && _$(key).type?.match(/text|password/)) {
                _$(key).value = obj[key];
                console.log(`${key}: ${obj[key]}`);
            }
        }
    }, 100);

    // tab activate
    const key = Object.keys(obj)[0];
    if (key == false) {
        // nop
    } else if (key.match(/text/)) {
        _$("tab_free_text").click();
    } else if (key.match(/basic-url/)) {
        _$("tab_url").click();
    } else if (key.match(/essid|password/)) {
        _$("tab_wifi").click();
    } else if (key.match(/first_name|family_name|first_name_kana|family_name_kana|organization|title|tel_voice|tel_fax|email|url_work|url_private/)) {
        _$("tab_vcard").click();
    }



    // multilingualization
    lang.translateAll();
};

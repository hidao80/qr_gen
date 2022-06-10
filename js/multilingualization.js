// ========================================
// multilingualization
// ========================================
const multilingualization = {
    // Multilingual dictionary object
    __: {
        "en": {
            "dict-1": "Free text",
            "dict-2": "Wifi setup",
            "dict-3": "vCard",
            "dict-4": "Contents",
            "dict-5": "Password",
            "dict-6": "First name",
            "dict-7": "Family name",
            "dict-8": "First name(kana)",
            "dict-9": "Family name(kana)",
            "dict-10": "Organization",
            "dict-11": "Title",
            "dict-12": "Telephone number",
            "dict-13": "Fax number",
            "dict-14": "e-Mail address",
            "dict-15": "URL(Work)",
            "dict-16": "URL(Private)",
            "dict-17": "Generate!",
            "dict-18": "Download vCard",
            "dict-19": "Shift-JIS mode",
            "error-1": "The number of characters is over. Please keep it within 600 characters."
        },
        "ja": {
            "dict-1": "自由な文章",
            "dict-2": "Wifi セットアップ",
            "dict-3": "vCard",
            "dict-4": "内容",
            "dict-5": "パスワード",
            "dict-6": "名",
            "dict-7": "姓",
            "dict-8": "名(かな)",
            "dict-9": "姓(かな)",
            "dict-10": "会社",
            "dict-11": "見出し",
            "dict-12": "電話番号",
            "dict-13": "FAX番号",
            "dict-14": "メールアドレス",
            "dict-15": "URL(仕事)",
            "dict-16": "URL(プライベート)",
            "dict-17": "生成！",
            "dict-18": "vCard のダウンロード",
            "dict-19": "Shift-JIS モード",
            "error-1": "文字数がオーバーしています。600文字以内でお願いします。"
        }
    },

    // Get language settings
    language: v => {
        const lang = (window.navigator.languages && window.navigator.languages[0]) ||
            window.navigator.language ||
            window.navigator.userLanguage ||
            window.navigator.browserLanguage;

        // Show English for undefined languages
        return multilingualization.__[lang] ? lang : "en";
    },

    // Get multilingual dictionary item value
    dict: index => {
        return multilingualization.__[multilingualization.language()][index];
    },

    init: v => {
        const dictionary = multilingualization.__[multilingualization.language()];
        for (let term in dictionary) {
            let elem = document.querySelector('.' + term) ?? undefined;
            if (elem !== undefined) {
                elem.innerText = dictionary[term];
            }
        }
    }
}

/**
 * Multilingualization library class
 *
 * @class Multilingualization
 */
export default class Multilingualization {
    /**
     *  @var dictionaries Multilingual dictionary object
     */
    static dictionaries = {
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
            "dict-20": "URL Copy",
            "dict-21": "Address",
            "dict-22": "Postal code",
            "error-1": "The number of characters is over. Please keep it within 600 characters.",
            "error-2": "Could not copy the URL.",
            "success-1": "Copied the URL to the clipboard.",
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
            "dict-18": "vCardのダウンロード",
            "dict-19": "Shift-JISモード",
            "dict-20": "URLコピー",
            "dict-21": "住所",
            "dict-22": "郵便番号",
            "error-1": "文字数がオーバーしています。600文字以内でお願いします。",
            "error-2": "URLをコピーできませんでした。",
            "success-1": "URLをクリップボードにコピーしました。",
        }
    }

    /**
     * Get current language
     *
     * @returns {string} Current language
     */
    static language() {
        const lang = (window.navigator.languages && window.navigator.languages[0]) ||
            window.navigator.language ||
            window.navigator.userLanguage ||
            window.navigator.browserLanguage;

        // Show English for undefined languages
        return this.dictionaries[lang] ? lang : "en";
    }

    /**
     * Get translated term
     *
     * @param {string} term Term to be translated
     * @returns {string} Translated term
     */
    static translate(index) {
        return this.dictionaries[this.language()][index];
    }

    /**
     * Initialization of dictionary object
     */
    static translateAll() {
        const dictionary = this.dictionaries[this.language()];
        for (let elem of document.querySelectorAll('[data-translate]')) {
            elem.innerHTML = dictionary[elem.dataset.translate];
        }
    }
}

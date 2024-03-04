import { showMessage, hideMessage } from "react-native-flash-message";

export default class func {
    static convertDate(date) {
        let fDate = new Date(date)
        return fDate.toLocaleString()
    }

    static convertVND(price) {
        if (price != null && price != undefined && price != '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }

    static isBlobURL(url) {
        return url.startsWith("blob:");
    }

    static removeElementByValue(array, element) {
        let index = array.indexOf(element)
        if (index > -1) {
            array.splice(index, 1)
        }
    }

    static cloneArray(data) {
        return [...data]
    }

    static cloneObject(data) {
        return { ...data }
    }

    // Hàm thiết lập Cookie
    static setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    // Hàm lấy Cookie
    static getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    static deleteCookie(cookieName) {
        // Đặt thời gian hết hạn của cookie về quá khứ
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }


    // success / info / warning / danger
    static showMess(type, message) {
        return showMessage({
            message: message,
            type: type,
            // backgroundColor: "#25e342", 
            // color: "#ffffff", 
        });
    }

}
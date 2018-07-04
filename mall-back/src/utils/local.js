export const StorageGetter = function (key) {
	return localStorage.getItem(key);
}
export const StorageSetter = function (key, val) {
	return localStorage.setItem(key, val);
}
export const StorageRemove = function (key) {
	return localStorage.removeItem(key);
}
export const SessionGetter = function (key) {
	return sessionStorage.getItem(key);
}
export const SessionSetter = function (key, val) {
	return sessionStorage.setItem(key, val);
}
export const SessionRemove = function (key) {
	return sessionStorage.removeItem(key);
}
export const getCookie = function (key) {
	let cookieObj = {},
		cookieSplit = [],
		cookieArr = document.cookie.split(";")
	;
	cookieArr.forEach((item, index) => {
		if (!item) return;

		cookieSplit = item.split("=");
		cookieObj[cookieSplit[0].trim()] = cookieSplit[1].trim();
	});
	if (cookieObj[key])
		return cookieObj[key];
	else
		// console.log('没有取到cookie');
		return false;
}
export const setCookie = function(key,value,time){
	var _date = new Date();
	_date.setDate(_date.getDate() + time);
	document.cookie = key + "=" + escape(value) + ((time == null) ? "" : ";expires=" + time.toGMTString())+";path=/";
}
export const delCookie = function(key) {
	var _date = new Date();
	_date.setTime(_date.getTime() - 1);
	var cval = getCookie(key);
	if (cval != null)
	 document.cookie = key + "=" + cval + ";expires=" + _date.toGMTString();
}
/**数据转换成地址字符
 * @param {Object} datas 数据的json格式
 */
function getDataUrl(datas) {
	let str = '1=1';
	for (k in datas) {
		str = str + '&' + k + '=' + datas[k];
	}
	return str;
}
/**
 * post方式头文字
 */
function headers() {
	return {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};
}
//将对象解析成key=value
function getDataUrl(obj) {
	let date = new Date();
	let str = '?timer=' + date.getTime();
	for (let n in obj) {
		str += '&' + n + '=' + obj[n];
	}
	return str;
}

/**
 * 序列化对象
 * @param {Object} data 传递的对象
 * @param {Object} key 传递对象的键值
 */
function getDataUrl(data, key) {
	if (data == null) {
		return "";
	};
	//let date = new Date();
	let str = "";
	//str += '?timer=' + date.getTime();
	let t = typeof data;
	if (t == "string" || t == "number" || t == "boolean") {
		str += "&" + key + "=" + data;
	} else {
		for (let i in data) {
			var k = key == null ? i : (key + (Array.isArray(data) ? ('[' + i + ']') : ('.' + i)));
			str += getDataUrl(data[i], k);
		}
	}
	return str;
};
/*
 * @Author: 言棠
 * @version: 3.0.0
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @Date: 2022-04-12 09:50:33
 * @LastEditTime: 2022-09-22 17:33:53
 */

/**
 * 字符串截取位数
 */
export function interceptStr(str: any, n: any) {
	var n = n || 6;
	if (str) {
		var str = str.toString();
		return str.substring(0, n) + '***' + str.substring(str.length - n, str.length)
	} else {
		return '-'
	}
}

/**
 * 小数点后截取位数
 */
export function interceptDecimal(str: any, n: any) {
	var n = n || 0;
	if (str) {
		var str = str.toString();
		if (str.indexOf(".") == -1) {
			return str;
		} else {
			if (n == 0) {
				return str.substring(0, str.indexOf("."));
			} else {
				return str.substring(0, str.indexOf(".") + (n + 1));
			}
		}
	} else {
		return '0';
	}
}

/**
 * 金额转千分位并保留指定小数位
 */
export const percentMoney = (s: any, n: number) => {
	n = n > 0 && n <= 20 ? n : 2;
	s = interceptDecimal(parseFloat((s + '').replace(/[^\d\.-]/g, '')), n) + '';
	var l = s.split('.')[0].split('').reverse();
	var r = s.split('.')[1];
	var t = '';
	for (var i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
	}
	return r ? t.split('').reverse().join('') + '.' + r : t.split('').reverse().join('')
}

/**
 * 金额直接转千分位，保留原小数位
 */
export function moneyFormat(str: any) {
	str = str + '';
	if (!str.includes('.')) {
		str += '.'
	}
	return str.replace(/(\d)(?=(\d{3})+\.)/g, function ($0: any, $1: any) {
		return $1 + ',';
	}).replace(/\.$/, '');
}

/**
 * 时间戳转时间
 */
export function getDatetime(timestamp: any) {
	var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	return Y + M + D + h + m + s;
}

/**
 * 时间转倒计时
 */
export function countDown(dateEnd: any) {
	const subsidies = (count: any) => count > 0 ? (count > 9 ? count.toString() : '0' + count) : '00'
	let result = new Date(dateEnd).getTime() - new Date().getTime()
	result = parseInt(`${result / 1000}`)
	let d = subsidies(Math.floor(result / (60 * 60 * 24)))
	let h = subsidies(Math.floor(result / (60 * 60 * 1) % 24))
	let m = subsidies(Math.floor(result / (60 * 1) % 60))
	let s = subsidies(Math.floor(result % 60))
	return { d, h, m, s }
}

/**
 * 只允许输入框输入数字
 */
export function onlyNumOnePoint(numberOnly: any) {
	//先把非数字的都替换掉，除了数字和小数点
	numberOnly = numberOnly.replace(/[^\d.]/g, "");
	//必须保证第一个为数字而不是小数点
	numberOnly = numberOnly.replace(/^\./g, "");
	//保证只有出现一个小数点而没有多个小数点
	numberOnly = numberOnly.replace(/\.{2,}/g, ".");
	//保证小数点只出现一次，而不能出现两次以上
	numberOnly = numberOnly.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	//保证只能输入两个小数  
	// numberOnly = numberOnly.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
	return numberOnly;
};

/**
 * 只允许输入框输入正数字
 */
export function onlyPositiveInteger(numberOnly: any) {
	//先把非数字的都替换掉
	numberOnly = numberOnly.replace(/[^\d]/g, "")
	return numberOnly;
};

/**
 * 是否移动端
 */
export function isMobile() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		return true
	} else {
		return false
	}
}

/**
 * 获取assets静态资源
 */
export const getAssetsFile = (url: string) => {
	return new URL(`../../assets/${url}`, import.meta.url).href
}

/**
 * 获取第一位 到 倒数第五位(包括)
 */
export const interceptAfter5 = (str: string) => {
	if (str) {
		var length = str.length - 5;
		return str.substring(0, length);
	}
}


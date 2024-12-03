/*
 * http://love.hackerzhou.me
 */
// variables
let $win = $(window)
let clientWidth = $win.width()
let clientHeight = $win.height()
$(window).resize(function() {
    let newWidth = $win.width()
    let newHeight = $win.height()
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location)
    }
})
(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			let $ele = $(this), str = $ele.html(), progress = 0
			$ele.html('')
			let timer = setInterval(function() {
				let current = str.substr(progress, 1)
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''))
				if (progress >= str.length) {
					clearInterval(timer)
				}
			}, 75)
		})
		return this;
	}
})(jQuery)
function timeElapse(date){
	let current = Date()
	let seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	let days = Math.floor(seconds / (3600 * 24))
	seconds = seconds % (3600 * 24)
	let hours = Math.floor(seconds / 3600)
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	let minutes = Math.floor(seconds / 60)
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	let result = "第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分钟 <span class=\"digit\">" + seconds + "</span> 秒"
	$("#clock").html(result)
}

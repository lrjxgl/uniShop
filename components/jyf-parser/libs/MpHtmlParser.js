/**
 * html 解析器
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20200513
 * @author JinYufeng
 * @listens MIT
 */
var cfg = require('./config.js'),
	blankChar = cfg.blankChar,
	CssHandler = require('./CssHandler.js'),
	windowWidth = uni.getSystemInfoSync().windowWidth;
var emoji;
class MpHtmlParser {
	constructor(data, options = {}) {
		this.attrs = {};
		this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
		this.data = data;
		this.domain = options.domain;
		this.DOM = [];
		this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
		options.prot = (this.domain || '').includes('://') ? this.domain.split('://')[0] : 'http';
		this.options = options;
		this.state = this.Text;
		this.STACK = [];
	}
	parse() {
		if (emoji) this.data = emoji.parseEmoji(this.data);
		for (var c; c = this.data[this.i]; this.i++)
			this.state(c);
		if (this.state == this.Text) this.setText();
		while (this.STACK.length) this.popNode(this.STACK.pop());
		if (this.DOM.length) {
			this.DOM[0].PoweredBy = 'Parser';
			if (this.title) this.DOM[0].title = this.title;
		}
		return this.DOM;
	}
	// 设置属性
	setAttr() {
		var name = this.attrName.toLowerCase();
		if (cfg.trustAttrs[name]) {
			var val = this.attrVal;
			if (val) {
				if (name == 'src') this.attrs[name] = this.getUrl(this.decode(val, 'amp'));
				else if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');
				else this.attrs[name] = val;
			} else if (cfg.boolAttrs[name]) this.attrs[name] = 'T';
		}
		this.attrVal = '';
		while (blankChar[this.data[this.i]]) this.i++;
		if (this.isClose()) this.setNode();
		else {
			this.start = this.i;
			this.state = this.AttrName;
		}
	}
	// 设置文本节点
	setText() {
		var back, text = this.section();
		if (!text) return;
		text = (cfg.onText && cfg.onText(text, () => back = true)) || text;
		if (back) {
			this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
			let j = this.start + text.length;
			for (this.i = this.start; this.i < j; this.i++) this.state(this.data[this.i]);
			return;
		}
		if (!this.pre) {
			// 合并空白符
			var tmp = [];
			for (let i = text.length, c; c = text[--i];)
				if (!blankChar[c] || (!blankChar[tmp[0]] && (c = ' '))) tmp.unshift(c);
			text = tmp.join('');
		}
		this.siblings().push({
			type: 'text',
			text: this.decode(text)
		});
	}
	// 设置元素节点
	setNode() {
		var node = {
				name: this.tagName.toLowerCase(),
				attrs: this.attrs
			},
			close = cfg.selfClosingTags[node.name];
		this.attrs = {};
		if (!cfg.ignoreTags[node.name]) {
			this.matchAttr(node);
			if (!close) {
				node.children = [];
				if (node.name == 'pre' && cfg.highlight) {
					this.remove(node);
					this.pre = node.pre = true;
				}
				this.siblings().push(node);
				this.STACK.push(node);
			} else if (!cfg.filter || cfg.filter(node, this) != false)
				this.siblings().push(node);
		} else {
			if (!close) this.remove(node);
			else if (node.name == 'source') {
				var parent = this.parent();
				if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src)
					parent.attrs.source.push(node.attrs.src);
			} else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
		}
		if (this.data[this.i] == '/') this.i++;
		this.start = this.i + 1;
		this.state = this.Text;
	}
	// 移除标签
	remove(node) {
		var name = node.name,
			j = this.i;
		// 处理 svg
		var handleSvg = () => {
			var src = this.data.substring(j, this.i + 1);
			if (!node.attrs.xmlns) src = ' xmlns="http://www.w3.org/2000/svg"' + src;
			var i = j;
			while (this.data[j] != '<') j--;
			src = this.data.substring(j, i) + src;
			var parent = this.parent();
			if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline'))
				parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
			this.siblings().push({
				name: 'img',
				attrs: {
					src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
					ignore: 'T'
				}
			})
		}
		if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
		while (1) {
			if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
				if (name == 'pre' || name == 'svg') this.i = j;
				else this.i = this.data.length;
				return;
			}
			this.start = (this.i += 2);
			while (!blankChar[this.data[this.i]] && !this.isClose()) this.i++;
			if (this.section().toLowerCase() == name) {
				// 代码块高亮
				if (name == 'pre') {
					this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) +
						this.data.substr(this.i - 5);
					return this.i = j;
				} else if (name == 'style')
					this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));
				else if (name == 'title')
					this.title = this.data.substring(j + 1, this.i - 7);
				if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
				if (name == 'svg') handleSvg();
				return;
			}
		}
	}
	// 处理属性
	matchAttr(node) {
		var attrs = node.attrs,
			style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
			styleObj = {};
		if (attrs.id) {
			if (this.options.compress & 1) attrs.id = void 0;
			else if (this.options.useAnchor) this.bubble();
		}
		if ((this.options.compress & 2) && attrs.class) attrs.class = void 0;
		switch (node.name) {
			case 'a':
			case 'ad':
				this.bubble();
				break;
				// #ifdef APP-PLUS
			case 'iframe':
			case 'embed':
				this.bubble();
				break;
				// #endif
			case 'font':
				if (attrs.color) {
					styleObj['color'] = attrs.color;
					attrs.color = void 0;
				}
				if (attrs.face) {
					styleObj['font-family'] = attrs.face;
					attrs.face = void 0;
				}
				if (attrs.size) {
					var size = parseInt(attrs.size);
					if (size < 1) size = 1;
					else if (size > 7) size = 7;
					var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
					styleObj['font-size'] = map[size - 1];
					attrs.size = void 0;
				}
				break;
			case 'video':
			case 'audio':
				if (!attrs.id) attrs.id = node.name + (++this[`${node.name}Num`]);
				else this[`${node.name}Num`]++;
				if (node.name == 'video') {
					if (this.videoNum > 3)
						node.lazyLoad = 1;
					if (attrs.width) {
						styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
						attrs.width = void 0;
					}
					if (attrs.height) {
						styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
						attrs.height = void 0;
					}
				}
				attrs.source = [];
				if (attrs.src) attrs.source.push(attrs.src);
				if (!attrs.controls && !attrs.autoplay)
					console.warn(`存在没有 controls 属性的 ${node.name} 标签，可能导致无法播放`, node);
				this.bubble();
				break;
			case 'td':
			case 'th':
				if (attrs.colspan || attrs.rowspan)
					for (var k = this.STACK.length, item; item = this.STACK[--k];)
						if (item.name == 'table') {
							item.c = void 0;
							break;
						}
		}
		if (attrs.align) {
			styleObj['text-align'] = attrs.align;
			attrs.align = void 0;
		}
		// 压缩 style
		var styles = style.split(';');
		style = '';
		for (var i = 0, len = styles.length; i < len; i++) {
			var info = styles[i].split(':');
			if (info.length < 2) continue;
			let key = info[0].trim().toLowerCase(),
				value = info.slice(1).join(':').trim();
			if (value.includes('-webkit') || value.includes('-moz') || value.includes('-ms') || value.includes('-o') || value
				.includes(
					'safe'))
				style += `;${key}:${value}`;
			else if (!styleObj[key] || value.includes('import') || !styleObj[key].includes('import'))
				styleObj[key] = value;
		}
		if (node.name == 'img') {
			if (attrs['data-src']) {
				attrs.src = attrs.src || attrs['data-src'];
				attrs['data-src'] = void 0;
			}
			if (attrs.src && !attrs.ignore) {
				if (this.bubble())
					attrs.i = (this.imgNum++).toString();
				else attrs.ignore = 'T';
			}
			if (attrs.ignore) styleObj['max-width'] = '100%';
			var width;
			if (styleObj.width) width = styleObj.width;
			else if (attrs.width) width = attrs.width.includes('%') ? attrs.width : attrs.width + 'px';
			if (width) {
				styleObj.width = width;
				attrs.width = '100%';
				if (parseInt(width) > windowWidth) {
					styleObj.height = '';
					if (attrs.height) attrs.height = void 0;
				}
			}
			if (styleObj.height) {
				attrs.height = styleObj.height;
				styleObj.height = '';
			} else if (attrs.height && !attrs.height.includes('%'))
				attrs.height += 'px';
		}
		for (var key in styleObj) {
			var value = styleObj[key];
			if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
			// 填充链接
			if (value.includes('url')) {
				var j = value.indexOf('(');
				if (j++ != -1) {
					while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) j++;
					value = value.substr(0, j) + this.getUrl(value.substr(j));
				}
			}
			// 转换 rpx
			else if (value.includes('rpx'))
				value = value.replace(/[0-9.]+\s*rpx/g, $ => parseFloat($) * windowWidth / 750 + 'px');
			else if (key == 'white-space' && value.includes('pre'))
				this.pre = node.pre = true;
			style += `;${key}:${value}`;
		}
		style = style.substr(1);
		if (style) attrs.style = style;
	}
	// 节点出栈处理
	popNode(node) {
		// 空白符处理
		if (node.pre) {
			node.pre = this.pre = void 0;
			for (let i = this.STACK.length; i--;)
				if (this.STACK[i].pre)
					this.pre = true;
		}
		var siblings = this.siblings(),
			len = siblings.length,
			childs = node.children;
		if (node.name == 'head' || (cfg.filter && cfg.filter(node, this) == false))
			return siblings.pop();
		var attrs = node.attrs;
		// 替换一些标签名
		if (cfg.blockTags[node.name]) node.name = 'div';
		else if (!cfg.trustTags[node.name]) node.name = 'span';
		// 去除块标签前后空串
		if (node.name == 'div' || node.name == 'p' || node.name[0] == 't') {
			if (len > 1 && siblings[len - 2].text == ' ')
				siblings.splice(--len - 1, 1);
			if (childs.length && childs[childs.length - 1].text == ' ')
				childs.pop();
		}
		// 处理列表
		if (node.c && (node.name == 'ul' || node.name == 'ol')) {
			if ((node.attrs.style || '').includes('list-style:none')) {
				for (let i = 0, child; child = childs[i++];)
					if (child.name == 'li')
						child.name = 'div';
			} else if (node.name == 'ul') {
				var floor = 1;
				for (let i = this.STACK.length; i--;)
					if (this.STACK[i].name == 'ul') floor++;
				if (floor != 1)
					for (let i = childs.length; i--;)
						childs[i].floor = floor;
			} else {
				for (let i = 0, num = 1, child; child = childs[i++];)
					if (child.name == 'li') {
						child.type = 'ol';
						child.num = ((num, type) => {
							if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
							if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
							if (type == 'i' || type == 'I') {
								num = (num - 1) % 99 + 1;
								var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
									ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
									res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
								if (type == 'i') return res.toLowerCase();
								return res;
							}
							return num;
						})(num++, attrs.type) + '.';
					}
			}
		}
		// 处理表格的边框
		if (node.name == 'table') {
			var padding = attrs.cellpadding,
				spacing = attrs.cellspacing,
				border = attrs.border;
			if (node.c) {
				this.bubble();
				if (!padding) padding = 2;
				if (!spacing) spacing = 2;
			}
			if (border) attrs.style = `border:${border}px solid gray;${attrs.style || ''}`;
			if (spacing) attrs.style = `border-spacing:${spacing}px;${attrs.style || ''}`;
			if (border || padding)
				(function f(ns) {
					for (var i = 0, n; n = ns[i]; i++) {
						if (n.name == 'th' || n.name == 'td') {
							if (border) n.attrs.style = `border:${border}px solid gray;${n.attrs.style}`;
							if (padding) n.attrs.style = `padding:${padding}px;${n.attrs.style}`;
						} else f(n.children || []);
					}
				})(childs)
			if (this.options.autoscroll) {
				var table = Object.assign({}, node);
				node.name = 'div';
				node.attrs = {
					style: 'overflow:scroll'
				}
				node.children = [table];
			}
		}
		this.CssHandler.pop && this.CssHandler.pop(node);
		// 自动压缩
		if (node.name == 'div' && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == 'div')
			siblings[len - 1] = childs[0];
	}
	// 工具函数
	bubble() {
		for (var i = this.STACK.length, item; item = this.STACK[--i];) {
			if (cfg.richOnlyTags[item.name]) {
				if (item.name == 'table' && !Object.hasOwnProperty.call(item, 'c')) item.c = 1;
				return false;
			}
			item.c = 1;
		}
		return true;
	}
	decode(val, amp) {
		var i = -1,
			j, en;
		while (1) {
			if ((i = val.indexOf('&', i + 1)) == -1) break;
			if ((j = val.indexOf(';', i + 2)) == -1) break;
			if (val[i + 1] == '#') {
				en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
				if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
			} else {
				en = val.substring(i + 1, j);
				if (cfg.entities[en] || en == amp)
					val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
			}
		}
		return val;
	}
	getUrl(url) {
		if (url[0] == '/') {
			if (url[1] == '/') url = this.options.prot + ':' + url;
			else if (this.domain) url = this.domain + url;
		} else if (this.domain && url.indexOf('data:') != 0 && !url.includes('://'))
			url = this.domain + '/' + url;
		return url;
	}
	isClose() {
		return this.data[this.i] == '>' || (this.data[this.i] == '/' && this.data[this.i + 1] == '>');
	}
	section() {
		return this.data.substring(this.start, this.i);
	}
	parent() {
		return this.STACK[this.STACK.length - 1];
	}
	siblings() {
		return this.STACK.length ? this.parent().children : this.DOM;
	}
	// 状态机
	Text(c) {
		if (c == '<') {
			var next = this.data[this.i + 1],
				isLetter = c => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
			if (isLetter(next)) {
				this.setText();
				this.start = this.i + 1;
				this.state = this.TagName;
			} else if (next == '/') {
				this.setText();
				if (isLetter(this.data[++this.i + 1])) {
					this.start = this.i + 1;
					this.state = this.EndTag;
				} else
					this.Comment();
			} else if (next == '!') {
				this.setText();
				this.Comment();
			}
		}
	}
	Comment() {
		var key;
		if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';
		else if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';
		else key = '>';
		if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;
		else this.i += key.length - 1;
		this.start = this.i + 1;
		this.state = this.Text;
	}
	TagName(c) {
		if (blankChar[c]) {
			this.tagName = this.section();
			while (blankChar[this.data[this.i]]) this.i++;
			if (this.isClose()) this.setNode();
			else {
				this.start = this.i;
				this.state = this.AttrName;
			}
		} else if (this.isClose()) {
			this.tagName = this.section();
			this.setNode();
		}
	}
	AttrName(c) {
		var blank = blankChar[c];
		if (blank) {
			this.attrName = this.section();
			c = this.data[this.i];
		}
		if (c == '=') {
			if (!blank) this.attrName = this.section();
			while (blankChar[this.data[++this.i]]);
			this.start = this.i--;
			this.state = this.AttrValue;
		} else if (blank) this.setAttr();
		else if (this.isClose()) {
			this.attrName = this.section();
			this.setAttr();
		}
	}
	AttrValue(c) {
		if (c == '"' || c == "'") {
			this.start++;
			if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
			this.attrVal = this.section();
			this.i++;
		} else {
			for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++);
			this.attrVal = this.section();
		}
		this.setAttr();
	}
	EndTag(c) {
		if (blankChar[c] || c == '>' || c == '/') {
			var name = this.section().toLowerCase();
			for (var i = this.STACK.length; i--;)
				if (this.STACK[i].name == name) break;
			if (i != -1) {
				var node;
				while ((node = this.STACK.pop()).name != name);
				this.popNode(node);
			} else if (name == 'p' || name == 'br')
				this.siblings().push({
					name,
					attrs: {}
				});
			this.i = this.data.indexOf('>', this.i);
			this.start = this.i + 1;
			if (this.i == -1) this.i = this.data.length;
			else this.state = this.Text;
		}
	}
}
module.exports = MpHtmlParser;

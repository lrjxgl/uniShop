var inlineTags = {
	abbr: 1,
	b: 1,
	big: 1,
	code: 1,
	del: 1,
	em: 1,
	i: 1,
	ins: 1,
	label: 1,
	q: 1,
	small: 1,
	span: 1,
	strong: 1
}
export default {
	useRichText: function(item) {
		return !item.c && !inlineTags[item.name] && (item.attrs.style || '').indexOf('display:inline') == -1;
	}
}

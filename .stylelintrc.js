module.exports = {
	extends: [
			'stylelint-config-standard',
			'stylelint-prettier/recommended',
	],
	rules: {
			'prettier/prettier': true,
			'order/properties-alphabetical-order': true, //ABC順に並べる
			'max-line-length': null, //max文字数を無視
			'no-descending-specificity': null, //セレクタの詳細度に関する警告を出さない
			'font-weight-notation': null, //font-weightの指定は自由に
			'font-family-no-missing-generic-family-keyword': null, //sans-serif / serifを必須にするか。object-fitでエラーださないようにする。
	},
};
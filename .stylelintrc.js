"use strict";
//
module.exports = {
	"plugins": [
		"stylelint-order",
		"stylelint-scss",
    "stylelint-selector-bem-pattern"
	],
	"extends": "stylelint-config-standard",
	"rules": {
		"at-rule-empty-line-before": [ "always", {
			except: [
				"blockless-after-same-name-blockless",
				"first-nested"
			],
			ignore: ["after-comment"]
		}],
		"at-rule-name-case": "lower",
		"at-rule-name-space-after": "always-single-line",
		// at-rule-no-unknown заменен scss-плагином
		"at-rule-no-unknown": null,
		"at-rule-semicolon-newline-after": "always",
		"block-no-empty": true,
		"block-opening-brace-newline-after": ["always-multi-line", {
			"message": "После «{» должен быть перенос"}],
		"block-opening-brace-space-before": ["always", {
			"message": "Перед «{» должен быть один пробел" }],
		"block-opening-brace-space-after": "always-single-line",
		"block-closing-brace-empty-line-before": ["never", {
			"message": "Перед «}» не должно быть пустой строки"}],
		"block-closing-brace-space-before": "always-single-line",
		"block-closing-brace-newline-before": ["always-multi-line", {
			"message": "Перед «}» должен быть перенос"}],
		"block-closing-brace-newline-after": ["always", {
			"message": "После «}» должен быть перенос"}],
		"color-hex-case": ["lower", {
			"severity": "warning",
			"message": "HEX-цвета нужно указывать строчными буквами"
		}],
		"color-hex-length": ["short", {"message": "Цвета можно указывать в короткой нотации"}],
		"color-named": ["never", {"message": "Цвета ключевыми словами нельзя писать"}],
		"color-no-invalid-hex": [true, {"message": "Ошибка в написании HEX-цвета"}],
		"comment-empty-line-before": [ "always", {
			except: ["first-nested"],
			ignore: ["stylelint-commands"]
		}],
		"comment-no-empty": true,
		"comment-whitespace-inside": "always",
		"custom-property-empty-line-before": [ "always", {
			except: [
				"after-custom-property",
				"first-nested"
			],
			ignore: [
				"after-comment",
				"inside-single-line-block"
			]
		}],
		"declaration-block-no-duplicate-properties": [ true, {
			ignore: ["consecutive-duplicates-with-different-values"],
			"message": "правила не должны повторяться"
		}],
		"declaration-bang-space-after": "never",
		"declaration-bang-space-before": "always",
		"declaration-block-no-shorthand-property-overrides": [true, {
			"message": "Это свойство перебивает другое"}],
		"declaration-block-semicolon-newline-after": ["always-multi-line", {
			"message": "После точки с запятой необходим перенос"}],
		"declaration-block-semicolon-newline-before": ["never-multi-line", {
			"message": "Перенос перед символом ; недопустим"}],
		"declaration-block-semicolon-space-after": "always-single-line",
		"declaration-block-semicolon-space-before": ["never", {
			"message": "Пробел перед символом ; недопустим"}],
		"declaration-block-single-line-max-declarations": [1, {
			"message": "На одной строке должно быть одно правило"}],
		"declaration-block-trailing-semicolon": ["always", {
			"message": "Каждое свойство должно заканчиваться точкой с запятой"}],
		"declaration-colon-newline-after": "always-multi-line",
		"declaration-colon-space-after": ["always-single-line", {
			"message": "Следует ставить один пробел после двоеточия"}],
		"declaration-colon-space-before": ["never", {
			"message": "Не следует ставить пробел перед двоеточием"}],
		"declaration-empty-line-before": [ "always", {
			except: [
				"after-declaration",
				"first-nested"
			],
			ignore: [
				"after-comment",
				"inside-single-line-block"
			]
		}],
		"declaration-no-important": [true, {
			"severity": "warning",
			"message": "Применяйте !important с осторожностью"
		}],
		"font-family-no-duplicate-names": [true, {
			"message": "Нельзя дублировать один и тот же шрифт"}],
		"font-family-no-missing-generic-family-keyword": [true, {
			"message": "Необходимо указывать sans-serif или serif"}],
		"font-weight-notation":["numeric", {
				"message": "Необходимо указывать плотность шрифта цифрой",
				ignore: ["relative"]
		}],
		"function-calc-no-invalid": true,
		"function-calc-no-unspaced-operator": true,
		"function-comma-newline-after": [
			"always-multi-line",
			{ "message": "После переноса запятой быть не должно" }
		],
		"function-comma-space-after": ["always-single-line", {
			"message": "После запятой необходим пробел"}],
		"function-comma-space-before": ["never", {
			"message": "Перед запятой пробела быть не должно"}],
		"function-linear-gradient-no-nonstandard-direction": true,
		"function-max-empty-lines": [0, {
			"message": "Пустых строк не должно быть в функциях"}],
		"function-name-case": ["lower", {
			"message": "Имена функций следует писать строчными буквами"}],
		"function-parentheses-newline-inside": ["always-multi-line", {
			"message": "аргументы ф-ции должны быть на отдельной строке"}],
		"function-parentheses-space-inside": "never-single-line",
		"function-whitespace-after": ["always", {
			"message": "Должны быть пробелы между функциями"}],
		"indentation": 2,
		"keyframe-declaration-no-important": true,
		"length-zero-no-unit": [true, {
			"message": "Единицы измерения не указываются, если значение равно нулю"}],
		"max-empty-lines": 1,
		"max-nesting-depth": 2,
		"media-feature-colon-space-after": "always",
		"media-feature-colon-space-before": "never",
		"media-feature-name-case": "lower",
		"media-feature-name-no-unknown": true,
		"media-feature-parentheses-space-inside": [
			"never",
			{ "message": "Пробелы после «(» и перед «)» использовать нельзя" }
		],
		"media-feature-range-operator-space-after": "always",
		"media-feature-range-operator-space-before": "always",
		"media-query-list-comma-newline-after": "always-multi-line",
		"media-query-list-comma-space-after": "always-single-line",
		"media-query-list-comma-space-before": "never",
		"no-descending-specificity": true,
		"no-duplicate-at-import-rules": [true, {
			"message": "Не должно быть повторного импорта файла"}],
		"no-duplicate-selectors": [true, {
			"message": "Один и тот же селектор не должен дублироваться"}],
		"no-empty-source": true,
		"no-eol-whitespace": true,
		"no-extra-semicolons": [true, {"message": "Две точки с запятой подряд не должны быть"}],
		"no-invalid-double-slash-comments": true,
		"no-missing-end-of-source-newline": true,
		"number-leading-zero": "always",
		"number-no-trailing-zeros": [true, {"message": "Лишний (необязательный) нуль в дроби"}],
		"order/order": [ "custom-properties", {"type": "at-rule", "name": "include" },
			"declarations", {"type": "at-rule", "name": "media"},
			{"type": "rule", "selector": "^&::(before|after)"},
			{"type": "rule", "selector": "^&:\\w+$"},
			{"type": "rule", "selector": "^\\.[-_a-zA-Z0-9]+"},
			{"type": "rule", "selector": "^&__[-a-z0-9]+"},
			{"type": "rule", "selector": "^&--[-a-z0-9]+"}
		],
		"order/properties-alphabetical-order": true,
		"plugin/selector-bem-pattern": [{
				"implicitComponents": true,
				"componentName": "[-a-z]+",
				"componentSelectors": {
					"initial": "^(\\.{componentName}(__[a-z]+|--[-a-z0-9]+|__[-a-z]+--[-a-z0-9]+|.[-a-z]+|__[a-z]+.[-a-z]+)?)$",
					"combined": "^.+$"
				},
				"ignoreSelectors": [
					"^\\.(no-)?js(-modal-open)?$",
					"a(\\[[a-z]+|:[a-z]+)?",
					"h[1-6]",
					"pre",
					"blockquote",
					"thead",
					"tr",
					"img",
					"img",
					"p",
					"table",
					"^&:empty",
					"#{\\$[-a-z]+}__[-a-z]+",
					"^\\*$"
				],
			},
			{
				"severity": "warning",
				"message": "Селектор не из имени файла или БЭМ-ошибка"
			}
		],
		"property-case": ["lower", {
			"message": "Значения свойств следует писать строчными буквами"}],
		"property-no-unknown": [true, {
			"message": "Такого свойства не существует"}],
		"rule-empty-line-before": [ "always-multi-line", {
			except: ["first-nested"],
			ignore: ["after-comment"]
		}],
		"selector-attribute-brackets-space-inside": "never",
		"selector-attribute-operator-blacklist": [["id"], {
			"message": "Для стилизации ID использовать нельзя"}],
		"selector-attribute-operator-space-after": "never",
		"selector-attribute-operator-space-before": "never",
		"selector-combinator-space-after": "always",
		"selector-combinator-space-before": "always",
		"selector-descendant-combinator-no-non-space": [true, {
			"message": "Комбинированные селекторы нужно отделять одним пробелом"}],
		"selector-list-comma-newline-after": ["never-multi-line", {
			"message": "После запятой необходим перенос строки"}],
		"selector-list-comma-newline-before": ["never-multi-line", {
			"message": "Перед запятой не должно быть переноса строки"}],
		"selector-list-comma-space-after": ["always-single-line", {
			"message": "После запятой должен быть пробел"}],
		"selector-list-comma-space-before": ["never", {
			"message": "Перед запятой не должно быть пробела"}],
		"selector-max-empty-lines": [0, {
			"message": "Пустые строки в селекторах недопустимы"}],
		"selector-pseudo-class-case": ["lower", {
			"message": "Псевдоклассы необходимо писать строчными буквами"}],
		"selector-pseudo-class-no-unknown": [true, {
			"message": "Такого псевдокласса не существует"}],
		"selector-pseudo-class-parentheses-space-inside": ["never", {
			"message": "Внутри скобок в псевдоселекторах не должно быть пробелов"}],
		"selector-pseudo-element-case": ["lower", {
			"message": "Псевдоэлементы необходимо писать строчными буквами"}],
		"selector-pseudo-element-colon-notation": "double",
		"selector-pseudo-element-no-unknown": [true, {
			"message": "Такого псевдоэлемента не существует"}],
		"selector-type-no-unknown": [true, {
			"message": "Такого селектора не существует"}],
		"selector-type-case": ["lower", {
			"message": "Селекторы необходимо писать строчными буквами"}],
		"string-no-newline": [true, {
			"message": "В строчных данных не должно быть переносов"}],
		"string-quotes": ["double", {
			"message": "В проекте двойные кавычки"}],
		"unit-case": ["lower", {
			"message": "Единицы измерения следует писать строчными надобно"}],
		"unit-no-unknown": [true, {
			"message": "Не существует таких единиц измерения"}],
		"value-keyword-case": ["lower",{
				"message": "Значения свойств следует писать строчными буквами",
				"ignoreProperties": ["/font-/", ]
		}],
		"value-list-comma-space-after": ["always-single-line", {
				"message": "Необходим пробел в значениях после запятой"}],
		"value-list-comma-space-before": ["never", {
				"message": "В значениях перед запятой пробел запрещен"}],
		"value-list-comma-newline-after": ["always-multi-line", {
				"message": "Значения свойств должны быть без переносов"}],
		"value-list-comma-newline-before": ["never-multi-line", {
				"message": "Значения свойств должны быть без переносов"}],
		"value-list-max-empty-lines": 0,
		"scss/at-else-closing-brace-newline-after": "always-last-in-chain",
		"scss/at-else-closing-brace-space-after": "always-intermediate",
		"scss/at-else-empty-line-before": "never",
		"scss/at-if-closing-brace-newline-after": "always-last-in-chain",
		"scss/at-if-closing-brace-space-after": "always-intermediate",
		"scss/at-rule-no-unknown": true,
		"scss/selector-no-redundant-nesting-selector": true
	}
};

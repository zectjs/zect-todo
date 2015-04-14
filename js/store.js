/*jshint unused:false */

(function (exports) {

	'use strict';

	var STORAGE_KEY = 'todos-zectjs';
	var storage = window.localStorage || window.Storage
	exports.todoStorage = {
		fetch: function () {
			return JSON.parse(storage.getItem(STORAGE_KEY) || '[]');
		},
		save: function (todos) {
			storage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
	};

})(window);
/*global Vue, todoStorage */

(function (exports) {

	'use strict';
	Zect.namespace('v')
	exports.app = new Zect({

		// the root element that will be compiled
		el: '#todoapp',

		// app state data
		data: {
			todos: todoStorage.fetch(),
			newTodo: '',
			editedItem: null,
			activeFilter: 'all',
			filters: {
				all: function () {
					return true;
				},
				active: function (todo) {
					return !todo.completed;
				},
				completed: function (todo) {
					return todo.completed;
				}
			}
		},

		// ready hook, watch todos change for data persistence
		ready: function () {
			this.$watch(function (prop) {
				if (prop.match(/^todos\b/)) {
					todoStorage.save(this.$data.todos);
				}
			}.bind(this));
		},

		// a custom directive to wait for the DOM to be updated
		// before focusing on the input field.
		// http://vuejs.org/guide/directives.html#Writing_a_Custom_Directive
		directives: {
			'todo-focus': {
				bind: function (value) {
					if (!value) {
						return;
					}
					var el = this.$el;
					setTimeout(function () {
						el.focus();
					}, 0);
				}
			}
		},
		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
			remaining: function () {
				console.log(this.$data.todos.filter(this.$data.filters.active).length)
				return this.$data.todos.filter(this.$data.filters.active).length;
			},
			allDone: {
				get: function () {
					return this.remaining === 0;
				},
				set: function (value) {
					this.$data.todos.forEach(function (todo) {
						todo.completed = value;
					});
				}
			}
		},
		methods: {
			// filter
			filterTodos: function () {
				return this.$data.todos.filter(
					this.$data.filters[this.$data.activeFilter]
				);
			},
			// methods
			addTodo: function (e) {
				
				if(e.keyCode !== 13){
					return
				}

				var value = this.$data.newTodo && this.$data.newTodo.trim();

				if (!value) {
					return;
				}
				this.$data.todos.push({ title: value, completed: false });
				this.$data.newTodo = '';
			},

			removeTodo: function (e) {
				var index = e.currentTarget.dataset.index;
				this.$data.todos.splice(index, 1);
			},

			editTodo: function (e) {
				var index = e.currentTarget.dataset.index;
				var todo = this.$data.todos[index];

				this.beforeEditCache = todo.title;
				this.$data.editedItem = index;
			},

			doneEdit: function (e) {
				if(e.keyCode !== 13){
					return
				}

				if (this.$data.editedItem === null) {
					return;
				}
				var index = e.currentTarget.dataset.index;
				var todo = this.$data.todos[index];

				this.$data.editedItem = null;
				todo.title = todo.title.trim();
				if (!todo.title) {
					this.removeTodo(todo);
				}
			},

			cancelEdit: function (e) {
				if(e.keyCode !== 27){
					return
				}
				var index = e.currentTarget.dataset.index;
				var todo = this.$data.todos[index];
				this.$data.editedItem = null;
				todo.title = this.beforeEditCache;
			},

			removeCompleted: function () {
				this.$data.todos = this.$data.todos.filter(this.filters.active);
			}
		}
	});

})(window);
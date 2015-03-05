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
			editedTodo: null,
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
				if (prop === 'todos') {
					todoStorage.save(this.$data.todos);
				}
			}.bind(this));
		},

		// a custom directive to wait for the DOM to be updated
		// before focusing on the input field.
		// http://vuejs.org/guide/directives.html#Writing_a_Custom_Directive
		directives: {
			'todo-focus': function (value) {
				if (!value) {
					return;
				}
				var el = this.el;
				setTimeout(function () {
					el.focus();
				}, 0);
			}
		},

		// // a custom filter that filters the displayed todos array
		// filters: {
			
		// },

		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
			remaining: function () {
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

		// methods that implement data logic.
		// note there's no DOM manipulation here at all.
		methods: {
			// filter
			filterTodos: function () {
				console.log(this.$data.todos.filter(this.$data.filters[this.$data.activeFilter]))
				return this.$data.todos.filter(this.$data.filters[this.$data.activeFilter]);
			},
			// methods
			addTodo: function (e) {
				
				if(e.keyCode !== 13){
					console.log(e.keyCode)
					return
				}

				var value = this.$data.newTodo && this.$data.newTodo.trim();

				if (!value) {
					return;
				}
				this.$data.todos.push({ title: value, completed: false });
				this.$data.newTodo = '';
			},

			removeTodo: function (todo) {
				this.$data.todos.$remove(todo.$data);
			},

			editTodo: function (todo) {
				this.beforeEditCache = todo.title;
				this.$data.editedTodo = todo;
			},

			doneEdit: function (todo) {
				if(e.keyCode === 13){
					console.log(e.keyCode)
					return
				}

				if (!this.$data.editedTodo) {
					return;
				}
				this.$data.editedTodo = null;
				todo.title = todo.title.trim();
				if (!todo.title) {
					this.removeTodo(todo);
				}
			},

			cancelEdit: function (todo) {
				if(e.keyCode === 13){
					console.log(e.keyCode)
					return
				}
				this.$data.editedTodo = null;
				todo.title = this.beforeEditCache;
			},

			removeCompleted: function () {
				this.$data.todos = this.$data.todos.filter(this.filters.active);
			}
		}
	});

})(window);
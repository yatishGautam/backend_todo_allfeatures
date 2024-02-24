const db = require('mongoose');

const schema = db.Schema;

const todoSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    taskStatus: {
        type: Boolean,
        default: false
    },
    priority:{
        type: Number,
        min: 1,
        max: 3,
        required: true
    },
    duedate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value) && value >= new Date();
            },
            message: 'Due date must be a valid future date'
        }
    },
    createdDate: {
        type: Date,
        default: Date.now 
    },
    category: {
        type: String,
        enum: ['work', 'personal', 'learning',  'documentation']
    }
})

const todoModel = db.Model('todos', todoSchema);

module.exports = todoModel;
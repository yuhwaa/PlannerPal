const Todo = require('../models/Todo')
const User = require('../models/User')



module.exports = {
    getTodos: async (req, res) => {
        // console.log(req.user)
        try {
            // ***do we need to change userId to userId: req.user.id || matching req.user.id
            // ***and similarly for itemsLeft ???
            const todoItems = await Todo.find({
                userId: req.user.id
            })
            const itemsLeft = await Todo.countDocuments({
                userId: req.user.id,
                completed: false
            })
            // const sharedItemsLeft = await Todo.countDocuments({
            //     sharedId: req.user.id,
            //     completed: false
            // })
            res.render('todos.ejs', {
                todos: todoItems,
                // sharedTodos: sharedItems,
                left: itemsLeft,
                // sharedLeft: sharedItemsLeft,
                user: req.user
            })
            // console.log(sharedItems)
        } catch (err) {
            console.log(err)
        }
    },

    shareTodo: async (req, res) => {
        try {


            const shareRecipient = await User.findOne({userName:req.body.shareReceiver}) // userName used to search DB from form

            const todoObjectId = req.body.todoId // todo (task) item ID that is sent with the form

            let todo = await Todo.findById(todoObjectId)

            if (todo.userId.includes(shareRecipient._id)) {
                console.log(`${todo.todo} already shared with ${shareRecipient.userName}`)
            } else {
            await Todo.findOneAndUpdate(
                { _id: todoObjectId },
                { $push: {userId: shareRecipient._id } },
                { shared: true}
            ) 
            console.log(`Shred ${todo.todo} with ${shareRecipient.userName}!`)
            }        

            console.log(todo)
            
            console.log(shareRecipient._id)

            res.redirect('/todos')
        } catch (err) {
            console.log(err)
        }
        },
    createTodo: async (req, res) => {
        try {
            await Todo.create({
                todo: req.body.todoItem,
                completed: false,
                userId: req.user.id,
                shared: false,
                deleted: false
            })
            console.log('Todo has been added!')
            res.redirect('/todos')
        } catch (err) {
            console.log(err)
        }
    },
    markComplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate(
                { _id: req.body.todoIdFromJSFile },
                {
                    completed: true
                }
            )
            console.log(req.body.todoIdFromJSFile)
            console.log('Marked Complete')
            res.json('Marked Complete')
        } catch (err) {
            console.log(err)
        }
    },
    markIncomplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate(
                { _id: req.body.todoIdFromJSFile },
                {
                    completed: false
                }
            )
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        } catch (err) {
            console.log(err)
        }
    },
    deleteTodo: async (req, res) => {
        console.log(req.body.todoIdFromJSFile)
        try {
            await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile })
            console.log('Deleted Todo')
            res.json('Deleted It')
        } catch (err) {
            console.log(err)
        }
    }
}

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
            const sharedItems = await Todo.find({
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
            const shareCreator = req.user.userName
            const shareCreatorId = req.user._id // MongoDb User Id for creator of the share
            const shareRecipient = await User.findOne({userName:req.body.shareReceiver}) // userName used to search DB from form!!!has to be an id not a name
            const todoItem = await Todo.findOne({todo:req.body.todoItemName})
            console.log(shareRecipient._id)

            await Todo.updateOne(
                // { _id: todoItem._id },

                { $push: {userId: shareRecipient._id } } //ObjectId("507c7f79bcf86cd7994f6c0e").valueOf()?? 
            )
            // console.log(todoItem._id)
                        
            console.log(shareRecipient._id)
            console.log('Added user to todo!')
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

const Todo = require('../models/Todo')
const User = require('../models/User')

module.exports = {
    getUsers: async (req, res) => {

        try {
 
            const userItems = await User.find({})
            // const sharedItems = await User.find({
            //     userId: req.user.id
            // })

            // const itemsLeft = await User.countDocuments({
            //     userId: req.user.id,
            //     completed: false
            // })
            // const sharedItemsLeft = await Todo.countDocuments({
            //     sharedId: req.user.id,
            //     completed: false
            // })
            res.render('todos.ejs', {
                users: userItems,
                // sharedTodos: sharedItems,
                // left: itemsLeft,
                // // sharedLeft: sharedItemsLeft,
                // user: req.user
            })
            // console.log(sharedItems)
        } catch (err) {
            console.log(err)
        }
    },
}
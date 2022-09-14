const Todo = require('../models/Todo')
const User = require('../models/User')

module.exports = {
    getUsers: async (req,res) => {
        try {
        const allUsers = await User.find({})
        console.log(allUsers)
        res.render('todos.ejs',{
            users: users.userName
        })         
        } catch (err) {
            console.log(err)
        }
    },
}
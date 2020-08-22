import { User, fetchUsers, signupUser, signinUser } from '../models/userModel'

export async function listUsers(req, res) {
    var f = await fetchUsers()
    res.send(f)
}

export async function registerUser(req, res, next) {
    var user = new User(req.body)
    var stat = await signupUser(user)
    res.send(stat)
}

export async function loginUser(req, res, next) {
    var user = new User(req.body)
    var stat = await signinUser(user)
    res.send(stat)
}

export function ftLogin(req, res, next) {
    //handle with passport
    
    res.redirect('/api/users')
}

export function gitLogin(req, res) {
    console.log(req.user)
    req.user = null
    res.redirect('/api/users')
}

export function logoutUser(req, res) {
    //handle with passport
    res.send('logout')
}
import q from './query'
import { hash, compare } from 'bcrypt'
import { validString, securePassword, validEmail } from './securityModel'

const params = ['username', 'first_name', 'last_name', 'email', 'password']

export class User {
    constructor(user) {
        this.username = user.username
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.password = user.password
    }   
}
export async function signupUser(user) {
    var err = {"error": []}
    var uname = validString('username', user.username)
    var fname = validString('first_name', user.first_name)
    var lname = validString('last_name', user.last_name)
    var vpass = securePassword(user.password)
    var vemail = validEmail(user.email)
    var found = findUser(user.username, user.email)
    var valid = await Promise.all([uname, fname, lname, vpass, vemail, found])
    for await (const v of valid) {
        if (Object.keys(v)[0] === 'error')
            err.error.push(v.error)
    }
    return (err.error.length > 0 ? err : await insertUser(user) ?
        {'success': 'signup successful'} : {'error': 'server offline'})
}
async function findUser(username, email) {
    var fuser = q.fetchone('users', 'username', 'username', username)
    var femail = q.fetchone('users', 'email', 'email', email)
    var found = await Promise.all([fuser, femail])
    return (found[0].length > 0 ? {'error': 'username is unavailable'} : 
        found[1].length > 0 ? {'error': 'email is unavailable'} : 
        {'success': 'username & email available'})
}
export async function insertUser(user) {
    var newpass = await hash(user.password, 10)
    var vals = [user.username, user.first_name, user.last_name, user.email, newpass]
    return (await q.insert('users', params, vals))
}
export async function fetchUsers() {
    var f = await q.getall('users')
    return (f)
}
export async function signinUser(user) {
    return ('soon')
}
export async function findOrCreate(profile) {
    var user = await q.fetchone('users', params, 'email', profile.email)
    if (user.length == 0) {
        var user = new User(profile)
        user.username = profile.login        
        user.password = await hash(Math.random.toString(36).substring(8), 10)
        insertUser(user)
    }
    return (user)
}
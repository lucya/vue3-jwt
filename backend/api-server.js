
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const members = [
  { id: 3, name: 'james', loginId: 'james', loginPw: '123' },
  { id: 4, name: 'amy', loginId: 'amy', loginPw: '123' }
]

app.use(cookieParser())
app.use(bodyParser.json())

app.get('/api/account', (req, res) => {

  if (req.cookies && req.cookies.token) {
    jwt.verify(req.cookies.token, 'abcd123456789abcdefghijklmnopqrstuvw', (err, decoded) => {
      if (err) {
        return res.sendStatus(401)
      }
      return res.send(decoded);
    })
  } else {
    res.sendStatus(401)
  }

})

app.post('/api/account', (req, res) => {
  const { loginId, loginPw } = req.body;
  console.log(loginId, loginPw);

  const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw)
  if (member) {
    // const options = {
    //   domain: 'localhost',
    //   path: '/',
    //   httpOnly: true,
    // }

    const token = jwt.sign({
      id: member.id,
      name: member.name,
    }, 'abcd123456789abcdefghijklmnopqrstuvw', {
      expiresIn: '15m',
      issuer: 'adele'
    })
    res.cookie('token', token)
    res.send(member);
  }
  else {
    res.sendStatus(404)
  }
})

app.delete('/api/account', (req, res) => {
  if (req.cookies && req.cookies.token) {
    res.clearCookie('token');
  }
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
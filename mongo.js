// tbXDWb6xZOdVg5By

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

console.log('Argumentit: ', process.argv[2], process.argv[3], process.argv[4], )

const password = process.argv[2]

const url =
  `mongodb+srv://HemmoP:${password}@cluster0.sahmg.mongodb.net/note-app?retryWrites=true&w=majority`

console.log('URL: ', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
const Person = mongoose.model('person', personSchema)

if (process.argv[3] && process.argv[4]) {

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      person.save().then(response => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
      })
} else {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
}
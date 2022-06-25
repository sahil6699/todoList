const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect(
  'mongodb+srv://tanishqsinghai11:Prakhar11@cluster0-daqiv.mongodb.net/todolistDB',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const itemsSchema = {
  item: String,
}

const Item = mongoose.model('Item', itemsSchema)

const item1 = new Item({
  item: 'Welcome to your todolist!',
})
const item2 = new Item({
  item: 'Hit the + icon, to add a new item.',
})
const item3 = new Item({
  item: '<-- Hit this to delete an item.',
})
const defaultItems = [item1, item2, item3]

app.get('/', function (req, res) {
  Item.find({}, function (err, results) {
    if (results.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Successfully added to the list.')
        }
      })
      res.redirect('/')
    } else {
      res.render('list', { kindOfDay: 'Today', newlistval: results })
    }
  })
})

app.get('/:parameter', function (req, res) {
  const parameter = req.params.parameter
})
app.post('/delete', function (req, res) {
  const checkedItemId = req.body.checkbox
  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log('Successfully deleted checked item.')
      res.redirect('/')
    }
  })
})
app.post('/', function (req, res) {
  const itemName = req.body.newval
  const item = new Item({
    item: itemName,
  })
  item.save()
  res.redirect('/')
})

const port = process.env.PORT || 3000
if (port == null || port == '') {
  port
}

app.listen(port, function (req, res) {
  console.log('Server has started successfully.')
})

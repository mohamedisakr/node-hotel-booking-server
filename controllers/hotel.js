import Hotel from '../models/hotel'

export const create = async (req, res, next) => {
  //   console.log(req.body)
  const {title, content, location, image, price, from, to, bed, postedBy} =
    req.body

  const hotelToAdd = new Hotel({
    title,
    content,
    location,
    image,
    price,
    from,
    to,
    bed,
    postedBy,
  })
  // console.table({    title,    content,    location,    image,    price,    from,    to,    bed,    postedBy,  // })
  try {
    hotelToAdd.save((err, result) => {
      if (err) {
        console.log(`Hotel save error ${err}`)
        return res.status(400).json({message: `Error saving hotel.`})
      }
      console.log(`Hotel created ${result}`)
      return res.status(201).json({data: result, message: `Hotel created`})
    })
  } catch (error) {
    console.error(`Hotel creation failed ${error}`)
    return res.status(400).json({message: `Hotel creation failed`})
  }
}

export const getAll = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({})
      .limit(20)
      .populate('postedBy', '_id name')
      .exec()
    const result = {data: hotels, total: hotels.length}
    // return res.status(200).json(hotels)
    return res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'server error'})
  }
}

export const getSellerHotels = async (req, res, next) => {
  try {
    const id = req.user._id
    const hotels = await Hotel.find({postedBy: id})
      .populate('postedBy', '_id name')
      .exec()
    console.log(`seller hotels ${hotels}`)
    const result = {data: hotels, total: hotels.length}
    return res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'server error'})
  }
}

export const remove = async (req, res, next) => {
  try {
    const {hotelId} = req.params

    const hotelToRemove = await Hotel.findByIdAndDelete(hotelId).exec()
    return res.status(204).json({message: 'Hotel deleted successfully'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'server error'})
  }
}

export const read = async (req, res, next) => {
  try {
    const {hotelId} = req.params

    const hotelToRead = await Hotel.findById(hotelId)
      .populate('postedBy', '_id name')
      .exec()
    return res.status(200).json({data: hotelToRead})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'server error'})
  }
}

export const update = async (req, res, next) => {
  try {
    const {hotelId} = req.params
    const hotelToUpdate = req.body

    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, hotelToUpdate, {
      new: true,
    }).exec()

    return res
      .status(204)
      .json({data: updatedHotel, message: 'Hotel updated successfully'})
    // .send(updatedHotel)
    // .json(updatedHotel)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'server error'})
  }
}

export const searchListings = async (req, res, next) => {
  const {location, date, bed} = req.body
  // const [fromDate, toDate] = date.split(',')
  // console.log(location, date, bed)

  const fromDatePlaceholder = new Date().toISOString()
  const fromDate = (date && date.split(',')[0]) || fromDatePlaceholder
  let results = await Hotel.find({
    from: {$gte: new Date(fromDate)}, //.toISOString()
    location,
    bed,
  }).exec()
  console.log(results)
  return res.json(results)
}

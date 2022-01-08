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
    console.log(`hotel id : ${hotelId}`)
    const hotelToRemove = await Hotel.findByIdAndDelete(hotelId).exec()
    return res.status(204).json({message: 'Hotel deleted successfully'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'server error'})
  }
}

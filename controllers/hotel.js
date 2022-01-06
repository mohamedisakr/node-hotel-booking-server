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
  console.table({
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

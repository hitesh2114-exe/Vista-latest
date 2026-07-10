const Listing = require("../model/listing");
const mongoose = require("mongoose");

//this function returns all the listings present in the listing data
const index = async (req, res) => {
  let allListings = await Listing.find({});
  res.send(allListings);
};

//this is used to show the detail of a particular card with id
const show = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate("reviews")
    .populate("owner")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });
  res.send(listing);
};

//this is used for creating new listing
// const createListing = async (req, res) => {
//   let { title, description, image, price, location, country, review, owner } =
//     req.body;
//   const newList = new Listing({
//     title,
//     description,
//     image,
//     price,
//     location,
//     country,
//     review,
//     owner,
//   });
//   newList.owner = req.user._id;
//   let response = await newList.save();
//   res.send(response);
// };

// const createListing = async (req, res) => {
//   try {
//     const { title, description, price, location, country } = req.body;

//     let image = {
//       filename: "",
//       url: "",
//     };

//     // Upload image only if one was selected
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "Vista_DEV_img",
//       });

//       image = {
//         filename: result.public_id,
//         url: result.secure_url,
//       };

//       // Delete temporary file
//       fs.unlinkSync(req.file.path);
//     }

//     const newList = new Listing({
//       title,
//       description,
//       image,
//       price,
//       location,
//       country,
//       owner: req.user._id,
//     });

//     const response = await newList.save();

//     res.status(201).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Error creating listing",
//       error: err.message,
//     });
//   }
// };

const createListing = async (req, res) => {
  try {
    const { title, description, price, location, country, image } = req.body;

    const newList = new Listing({
      title,
      description,
      price,
      location,
      country,
      image,
      owner: req.user._id,
    });

    const savedListing = await newList.save();

    res.status(201).json(savedListing);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error creating listing",
      error: err.message,
    });
  }
};

//this is used for updating the listing
const editListing = async (req, res) => {
  let reqId = req.user._id;
  let { _id, title, description, image, price, location, country } = req.body;

  let listing = await Listing.findById(_id);
  if (!listing.owner?._id.equals(reqId)) {
    return res.status(403).json({
      message: "You are not authorized",
    });
  }

  const updatedListing = await Listing.findByIdAndUpdate(_id, {
    title,
    description,
    image,
    price,
    location,
    country,
  });
  const result = await updatedListing.save();
  res.send(updatedListing);
};

//this function is used to delete the listing
const deleteListing = async (req, res) => {
  let { id } = req.params;

  let reqId = req.user._id;
  let listing = await Listing.findById(id);
  if (!listing.owner?._id.equals(reqId)) {
    return res.status(403).json({
      message: "You are not authorized",
    });
  }
  const deletedListing = await Listing.findByIdAndDelete(id);
  // const result = deleteListing.save();
  res.send(deletedListing);
};

const showAllListingOfLoggedInUser = async (req, res) => {
  let id = req.user._id;
  let response = await Listing.find({
    owner: id,
  });
  res.status(200).json(response);
};

module.exports = {
  index,
  show,
  createListing,
  editListing,
  deleteListing,
  showAllListingOfLoggedInUser,
};

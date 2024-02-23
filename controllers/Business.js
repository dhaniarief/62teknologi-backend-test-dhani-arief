import Businesses from "../models/BusinessModel.js";
import BusinessCategories from "../models/BusinessCategoryModel.js";
import BusinessCoordinates from "../models/BusinessCoordinateModel.js";
import BusinessLocations from "../models/BusinessLocationModel.js";
import { logErrorToFile } from "../utils.js";
import { Op } from "sequelize";

export const getBusinesses = async (req, res) => {
  try {
    const business = await Businesses.findAll({
      include: [
        { model: BusinessCategories },
        { model: BusinessCoordinates },
        { model: BusinessLocations },
      ],
    });
    res.status(200).json(business);
  } catch (error) {
    logErrorToFile(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getBusinessesById = async (req, res) => {
  try {
    const business = await Businesses.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: BusinessCategories },
        { model: BusinessCoordinates },
        { model: BusinessLocations },
      ],
    });
    if (!business) return res.status(404).json({ msg: "Data not found" });
    res.status(200).json(business);
  } catch (error) {
    logErrorToFile(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const addBusiness = async (req, res) => {
  const {
    alias,
    name,
    image_url,
    url,
    is_closed,
    review_count,
    rating,
    phone,
    display_phone,
    price,
    transactions,
    category,
    coordinate,
    location,
  } = req.body;
  try {
    const business = await Businesses.create({
      alias: alias,
      name: name,
      image_url: image_url,
      url: url,
      is_closed: is_closed,
      review_count: review_count,
      rating: rating,
      phone: phone,
      display_phone: display_phone,
      price: price,
      transactions: transactions,
    });

    const businessId = business.id;
    const businessCategoryData = category.map((data) => ({
      alias: data.alias,
      title: data.title,
      businessId: businessId,
    }));
    const businessCoordinateData = coordinate.map((data) => ({
      latitude: data.latitude,
      longitude: data.longitude,
      businessId: businessId,
    }));
    const businessLocationData = location.map((data) => ({
      address1: data.address1,
      address2: data.address2,
      address3: data.address3,
      city: data.city,
      zip_code: data.zip_code,
      country: data.country,
      state: data.state,
      display_address: data.display_address,
      businessId: businessId,
    }));

    await Promise.all(
      businessCategoryData.map((data) => BusinessCategories.create(data))
    );
    await Promise.all(
      businessCoordinateData.map((data) => BusinessCoordinates.create(data))
    );
    await Promise.all(
      businessLocationData.map((data) => BusinessLocations.create(data))
    );
    res.status(201).json({ msg: "Business created" });
  } catch (error) {
    logErrorToFile(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    const business = await Businesses.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!business) return res.status(404).json({ msg: "Data not found" });
    const {
      alias,
      name,
      image_url,
      url,
      is_closed,
      review_count,
      rating,
      phone,
      display_phone,
      price,
      transactions,
      category,
      coordinate,
      location,
    } = req.body;

    await BusinessCategories.destroy({
      where: { businessId: req.params.id },
    });
    await BusinessCoordinates.destroy({
      where: { businessId: req.params.id },
    });
    await BusinessLocations.destroy({
      where: { businessId: req.params.id },
    });

    await Businesses.update(
      {
        alias,
        name,
        image_url,
        url,
        is_closed,
        review_count,
        rating,
        phone,
        display_phone,
        price,
        transactions,
      },
      { where: { id: req.params.id } }
    );
    const businessCategoryData = category.map((data) => ({
      alias: data.alias,
      title: data.title,
      businessId: req.params.id,
    }));
    const businessCoordinateData = coordinate.map((data) => ({
      latitude: data.latitude,
      longitude: data.longitude,
      businessId: req.params.id,
    }));
    const businessLocationData = location.map((data) => ({
      address1: data.address1,
      address2: data.address2,
      address3: data.address3,
      city: data.city,
      zip_code: data.zip_code,
      country: data.country,
      state: data.state,
      display_address: data.display_address,
      businessId: req.params.id,
    }));

    await Promise.all(
      businessCategoryData.map((data) => BusinessCategories.create(data))
    );
    await Promise.all(
      businessCoordinateData.map((data) => BusinessCoordinates.create(data))
    );
    await Promise.all(
      businessLocationData.map((data) => BusinessLocations.create(data))
    );
    res.status(200).json({ msg: "Business updated" });
  } catch (error) {
    logErrorToFile(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    const business = await Businesses.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!business) return res.status(404).json({ msg: "Data not found" });
    await Businesses.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Business Deleted" });
  } catch (error) {
    logErrorToFile(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const searchBusinesses = async (req, res) => {
  try {
    const name = req.query.name || null;
    const review_count = parseInt(req.query.review_count) || null;
    const rating = parseInt(req.query.rating) || null;
    const price = req.query.price || null;
    const is_closed = req.query.is_closed || null;
    const alias = req.query.alias || null;
    const city = req.query.city || null;
    const results = await Businesses.findAll({
      where: {
        ...(name !== null && { name: { [Op.like]: `%${name}%` } }),
        ...(is_closed !== null && { is_closed: is_closed }),
        ...(price !== null && { price: price }),
        ...(review_count !== null && {
          review_count: { [Op.gte]: review_count },
        }),
        ...(rating !== null && { rating: { [Op.gte]: rating } }),
      },
      include: [
        {
          model: BusinessCategories,
          where: alias !== null ? { alias: { [Op.like]: `%${alias}%` } } : {},
        },
        { model: BusinessCoordinates },
        {
          model: BusinessLocations,
          where: city !== null ? { city: { [Op.like]: `%${city}%` } } : {},
        },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    logErrorToFile(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

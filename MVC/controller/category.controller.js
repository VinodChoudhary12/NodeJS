import Category from "../models/category.models.js";

export const getCategory = (request, response, next) => {
  Category.findAll()
    .then((result) => {
      return response.status(200).json({ categories: result });
    })
    .catch((err) => {
      return response.status(500).json({ error: "Internal Server Error" });
    });
};
export const saveInBulk = async (request, response, next) => {
  try {
    let categoryList = request.body;
    for (let category of categoryList) {
      await Category.create({ categoryName: category });
    }
    return response.status(200).json({ message: "All category saved.." });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};
export const insertCategoryName = (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.body);
    const category = Category.create({ categoryName: name });
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Insert Fail",
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {
        id: category.id,
        name: category.categoryName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Get Category By Id Fail",
      error: error.message,
    });
  }
};

// updaet category by id

export const updateCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.name = name;
    await category.save();

    res.status(200).json({
      success: true,
      data: {
        id: category.id,
        name: category.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update Category By Id Fail",
      error: error.message,
    });
  }
};

// delete category

export const deleteCategoryById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.destroy();

    res.status(200).json({
      success: true,
      message: "Delete Category By Id Success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete Category By Id Fail",
      error: error.message,
    });
  }
};

const Category = require("../models/Category");
//create category
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
exports.createCategory = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;

    //validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ",
      });
    }

    //create entry in DB
    const category = await Category.create({ name, description });

    //return res
    res.status(200).json({
      success: true,
      message: "Category created successfully ",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// fetch All category
exports.getAllCategory = async (req, res) => {
  try {
    //fetch
    const allCategory = await Category.find({ name: true, description: true });

    res.status(200).json({
      success: false,
      message: "all category return successfully ",
      data: allCategory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occur in fetching category data ",
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    //get data
    const categories = await Category.find(
      {},
      {
        name: true,
        description: true,
      }
    );
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    const  {categoryId}  = req.body;
    console.log("categoryId",categoryId);
    //get courses for specified categoryId
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
        populate:"instructor"
      })
      .exec();
    //validation
    console.log("selectedCategory",selectedCategory);
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }
    //handle the case when there is no course in category
    if (selectedCategory.course.length === 0) {
      console.log("No Courses fonud for selected category");
      return res.status(400).json({
        success: false,
        message: "No courses found for selected category.",
      });
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
        populate:"instructor"
      })
      .exec()

    //get coursesfor different categories

    //get top 10 selling courses
    //HW - write it on your own
    console.log("deffirenCategory",differentCategory);
    const allCategories=await Category.find()
    .populate({
        path:"course",
        match:{status:"Published"},
        populate:"instructor"
    })
    .exec();

    const allCourses=allCategories.flatMap((category)=>category.course);

    const mostSellingCourses=allCourses.sort((a,b)=>b.sold-a.sold).slice(0,10);



    console.log("b");
    //return response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Import npm modules
const express = require("express");
const router = express.Router();

// Import local modules
const Recipe = require("../../db/models/Recipie");

// @desc    Show add recipe page
// @route   GET /recipies/add
router.get("/add", (req, res) => {
  res.render("addRecipie");
});

// @desc    Show one recipe
// @route   GET /recipies/:id
router.get("/:id", async (req, res) => {
  // Find recipe
  const recipe = await Recipe.findById(req.params.id);

  // Render one recipe page
  res.render("showOneRecipe", { recipe });
});

// @desc    Create recipe
// @route   POST /recipies
router.post("/", async (req, res) => {
  // Create recipe obj
  const recipe = new Recipe({
    ...req.body,
    owner: req.user._id,
  });

  // Save recipie
  await recipe.save();

  // Redirect
  res.redirect("/dashboard");
});

// @desc    Delete recipe
// @route   DELETE /recipies/delete/:id
router.delete("/delete/:id", async (req, res) => {
  // Find recipe and delete
  await Recipe.findByIdAndDelete(req.params.id);

  // Redirect
  res.redirect("/dashboard");
});

// @desc    Show edit page
// @route   GET /recipies/edit/:id
router.get("/edit/:id", async (req, res) => {
  // Find recipe
  const recipe = await Recipe.findById(req.params.id);

  // Render edit page
  res.render("editRecipie", {
    recipe,
  });
});

// @desc    Edit recipe
// @route   PUT /recipies/edit/:id
router.put("/edit/:id", async (req, res) => {
  // Find recipe
  await Recipe.findByIdAndUpdate(
    req.params.id,
    { ...req.body, owner: req.user._id },
    {
      runValidators: true,
      new: true,
    }
  );

  // Redirect to dashboard
  res.redirect("/dashboard");
});

// Export router
module.exports = router;

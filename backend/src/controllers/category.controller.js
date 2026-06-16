import PropertyCategory from '../models/propertyCategory.model.js';

// Public: Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await PropertyCategory.find();
    res.json(categories);
  } catch (error) {
    console.error('Get Categories Error:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

// Admin: Add category
export const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = await PropertyCategory.create({ name, description });
    res.status(201).json({ message: 'Category created', category: newCategory });
  } catch (error) {
    console.error('Add Category Error:', error);
    res.status(500).json({ message: 'Error creating category' });
  }
};

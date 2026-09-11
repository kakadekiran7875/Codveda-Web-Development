const validatePostInput = (req, res, next) => {
  const { title, excerpt, content, category } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('Title is required and must be a valid string.');
  }
  if (!excerpt || typeof excerpt !== 'string' || !excerpt.trim()) {
    errors.push('Excerpt is required.');
  }
  if (!content || typeof content !== 'string' || !content.trim()) {
    errors.push('Content is required.');
  }
  if (!category || typeof category !== 'string') {
    errors.push('Category is required.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

module.exports = { validatePostInput };

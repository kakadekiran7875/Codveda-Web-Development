const Post = require('../models/Post');
const { getDBStatus } = require('../config/db');

// In-Memory Initial Seed for zero-config offline execution
let localPosts = [
  {
    _id: '1',
    title: 'Mastering Full-Stack MERN Architecture in 2026',
    excerpt: 'Key strategies for building decoupled, high-performance web systems with React and Node.js.',
    content: 'Building scalable full-stack applications requires a clear division of concerns. By designing stateless Express REST APIs and responsive React SPAs, engineers can achieve rapid iterations and isolated testing workflows...',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'Express', 'Architecture'],
    author: 'Kiran Kakade',
    readTime: '5 min read',
    upvotes: 24,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'CSS Grid vs Flexbox: The Definitive Guide',
    excerpt: 'When to use one-dimensional flex flow vs two-dimensional coordinate matrices in modern UI design.',
    content: 'CSS Flexbox excels at component-level distribution, while CSS Grid provides comprehensive layout control. Combining both allows for robust responsiveness without relying on third-party CSS utility frameworks...',
    category: 'Frontend',
    tags: ['CSS3', 'Flexbox', 'CSS Grid', 'Responsive'],
    author: 'Kiran Kakade',
    readTime: '4 min read',
    upvotes: 18,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Codveda Internship: From Foundations to Advanced Full-Stack',
    excerpt: 'Reflecting on progressive milestones across basic HTML/CSS, React dashboards, and REST APIs.',
    content: 'The structured progression from Level 1 to Level 3 in the Codveda Web Development Internship provides hands-on mastery in semantic layouts, interactive scripting, component props, and secure database interactions...',
    category: 'Career & Internship',
    tags: ['Codveda', 'Internship', 'Milestones', 'Career'],
    author: 'Kiran Kakade',
    readTime: '3 min read',
    upvotes: 42,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// @desc    Get all posts
// @route   GET /api/posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } }
        ];
      }
      const posts = await Post.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: posts.length, data: posts, source: 'mongodb' });
    }

    // Local Fallback
    let results = [...localPosts];
    if (category && category !== 'All') {
      results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.status(200).json({ success: true, count: results.length, data: results, source: 'local-store' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ success: false, message: `Post not found with id ${id}` });
      }
      return res.status(200).json({ success: true, data: post });
    }

    const post = localPosts.find(p => p._id === id);
    if (!post) {
      return res.status(404).json({ success: false, message: `Post not found with id ${id}` });
    }
    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new post
// @route   POST /api/posts
exports.createPost = async (req, res, next) => {
  try {
    const { title, excerpt, content, category, tags, author, readTime } = req.body;

    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, excerpt, content, and category.'
      });
    }

    if (getDBStatus()) {
      const post = await Post.create({
        title, excerpt, content, category,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
        author: author || 'Kiran Kakade',
        readTime: readTime || '3 min read'
      });
      return res.status(201).json({ success: true, message: 'Post created successfully', data: post });
    }

    const newPost = {
      _id: Date.now().toString(),
      title,
      excerpt,
      content,
      category,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      author: author || 'Kiran Kakade',
      readTime: readTime || '3 min read',
      upvotes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    localPosts.unshift(newPost);
    return res.status(201).json({ success: true, message: 'Post created successfully', data: newPost });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing post
// @route   PUT /api/posts/:id
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, tags, author, readTime } = req.body;

    if (getDBStatus()) {
      let post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ success: false, message: `Post not found with id ${id}` });
      }
      post = await Post.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      return res.status(200).json({ success: true, message: 'Post updated successfully', data: post });
    }

    const index = localPosts.findIndex(p => p._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Post not found with id ${id}` });
    }

    localPosts[index] = {
      ...localPosts[index],
      title: title !== undefined ? title : localPosts[index].title,
      excerpt: excerpt !== undefined ? excerpt : localPosts[index].excerpt,
      content: content !== undefined ? content : localPosts[index].content,
      category: category !== undefined ? category : localPosts[index].category,
      tags: tags !== undefined ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : localPosts[index].tags,
      author: author || localPosts[index].author,
      readTime: readTime || localPosts[index].readTime,
      updatedAt: new Date().toISOString()
    };

    return res.status(200).json({ success: true, message: 'Post updated successfully', data: localPosts[index] });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ success: false, message: `Post not found with id ${id}` });
      }
      await post.deleteOne();
      return res.status(200).json({ success: true, message: 'Post deleted successfully', data: {} });
    }

    const exists = localPosts.some(p => p._id === id);
    if (!exists) {
      return res.status(404).json({ success: false, message: `Post not found with id ${id}` });
    }
    localPosts = localPosts.filter(p => p._id !== id);
    return res.status(200).json({ success: true, message: 'Post deleted successfully', data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Upvote post
// @route   PATCH /api/posts/:id/upvote
exports.upvotePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const post = await Post.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, { new: true });
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      return res.status(200).json({ success: true, data: post });
    }

    const post = localPosts.find(p => p._id === id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    post.upvotes = (post.upvotes || 0) + 1;
    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

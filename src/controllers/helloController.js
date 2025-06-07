const greetings = async (req, res) => {
  try {
    // Get user name from query params or use default
    const name = req.query.name || 'World';
    
    // Send greeting response
    res.status(200).json({
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

module.exports = {
  greetings
};

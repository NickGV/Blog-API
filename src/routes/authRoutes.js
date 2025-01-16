const router = expres.Router();
const { signup, login, logout } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
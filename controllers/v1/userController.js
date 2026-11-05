const bcrypt = require('bcrypt');
const User = require('../../models/user.model');
const { generateToken } = require('../../services/token.service');

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};


async function registerUser(req, res) {
    try {
        const {name, email, password} = req.body;

        const isExistingUser = await User.findOne({email});
        if(isExistingUser) {
            return res.status(400).json({
              success: false,
              msg: "Email already exist!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = new User({
            name, email, password: hashedPassword
        });

        const userData = await newUser.save();
        
        return res.status(201).json({
            success: true,
            msg:"User registered successfully",
            data: userData
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

async function loginUser(req, res) {
    try {
    const { email, password } = req.body;

    // 1.Explicitly select password as it has 'select: false' in schema
    const user = await User.findOne({email}).select('+password');
    if (!user) {
        return res.status(401).json({
            success: false,
            msg: "Invalid email or password"
        })
    }

    // 2. Compare incoming password with hashed
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched) {
        return res.status(401).json({
          success: false,
          msg: "Invalid email or password",
        });
    }

    //3. Generate JWT payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
        name: user.name
      }
    };

    const token = await generateToken(payload);

    // 4. Return token and user data
    return res.status(200).json({
        success: true,
        msg: "Login successful.",
        data:{accessToken:token, tokenType:"Bearer", user} 
    });
} catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};


async function getProfile(req, res) {
    try {
        return res.status(200).json({ success: true, msg:'Profile fetched!'});
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}


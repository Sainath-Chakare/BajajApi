const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 
const app = express();
app.use(bodyParser.json());
app.use(cors()); 

function isValidData(data) {
   return Array.isArray(data) && data.every(item => typeof item === 'string');
}

app.post('/bfhl', (req, res) => {
   try{
      const { data } = req.body;
      
      if(!data || !Array.isArray(data)){
         return res.status(400).json({
            is_success: false,
            message: 'Invalid input'
         });
      }

      const numbers = data.filter(item => !isNaN(item));
      const alphabets = data.filter(item => isNaN(item));

      const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
      const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || "";

      const response = {
         is_success: true,
         user_id: process.env.USER_ID, 
         email: process.env.COLLEGE_EMAIL, 
         roll_number: process.env.COLLEGE_ROLL_NUMBER,
         numbers,
         alphabets,
         highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
      };
      res.status(200).json(response);
   }catch(error){
      res.status(500).json({
         is_success: false,
         message: 'An unexpected error occurred.'
      });
   }
});

// GET route
app.get('/bfhl', (req, res) => {
   try {
      res.status(200).json({
         operation_code: 1
      });
   } catch (error) {
      res.status(500).json({
         is_success: false,
         message: 'An unexpected error occurred.'
      });
   }
});


app.use((req, res) => {
   res.status(404).json({
      is_success: false,
      message: 'Route not found.'
   });
});

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({
      is_success: false,
      message: 'Internal server error.'
   });
});


app.listen(8080,()=>{console.log("Server is listening on port")});























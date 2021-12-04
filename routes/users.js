const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Card = require('../models/card');
const config =require('../config/database');


// 1. 사용자 등록기능 추가 
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,  //앞은 User라는 객체의 원래 이름 , 뒤는 입력받는 값
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.getUserByUsername(newUser.username, (err,user) => {
    if (err) throw err;
    if (user) {
      return res.json({ success: false, msg: '동일 아이디가 존재합니다. 다른 username을 사용하세요'});
    } else {
      User.addUser(newUser, (err, user) => {
        if(err) {
          res.json({ success: false, mag: '사용자 등록 실패'});
        } else {
          res.json({ success: true, msg: '사용자 등록 성공'});
        }
      });
    }
  });
});

// 2. 사용자 로그인 및 JWT 발급
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        let tokenUser = {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email
        }
        const token = jwt.sign({data: tokenUser}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: token,
          userNoPW: tokenUser,
        });
      } else {
        return res.json({success: false, msg: 'Wrong password 패스워드가 틀립니다.'});
      }
    });
  });
});

// 3. Profile 페이지 요청, JWT 인증 이용
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) =>
  {
    res.json({
      userNoPW: {
        name: req.user.name,
        username: req.user.username,
        email: req.user.email
      },
    });
  });


// 3. Product 페이지 요청, JWT 인증 이용
router.get('/product', passport.authenticate('jwt', { session: false }), (req, res, next) =>
  {
    res.json({
      product: "Good product",
      price: "10,000,000"
    });
  });

// 4. 사용자 리스트
router.get("/list", passport.authenticate("jwt", { session: false }), (req, res, next) => 
  {
    User.getAll((err, users) => {
      if (err) throw err;
      res.json(users);
    });
  });

// 5. 명함등록/수정
router.post("/card", (req, res, next) => {
  let username = req.body.username;
  let update = {
    name: req.body.name,
    org: req.body.org,
    title: req.body.title,
    tel: req.body.tel,
    fax: req.body.fax,
    mobile: req.body.mobile,
    email: req.body.email,
    homepage: req.body.homepage,
    address: req.body.address,
    zip: req.body.zip,
  };
  
  Card.getCardByUsername(username, (err, card) => {
    if (err) throw err;
    if (card) {
      Card.updateCard(username, update, (err, card) => {
        return res.json({
          success: true,
          msg: "명함정보 업데이트 성공",
        });
      });
    } else {
      update.username = req.body.username;
      let newCard = new Card(update);
      Card.addCard(newCard, (err, card) => {
        if (err) throw err;
        if (card) {
          res.json({ success: true, msg: "명함 등록 성공" });
        } else {
          res.json({ success: false, msg: "명함 등록 실패" });
        }
      });
    }
  });
});

// 6. 내 명함정보 전송
router.post("/myCard", (req, res, next) => {
  Card.getCardByUsername(req.body.username, (err, card) => {
    if (err) throw err;
    if (card) {
      return res.json({
        success: true,
        card: JSON.stringify(card),
      });
    } else {
      res.json({ success: false, msg: "명함정보가 없습니다" });
    }
  });
});
    
module.exports = router;

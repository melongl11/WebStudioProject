var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/horse')
  },
  filename: function(req, file, cb) {
    cb(null, req.body.horse_name +".jpg")
  }
})
var galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/gallery')
  },
  filename: function(req, file, cb) {
    cb(null, req.body.img_name+".jpg")
  }
})
var galleryUpload = multer({storage: galleryStorage})
var upload = multer({ storage: _storage})

var mysql = require('mysql');
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'wlalsrb0928',
  database : 'webstudio'
});
conn.connect();
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.listen(3000, function() {
  console.log('Connected, 3000 port!');
})

app.get('/HI/', function(req, res){
  res.render('test');
});


app.get('/Home/', function(req, res){
  var sql = 'SELECT * FROM tabmenu';
  conn.query(sql, function(err, tabmenu, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      sql = 'SELECT * FROM menuitem'
      conn.query(sql, function(err, submenu, fields){
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.render('Home', {tabmenu: tabmenu, submenu});
        }
      })
    }
  });
});

app.get(['/12/', '/12/:id'], function(req, res){
  var id = req.params.id;
  var sql = 'SELECT * FROM tabmenu';
  conn.query(sql, function(err, tabmenu, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      sql = 'SELECT * FROM menuitem ';
      conn.query(sql, function(err, submenu, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          else {
            if(id){
              sql = 'SELECT * FROM horseroom';
              conn.query(sql, function(err, description, fields){
                if(err) {
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                } else {
                  res.render('Facilities', {tabmenu: tabmenu, submenu:submenu, description:description})
                }
              })
            } else {
              res.redirect('/12/12')
            }
          }
      });
    }
  });
})

app.get('/13', function(req, res){
  var id = req.params.id;
  var sql = 'SELECT * FROM tabmenu';
  conn.query(sql, function(err, tabmenu, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      sql = 'SELECT * FROM menuitem';
      conn.query(sql, function(err, submenu, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          else {
            sql = 'SELECT * FROM gallery'
            conn.query(sql, function(err, img, fields){
              if(err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
              } else {
                res.render('gallery', {tabmenu: tabmenu, submenu:submenu, img:img})
              }
            })

          }
      });
    }
  });

})

app.get(['/14/','/14/:post'], function(req, res) { //community
  var post = req.params.post;
  var sql = 'SELECT * FROM tabmenu';
  conn.query(sql, function(err, tabmenu, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      sql = 'SELECT * FROM menuitem';
      conn.query(sql, function(err, submenu, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          else  {
            if(post) {
              sql = 'SELECT * FROM community WHERE id=?';
              conn.query(sql, [post], function(err, description, fields){
                if(err) {
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                } else {
                  res.render('community_post', {tabmenu: tabmenu, submenu:submenu,description:description})
                }
              })
            } else {
              sql = 'SELECT * FROM community'
              conn.query(sql, function(err, description, fields){
                if(err) {
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                } else {
                  res.render('community', {tabmenu: tabmenu, submenu:submenu, description:description})
                }
              })
            }
          }
      });
    }
  });
})

app.get(['/7/','/7/:id'], function(req,res) {//information
  var id = req.params.id;
  var sql = 'SELECT * FROM tabmenu';
  conn.query(sql, function(err, tabmenu, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      sql = 'SELECT * FROM menuitem';
      conn.query(sql, function(err, submenu, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          else {
            if(id==23) {
              res.render('Location', {tabmenu: tabmenu, submenu:submenu})
            }
            else if(id){
              sql = 'SELECT * FROM information WHERE menu_id=?'
              conn.query(sql, [id], function(err, description, fields){
                if(err) {
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                } else {
                  res.render('information', {tabmenu: tabmenu, submenu:submenu, description:description})
                }
              })
            } else {
              res.redirect('/7/20')
            }
          }
      });
    }
  });
})

app.get(['/9', '/9/:id'], function(req,res) {
  var id = req.params.id;
  var sql = 'SELECT * FROM tabmenu';
  conn.query(sql, function(err, tabmenu, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      sql = 'SELECT * FROM menuitem';
      conn.query(sql, function(err, submenu, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          else {
            if(id){
              sql = 'SELECT * FROM program WHERE menu_id=?'
              conn.query(sql, [id], function(err, description, fields){
                if(err) {
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                } else {
                  res.render('Program', {tabmenu: tabmenu, submenu:submenu, description:description})
                }
              })
            } else {
              res.redirect('/9/16')
            }
          }
      });
    }
  });
})

app.get('/10', function(req, res) {
  var sql = 'SELECT * FROM tabmenu';
  conn.query(sql, function(err, tabmenu, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      sql = 'SELECT * FROM menuitem';
      conn.query(sql, function(err, submenu, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          else {
            sql = 'SELECT * FROM reservation'
            conn.query(sql, function(err, reservation, fields){
              if(err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
              } else {
                sql = 'SELECT * FROM horseroom'
                conn.query(sql, function(err, horseroom, fields) {
                  if(err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                  } else {
                    res.render('Reservation', {tabmenu: tabmenu, submenu:submenu, horseroom:horseroom, reservation:reservation})
                  }
                })
              }
            })
          }
      });
    }
  });
})
app.post([, '/validation'], function (req, res) {
  var id = req.body.id;
  var password = req.body.password;
  if (id == 'sejong' && password == 'sejong') {
    var sql = 'SELECT * FROM tabmenu';
    var itemSql = 'SELECT * FROM menuitem WHERE tab_id=7 ORDER BY tab_id';
    conn.query(sql, function(err, menuList, fields){
      conn.query(itemSql, function(err, informationList, fields){
        var contents = req.params.contents;
        if(contents) {
          sql = 'SELECT * FROM menuitem';
          conn.query(sql, function(err, subList, fields){
            if(err) {
              console.log(err);
              res.status(500).send('Internal Server Error');
            }else if(contents == 5 || contents == 3){
              sql = 'SELECT * FROM horseroom';
              conn.query(sql, function(err, horseinfo, fields){
                if(err){
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                }
                else{
                  sql = 'SELECT * FROM reservation, horseroom WHERE horseroom.id=hnum';
                  conn.query(sql, function(err, reservation, fields){
                    if(err){
                      console.log(err);
                      res.status(500).send('Internal Server Error');
                    } else {
                      res.render('manage',{menuList: menuList, informationList: informationList, subList: subList, content:contents, reservation:reservation, horseinfo:horseinfo});
                    }
                  })
                }
              })
            } else if (contents==9) {sql = 'SELECT * FROM menuitem WHERE tab_id=9 ORDER BY tab_id'
            conn.query(sql, function(err, program, fields) {
                if(err) {
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                } else {
                    res.render('manage',{menuList: menuList, informationList: informationList, subList: subList, content:contents, program:program});
                }
              })
            } else {
                res.render('manage', {menuList: menuList, informationList: informationList, subList: subList, content:contents});
            }
          })
        } else {
          res.render('manage', {menuList: menuList, informationList: informationList});
        }
      })
    })
  } else {
    res.redirect('/home/')
  }
})
app.get('/manager/:contents', function(req, res) {
  var sql = 'SELECT * FROM tabmenu';
  var itemSql = 'SELECT * FROM menuitem WHERE tab_id=7 ORDER BY tab_id';
  conn.query(sql, function(err, menuList, fields){
    conn.query(itemSql, function(err, informationList, fields){
      var contents = req.params.contents;
      if(contents) {
        sql = 'SELECT * FROM menuitem';
        conn.query(sql, function(err, subList, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          }else if(contents == 5 || contents == 3){
            sql = 'SELECT * FROM horseroom';
            conn.query(sql, function(err, horseinfo, fields){
              if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
              }
              else{
                sql = 'SELECT * FROM reservation, horseroom WHERE horseroom.id=hnum';
                conn.query(sql, function(err, reservation, fields){
                  if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                  } else {
                    res.render('manage',{menuList: menuList, informationList: informationList, subList: subList, content:contents, reservation:reservation, horseinfo:horseinfo});
                  }
                })
              }
            })
          } else if (contents==9) {sql = 'SELECT * FROM menuitem WHERE tab_id=9 ORDER BY tab_id'
          conn.query(sql, function(err, program, fields) {
              if(err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
              } else {
                  res.render('manage',{menuList: menuList, informationList: informationList, subList: subList, content:contents, program:program});
              }
            })
          } else {
              res.render('manage', {menuList: menuList, informationList: informationList, subList: subList, content:contents});
          }
        })
      } else {
        res.render('manage', {menuList: menuList, informationList: informationList});
      }
    })
  })
})

app.get('/manager', function(req, res){
  res.render('Validation');
});

app.post('/manager/modify/submenu/:id', function(req, res){ //서브메뉴 수정
  var item = req.body.item;
  var id = req.params.id;
  //res.send(sql);
  if(id=="add"){
    var contents = req.body.tabMenu;
    var sql = 'INSERT INTO menuitem (item, tab_id) VALUES(?, ?)';
    conn.query(sql, [item, contents], function(err, result, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/manager/6');
      }
    });
  }else {
    var sql = 'UPDATE menuitem SET item="' + item +  '" WHERE id=' + id;
    conn.query(sql, function(err, result, fields) {
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/manager/6');
      }
    });
  }
});
app.get('/manager/modify/submenu/delete/:delete', function(req,res) {
 var deleteid = req.params.delete;
 var sql = 'DELETE FROM menuitem WHERE id = ' + deleteid;
 conn.query(sql, function (err, result, fields) {
   if(err) {
     console.log(err);
     res.status(500).send('Internal Server Error');
   } else {
     res.redirect('/manager/6');
   }
 })
})

app.get('/manager/modify/tabmenu/delete/:delete', function(req,res) {
 var deleteid = req.params.delete;
 var sql = 'DELETE FROM tabmenu WHERE id = ' + deleteid;
 conn.query(sql, function (err, result, fields) {
   if(err) {
     console.log(err);
     res.status(500).send('Internal Server Error');
   } else {
     res.redirect('/manager/6');
   }
 })
})
app.post( '/manager/modify/tabmenu/:id', function(req, res){ //서브메뉴 수정
  var item = req.body.item;
  var id = req.params.id;
  //res.send(sql);
  if(id=="add"){
    var contents = req.body.tabMenu;
    var sql = 'INSERT INTO tabmenu (contents) VALUES(?)';
    conn.query(sql, [item], function(err, result, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/manager/6');
      }
    });
  } else {
    var sql = 'UPDATE tabmenu SET contents="' + item +  '" WHERE id=' + id;
    conn.query(sql, function(err, result, fields) {
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/manager/6');
      }
    });
  }
});

app.post('/manager/modify/tabmenu/:contents/:id', function(req, res){ //서브메뉴 수정
  var contents = req.params.contents;
  var item = req.body.item;
  var id = req.params.id;
  //res.send(sql);
  if(id=="add"){
    var sql = 'INSERT INTO menuitem (item, tab_id) VALUES(?, ?)';
    conn.query(sql, [item, contents], function(err, result, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/manager/' + contents);
      }
    });
  }else {
    var sql = 'UPDATE menuitem SET item="' + item +  '" WHERE id=' + id;
    conn.query(sql, function(err, result, fields) {
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/manager/'+contents);
      }
    });
  }
});

app.post('/manager/modify/post/:contents/:id', function(req, res) {
  var contents = req.params.contents;
  var id = req.params.id;
  var description = req.body.description;
  var sql = 'SELECT * FROM ' + contents + ' WHERE menu_id=?';;
  conn.query(sql, [id], function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else {
      if(result.length) {
        sql = 'UPDATE '+contents+' SET description=? WHERE menu_id=?';
        conn.query(sql, [description, id], function(err, result, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.redirect('/manager/');
          }
        })
      } else { //없을때 INSERT
        sql = 'INSERT INTO '+contents +' (description,menu_id) VALUES(?, ?)';
        conn.query(sql, [description, id], function(err, result, field){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.redirect('/manager/');
          }
        })
      }
    }
  })
});

app.post('/manager/community/add/', function(req, res){
  var title = req.body.title;
  var description = req.body.notice;
  var dt = new Date();
  var month=dt.getMonth() + 1;
  var year = dt.getFullYear();
  var day = dt.getDate();
  var realDate = year.toString().substring(2,4) + '-' + month + '-' + day;
  var sql = 'INSERT INTO community(title, description, secret, date) VALUES(?, ?, 0, ?)'
  conn.query(sql, [title, description, realDate], function(err, result, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/manager/');
    }
  })
})

app.post('/manager/horseroom/add/', upload.single('horse_img'), function(req, res){
  var horse_name = req.body.horse_name;
  var description = req.body.description;
  var sql = 'INSERT INTO horseroom(horse_name, description) VALUES(?, ?)';
  conn.query(sql, [horse_name, description] , function(err, result, fields) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/manager/');
    }
  })
})

app.get('/manager/horseroom/delete/:id', function(req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM horseroom WHERE id = ?';
  conn.query(sql, [id], function(err, result, fields) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/manager/3');
    }
  })

})

app.post('/manager/gallery/add/', galleryUpload.single('new_img'), function(req, res){
  var img_name = req.body.img_name;
  var sql = 'INSERT INTO gallery(img_name) VALUES(?)';
  conn.query(sql, [img_name], function(err, result, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error')
    } else {
      res.redirect('/manager/8')
    }
  })
})
app.post('/reservation/add', function(req,res){
   res.redirect('/Reservation');
})

app.post('/manager/reservation/add', function(req, res){
  var cname = req.body.cname;
  var hnum = req.body.horsename;
  var sdate = req.body.sdate;
  var edate = req.body.edate;
  var sql = 'SELECT id FROM horseroom WHERE horse_name = ?';
  conn.query(sql, [hnum], function(err, id, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      sql = 'INSERT INTO reservation(cname, hnum, sdate, edate) VALUES(?, ?, ?, ?)'
      conn.query(sql, [cname, hnum, sdate, edate], function(err, result, fields){
        if(err) {
          console.log(err);
          res.status(500).send('2 Internal Server Error');
        } else {
          res.redirect('/manager/');
        }
      })
    }
  })
})

app.post('/manager/reservation/delete', function(req, res){
  var hname = req.body.hname;
  var sdate = req.body.ssdate;
  var edate = req.body.eedate;
  var sql = 'DELETE FROM reservation WHERE hnum = (SELECT id FROM horseroom WHERE horse_name = ?) && sdate = ? && edate = ?';
  conn.query(sql, [hname, sdate, edate], function(err, result, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/manager/5/');
    }
  })
})

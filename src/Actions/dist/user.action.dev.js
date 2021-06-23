"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLike = exports.deleteLike = exports.addlike = exports.getPublication = exports.deletePublication = exports.getCommantaire = exports.addCommantaire = exports.updatePublication = exports.addPublication = exports.updateMessage = exports.getRealTimeConversation = exports.getRealtimeuser = void 0;

var _constans = require("./constans");

var _firebase = _interopRequireDefault(require("firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var firestore = _firebase["default"].firestore;

var storage = _firebase["default"].storage();

var getRealtimeuser = function getRealtimeuser(uid) {
  return function _callee(dispatch) {
    var db;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch({
              type: "".concat(_constans.userConstans.GET_REAL_TILME_USER, "_REQUEST")
            });
            db = firestore();
            db.collection("user") //.where("uid", "!=", uid)
            .onSnapshot(function (querySnapshot) {
              var user = [];
              querySnapshot.forEach(function (doc) {
                if (doc.data().uid != uid) {
                  user.push(doc.data());
                }
              }); //console.log(user);

              dispatch({
                type: "".concat(_constans.userConstans.GET_REAL_TILME_USER, "_SUCCESS"),
                payload: {
                  user: user
                }
              });
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.getRealtimeuser = getRealtimeuser;

var getRealTimeConversation = function getRealTimeConversation(users) {
  return function _callee2(dispatch) {
    var db;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            db = firestore();
            db.collection('conversation').where('user_uid_1', 'in', [users.uid_1, users.uid_2]).orderBy('createdAt', 'asc').onSnapshot(function (querySnapshot) {
              var conversations = [];
              querySnapshot.forEach(function (doc) {
                if (doc.data().user_uid_1 == users.uid_1 && doc.data().user_uid_2 === users.uid_2 || doc.data().user_uid_1 == users.uid_2 && doc.data().user_uid_2 === users.uid_1) {
                  conversations.push(doc.data());
                }

                if (doc.data().user_uid_1 == users.uid_2 && doc.data().user_uid_2 === users.uid_1) {}
              });
              console.log(conversations);

              if (conversations.length > 0) {
                dispatch({
                  type: _constans.userConstans.GET_REAL_TILME_MESSAGES,
                  payload: {
                    conversations: conversations
                  }
                });
              } else {
                dispatch({
                  type: "".concat(_constans.userConstans.GET_REAL_TILME_MESSAGES, "_FAILURE"),
                  payload: {
                    conversations: conversations
                  }
                });
              }
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.getRealTimeConversation = getRealTimeConversation;

var updateMessage = function updateMessage(msgObj) {
  return function _callee3(dispatch) {
    var db;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            db = firestore();
            db.collection('conversation').add(_objectSpread({}, msgObj, {
              isView: false,
              createdAt: new Date()
            })).then(function (data) {})["catch"](function (error) {
              console.log(error);
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.updateMessage = updateMessage;

var addPublication = function addPublication(p, image) {
  console.log(image.name);

  if (image != '') {
    return function _callee4(dispatch) {
      var uploadTask;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              uploadTask = storage.ref("images/".concat(image.name)).put(image, image.type);
              uploadTask.on("state_changed", function (snapshot) {}, function (error) {
                console.log(error);
              }, function () {
                storage.ref("images").child(image.name).getDownloadURL().then(function (url) {
                  p.url = url;

                  _firebase["default"].firestore().collection('publication').add(p);
                });
              });

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      });
    };
  } else {
    return function _callee5(dispatch) {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _firebase["default"].firestore().collection('publication').add(p);

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      });
    };
  }
};

exports.addPublication = addPublication;

var updatePublication = function updatePublication(id, p, image) {
  console.log(image.name);

  if (image != '') {
    return function _callee6(dispatch) {
      var uploadTask;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              uploadTask = storage.ref("images/".concat(image.name)).put(image, image.type);
              uploadTask.on("state_changed", function (snapshot) {}, function (error) {
                console.log(error);
              }, function () {
                storage.ref("images").child(image.name).getDownloadURL().then(function (url) {
                  p.url = url;

                  _firebase["default"].firestore().collection('publication').doc(id).update(p);
                });
              });

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      });
    };
  } else {
    return function _callee7(dispatch) {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _firebase["default"].firestore().collection('publication').doc(id).update(p);

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      });
    };
  }
};

exports.updatePublication = updatePublication;

var addCommantaire = function addCommantaire(c) {
  return function _callee8(disparch) {
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _firebase["default"].firestore().collection('commantaire').add(c);

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    });
  };
};

exports.addCommantaire = addCommantaire;

var getCommantaire = function getCommantaire() {
  return function _callee9(dispatch) {
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _firebase["default"].firestore().collection('commantaire').orderBy('createdAt', 'desc').get().then(function (snapshot) {
              var commantaire = [];
              snapshot.forEach(function (doc) {
                commantaire.push(doc.data());
              });
              dispatch({
                type: "getCommantaire",
                payload: {
                  commantaire: commantaire
                }
              });
            })["catch"](function (error) {
              console.log(error);
            });

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    });
  };
};

exports.getCommantaire = getCommantaire;

var deletePublication = function deletePublication(id, url) {
  return function _callee10(dispatch) {
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (url) {
              storage.refFromURL(url)["delete"]();
            }

            _firebase["default"].firestore().collection('publication').doc(id)["delete"]();

          case 2:
          case "end":
            return _context10.stop();
        }
      }
    });
  };
};

exports.deletePublication = deletePublication;

var getPublication = function getPublication() {
  return function _callee11(dispatch) {
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _firebase["default"].firestore().collection('publication').orderBy('sort', 'desc').get().then(function (snapchot) {
              console.log(snapchot);
              var publication = [];
              snapchot.forEach(function (doc) {
                var data = {
                  id: doc.id,
                  name: doc.data().name,
                  text: doc.data().text,
                  createdAt: doc.data().createdAt,
                  url: doc.data().url,
                  userId: doc.data().userId
                };
                publication.push(data);
              });
              console.log(publication);
              dispatch({
                type: "add",
                payload: {
                  publication: publication
                }
              });
            })["catch"](function (error) {
              return console.log(error);
            });

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    });
  };
};

exports.getPublication = getPublication;

var addlike = function addlike(l) {
  return function _callee12(dispatch) {
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _firebase["default"].firestore().collection('likes').add(l).then(console.log('liked '));

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    });
  };
};

exports.addlike = addlike;

var deleteLike = function deleteLike(id) {
  return function _callee13(dispatch) {
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _firebase["default"].firestore().collection('likes').doc(id)["delete"]();

          case 1:
          case "end":
            return _context13.stop();
        }
      }
    });
  };
};

exports.deleteLike = deleteLike;

var getLike = function getLike() {
  return function _callee14(dispatch) {
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _firebase["default"].firestore().collection('likes').get().then(function (snapchot) {
              var likes = [];
              snapchot.forEach(function (doc) {
                var data = {
                  id: doc.id,
                  pubId: doc.data().pubId,
                  isLiked: doc.data().isLiked,
                  userId: doc.data().userId
                };
                likes.push(data);
              });
              console.log(likes);
              dispatch({
                type: "like",
                payload: {
                  likes: likes
                }
              });
            })["catch"](function (error) {
              return console.log(error);
            });

          case 1:
          case "end":
            return _context14.stop();
        }
      }
    });
  };
};

exports.getLike = getLike;
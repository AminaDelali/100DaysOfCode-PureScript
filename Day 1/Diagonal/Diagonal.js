// Generated by purs bundle 0.13.6
var PS = {};
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Control.Apply"] = $PS["Control.Apply"] || {};
  var exports = $PS["Control.Apply"];                    
  var Apply = function (Functor0, apply) {
      this.Functor0 = Functor0;
      this.apply = apply;
  };                      
  var apply = function (dict) {
      return dict.apply;
  };
  exports["Apply"] = Apply;
  exports["apply"] = apply;
})(PS);
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Control.Applicative"] = $PS["Control.Applicative"] || {};
  var exports = $PS["Control.Applicative"];
  var Control_Apply = $PS["Control.Apply"];        
  var Applicative = function (Apply0, pure) {
      this.Apply0 = Apply0;
      this.pure = pure;
  };
  var pure = function (dict) {
      return dict.pure;
  };
  var liftA1 = function (dictApplicative) {
      return function (f) {
          return function (a) {
              return Control_Apply.apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
          };
      };
  };
  exports["Applicative"] = Applicative;
  exports["pure"] = pure;
  exports["liftA1"] = liftA1;
})(PS);
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Control.Bind"] = $PS["Control.Bind"] || {};
  var exports = $PS["Control.Bind"];
  var Bind = function (Apply0, bind) {
      this.Apply0 = Apply0;
      this.bind = bind;
  };                     
  var bind = function (dict) {
      return dict.bind;
  };
  exports["Bind"] = Bind;
  exports["bind"] = bind;
})(PS);
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Control.Semigroupoid"] = $PS["Control.Semigroupoid"] || {};
  var exports = $PS["Control.Semigroupoid"];
  var Semigroupoid = function (compose) {
      this.compose = compose;
  };
  var semigroupoidFn = new Semigroupoid(function (f) {
      return function (g) {
          return function (x) {
              return f(g(x));
          };
      };
  });
  exports["semigroupoidFn"] = semigroupoidFn;
})(PS);
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Control.Category"] = $PS["Control.Category"] || {};
  var exports = $PS["Control.Category"];
  var Control_Semigroupoid = $PS["Control.Semigroupoid"];                
  var Category = function (Semigroupoid0, identity) {
      this.Semigroupoid0 = Semigroupoid0;
      this.identity = identity;
  };
  var identity = function (dict) {
      return dict.identity;
  };
  var categoryFn = new Category(function () {
      return Control_Semigroupoid.semigroupoidFn;
  }, function (x) {
      return x;
  });
  exports["identity"] = identity;
  exports["categoryFn"] = categoryFn;
})(PS);
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Control.Monad"] = $PS["Control.Monad"] || {};
  var exports = $PS["Control.Monad"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Bind = $PS["Control.Bind"];                
  var Monad = function (Applicative0, Bind1) {
      this.Applicative0 = Applicative0;
      this.Bind1 = Bind1;
  };
  var ap = function (dictMonad) {
      return function (f) {
          return function (a) {
              return Control_Bind.bind(dictMonad.Bind1())(f)(function (f$prime) {
                  return Control_Bind.bind(dictMonad.Bind1())(a)(function (a$prime) {
                      return Control_Applicative.pure(dictMonad.Applicative0())(f$prime(a$prime));
                  });
              });
          };
      };
  };
  exports["Monad"] = Monad;
  exports["ap"] = ap;
})(PS);
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Data.Functor"] = $PS["Data.Functor"] || {};
  var exports = $PS["Data.Functor"];               
  var Functor = function (map) {
      this.map = map;
  };
  exports["Functor"] = Functor;
})(PS);
(function(exports) {
  "use strict";

  exports.showNumberImpl = function (n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };
})(PS["Data.Show"] = PS["Data.Show"] || {});
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Data.Show"] = $PS["Data.Show"] || {};
  var exports = $PS["Data.Show"];
  var $foreign = $PS["Data.Show"];
  var Show = function (show) {
      this.show = show;
  };
  var showNumber = new Show($foreign.showNumberImpl);
  var show = function (dict) {
      return dict.show;
  };
  exports["show"] = show;
  exports["showNumber"] = showNumber;
})(PS);
(function(exports) {
  "use strict";

  exports.pureE = function (a) {
    return function () {
      return a;
    };
  };

  exports.bindE = function (a) {
    return function (f) {
      return function () {
        return f(a())();
      };
    };
  };
})(PS["Effect"] = PS["Effect"] || {});
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Effect"] = $PS["Effect"] || {};
  var exports = $PS["Effect"];
  var $foreign = $PS["Effect"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Apply = $PS["Control.Apply"];
  var Control_Bind = $PS["Control.Bind"];
  var Control_Monad = $PS["Control.Monad"];
  var Data_Functor = $PS["Data.Functor"];                    
  var monadEffect = new Control_Monad.Monad(function () {
      return applicativeEffect;
  }, function () {
      return bindEffect;
  });
  var bindEffect = new Control_Bind.Bind(function () {
      return applyEffect;
  }, $foreign.bindE);
  var applyEffect = new Control_Apply.Apply(function () {
      return functorEffect;
  }, Control_Monad.ap(monadEffect));
  var applicativeEffect = new Control_Applicative.Applicative(function () {
      return applyEffect;
  }, $foreign.pureE);
  var functorEffect = new Data_Functor.Functor(Control_Applicative.liftA1(applicativeEffect));
  exports["monadEffect"] = monadEffect;
})(PS);
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Effect.Class"] = $PS["Effect.Class"] || {};
  var exports = $PS["Effect.Class"];
  var Control_Category = $PS["Control.Category"];
  var Effect = $PS["Effect"];                
  var MonadEffect = function (Monad0, liftEffect) {
      this.Monad0 = Monad0;
      this.liftEffect = liftEffect;
  };
  var monadEffectEffect = new MonadEffect(function () {
      return Effect.monadEffect;
  }, Control_Category.identity(Control_Category.categoryFn));
  var liftEffect = function (dict) {
      return dict.liftEffect;
  };
  exports["liftEffect"] = liftEffect;
  exports["monadEffectEffect"] = monadEffectEffect;
})(PS);
(function(exports) {
  "use strict";

  exports.log = function (s) {
    return function () {
      console.log(s);
      return {};
    };
  };
})(PS["Effect.Console"] = PS["Effect.Console"] || {});
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Effect.Console"] = $PS["Effect.Console"] || {};
  var exports = $PS["Effect.Console"];
  var $foreign = $PS["Effect.Console"];
  var Data_Show = $PS["Data.Show"];
  var logShow = function (dictShow) {
      return function (a) {
          return $foreign.log(Data_Show.show(dictShow)(a));
      };
  };
  exports["logShow"] = logShow;
})(PS);
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Effect.Class.Console"] = $PS["Effect.Class.Console"] || {};
  var exports = $PS["Effect.Class.Console"];
  var Effect_Class = $PS["Effect.Class"];
  var Effect_Console = $PS["Effect.Console"];
  var logShow = function (dictMonadEffect) {
      return function (dictShow) {
          var $27 = Effect_Class.liftEffect(dictMonadEffect);
          var $28 = Effect_Console.logShow(dictShow);
          return function ($29) {
              return $27($28($29));
          };
      };
  };
  exports["logShow"] = logShow;
})(PS);
(function(exports) {
  "use strict";          

  exports.sqrt = Math.sqrt;
})(PS["Math"] = PS["Math"] || {});
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Math"] = $PS["Math"] || {};
  var exports = $PS["Math"];
  var $foreign = $PS["Math"];
  exports["sqrt"] = $foreign.sqrt;
})(PS);
(function($PS) {
  // Generated by purs version 0.13.6
  "use strict";
  $PS["Main"] = $PS["Main"] || {};
  var exports = $PS["Main"];
  var Data_Show = $PS["Data.Show"];
  var Effect_Class = $PS["Effect.Class"];
  var Effect_Class_Console = $PS["Effect.Class.Console"];
  var $$Math = $PS["Math"];                
  var diagonal = function (w) {
      return function (h) {
          return $$Math.sqrt(w * w + h * h);
      };
  };
  var main = Effect_Class_Console.logShow(Effect_Class.monadEffectEffect)(Data_Show.showNumber)(diagonal(3.0)(4.0));
  exports["diagonal"] = diagonal;
  exports["main"] = main;
})(PS);
PS["Main"].main();
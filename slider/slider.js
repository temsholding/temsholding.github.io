$(function() {
  "use strict";

  var body = $("body"),
    active = $(".slider ol li, .slider .controll"),
    controll = $(".slider .controll"),
    playpause = $(".playpause"),
    sliderTime = 1,
    sliderWait = 5000,
    i = 999,
    o,
    slideStart = $(".slider ul li:first"),
    autoRun,
    stop = false;
  // Reset
  slideStart.css("left", 0);

  function slideGSAP(parent) {
    "use strict";
    var str = parent.find(".slide p"),
      arr = str.text().split(" ");
    for (o = 0; o < arr.length; o++) {
      arr[o] = "<span>" + arr[o] + "</span>";
    }
    str.html(arr.join(" "));
    var tl = new TimelineLite();
    tl
      .set(parent.find(".slide"), {
        perspective: 400
      })

    .set(parent.find(".slide h2:first"), {
        x: 0,
        autoAlpha: 1
      })
      .set(parent.find(".slide h2:last"), {
        x: 0,
        autoAlpha: 1
      })
      .set(parent.find(".slide p span"), {
        cycle: {
          color: ["white", "white"]
        },
        opacity: 1,
        top: 0
      })
      .set(parent.find(".slide button:first"), {
        rotationY: 0,
        autoAlpha: 1
      })
      .set(parent.find(".slide button:last"), {
        rotationY: 0,
        autoAlpha: 1
      })
      .set(parent.find(".slide img"), {
        scale: 1,
        rotation: 1,
        borderRadius: 1,
        autoAlpha: 1
      })

    .from(parent.find(".slide h2:first"), 1.5, {
        x: -200,
        autoAlpha: 0
      })
      .from(parent.find(".slide h2:last"), 1.5, {
        x: 200,
        autoAlpha: 0
      }, 0)
      .staggerFrom(parent.find(".slide p span"), 1, {
        cycle: {
          color: ["red", "yellow"]
        },
        opacity: 0,
        position: 'relative',
        cycle: {
          top: [-80, -40]
        },
        left: 50
      }, 0.009, "-=1")
      .from(parent.find(".slide button:first"), 1, {
        rotationY: -360,
        autoAlpha: 0
      }, "-=1")
      .from(parent.find(".slide button:last"), 1, {
        rotationY: 360,
        autoAlpha: 0
      }, "-=1")
      .staggerFrom(parent.find(".slide img"), 1, {
        scale: 0,
        rotation: -180,
        borderRadius: 100,
        autoAlpha: 0
      }, 0.2, "-=0.5");
  }
  slideGSAP(slideStart);

  // Run Slider
  function runSlider(what) {
    what.addClass("active").siblings("li, span").removeClass("active");
  }
  // slider gsap
  function gsapSlider(whose, left) {
    i++;
    if (whose.hasClass("active")) {
      TweenMax.fromTo(
        ".slider ul li.active",
        sliderTime, {
          zIndex: i,
          left: left
        }, {
          left: 0
        }
      );
    }
  }
  // Active
  active.on("click", function() {
    runSlider($(this));
    slideGSAP($(this));
  });
  // Arrow left
  controll.first().on("click", function() {
    var slide = $(".slider ul li.active, .slider ol li.active").is(
        ":first-of-type"
      ) ?
      $(".slider ul li:last, .slider ol li:last") :
      $(".slider ul li.active, .slider ol li.active").prev("li");
    runSlider(slide);
    slideGSAP(slide);
    gsapSlider(slide, "100%");
  });
  // Arrow right
  controll.last().on("click", function() {
    var slide = $(".slider ul li.active, .slider ol li.active").is(
        ":last-of-type"
      ) ?
      $(".slider ul li:first, .slider ol li:first") :
      $(".slider ul li.active, .slider ol li.active").next("li");
    runSlider(slide);
    slideGSAP(slide);
    gsapSlider(slide, "-100%");
  });
  // Point
  $(".slider ol li").on("click", function() {
    var start = $(".slider ul li.active").index();
    var slide = $(".slider ul li").eq($(this).index());
    runSlider(slide);
    slideGSAP(slide);
    var end = $(".slider ul li.active").index();
    if (start > end) {
      gsapSlider(slide, "100%");
    }
    if (start < end) {
      gsapSlider(slide, "-100%");
    }
  });
  // Auto run slider
  function autoRunSlider() {
    if (body.css("direction") === "ltr" && stop === false) {
      autoRun = setInterval(function() {
        controll.last().click();
      }, sliderWait);
    } else if (body.css("direction") === "rtl" && stop === false) {
      autoRun = setInterval(function() {
        controll.first().click();
      }, sliderWait);
    }
  }
  autoRunSlider();
  // When hover
  active.on("mouseenter", function() {
    if (stop === false) {
      clearInterval(autoRun);
    }
  });
  active.on("mouseleave", function() {
    if (stop === false) {
      autoRunSlider();
    }
  });
  // play pause click
  playpause.on("click", function() {
    $(this).toggleClass("fa-play-circle-o fa-pause-circle-o");
    if (playpause.hasClass("fa-play-circle-o")) {
      stop = true;
      clearInterval(autoRun);
      $(this).attr('title', 'play');
    }
    if (playpause.hasClass("fa-pause-circle-o")) {
      stop = false;
      autoRunSlider();
      $(this).attr('title', 'pause');
    }
  });
});

// text design


$.fn.christmas = function() {
  $(this).each(function() {
    $(this).html($(this).text().split("").map(function(v, i) {
      return '<span class="christmas-' + (i % 2 == 0 ? 'gold' :
        'blue') + '">' + v + '</span>';
    }).join(""));
  });
};

$(function() { // don't forget $(document).ready!
  $('h1.christmas').christmas();
});

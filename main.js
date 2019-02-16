"use strict";
function main() {
  const state = {
    piecePosition: { x: 0, y: 0 },
    pauseGame: true,
    forward: true,
    gameFinished: false,
    timer: null,
    pattern: "snake"
  };

  function snakePattern() {
    $(".piece").css("transition", "all 0.5s linear");
    state.timer = setInterval(() => {
      if (!state.pauseGame) {
        if (state.piecePosition.y >= 375 && state.piecePosition.x <= 0) {
          state.pauseGame = true;
          clearInterval(state.timer);
          state.gameFinished = true;
          console.log("Won");
        } else if (state.piecePosition.x >= 375 && state.forward) {
          state.piecePosition.y += 125;
          state.forward = false;
        } else if (state.piecePosition.x <= 0 && !state.forward) {
          state.piecePosition.y += 125;
          state.forward = true;
        } else {
          state.piecePosition.x = state.forward
            ? state.piecePosition.x + 125
            : state.piecePosition.x - 125;
        }

        $(".piece").css("top", state.piecePosition.y);
        $(".piece").css("left", state.piecePosition.x);
      }
    }, 500);
  }

  function zigZagPattern() {
    $(".piece").css("transition", "all 0.3s linear");
    state.timer = setInterval(() => {
      if (!state.pauseGame) {
        if (state.piecePosition.y >= 375 && state.piecePosition.x >= 375) {
          state.pauseGame = true;
          clearInterval(state.timer);
          state.gameFinished = true;
          console.log("Won");
        } else if (state.piecePosition.x >= 375) {
          state.piecePosition.y += 125;
          state.piecePosition.x = 0;
        } else {
          state.piecePosition.x += 125;
        }

        $(".piece").css("top", state.piecePosition.y);
        $(".piece").css("left", state.piecePosition.x);
      }
    }, 500);
  }

  $(".button--green").on("click", function(e) {
    e.preventDefault();

    if (state.pauseGame && !state.gameFinished) {
      state.pauseGame = false;
      $(".pattern").css("display", "none");
      if (state.pattern === "snake") {
        snakePattern();
      } else {
        zigZagPattern();
      }
    }
  });
  $(".button--red").on("click", function(e) {
    e.preventDefault();
    if (!state.pauseGame && !state.gameFinished) {
      state.pauseGame = true;
      clearInterval(state.timer);
    }
  });

  $(".pattern").on("click", function() {
    const $radio = $("#pattern--radio");
    if ($radio.data("checked") === true) {
      $radio.prop("checked", false);
      $radio.data("checked", false);
      state.pattern = "zigzag";
    } else {
      $radio.data("checked", true);
      $radio.prop("checked", true);
      state.pattern = "snake";
    }
  });
}

window.onload = main;

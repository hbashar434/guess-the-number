var msg1 = document.getElementById("message1");
var msg2 = document.getElementById("message2");
var msg3 = document.getElementById("message3");

var answer = Math.floor(Math.random() * 100) + 1;
var no_of_guesses = 0;
var guessed_nums = [];

function handleKeyPress(event) {
  if (event.key === "Enter") {
    play();
  }
}

function play() {
  var user_guess = document.getElementById("guess").value;
  if (user_guess < 1 || user_guess > 100) {
    alert("Please enter a number between 1 and 100.");
  } else {
    guessed_nums.push(user_guess);
    no_of_guesses += 1;
    document.getElementById("guess").value = "";
    if (user_guess < answer) {
      msg1.textContent = "Your guess is too low.";
      msg2.textContent = "No. Of Guesses are Left: " + (10 - no_of_guesses);
      msg3.textContent = "Guessed numbers are: " + guessed_nums;
    } else if (user_guess > answer) {
      msg1.textContent = "Your guess is too high.";
      msg2.textContent = "No. Of Guesses are Left: " + (10 - no_of_guesses);
      msg3.textContent = "Guessed numbers are: " + guessed_nums;
    } else if (user_guess == answer) {
      msg1.textContent = "Yippie You Win!!";
      msg2.textContent = "The number was: " + answer;
      msg3.textContent = "You guessed it in " + no_of_guesses + " guesses";
      document.getElementById("my_btn").disabled = true;
      const fireworksContainer = document.getElementById("fireworks-container");
      fireworksContainer.style.display = "block";
      const container = document.querySelector(".fireworks");
      const fireworks = new Fireworks.default(container);
      fireworks.start();
      setTimeout(function () {
        Swal.fire({
          title: "Congratulations!",
          text: "You guessed the correct number!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Play Again",
          cancelButtonText: "Quit",
        }).then((result) => {
          if (result.isConfirmed) {
            fireworks.stop();
            location.reload();
          } else {
            window.close();
          }
        });
      }, 4000);
      return;
    }
    if (guessed_nums.length == 10) {
      Swal.fire({
        icon: "error",
        title: "Oops... You're Failed!",
        text: "You have reached the maximum number of guesses (10).",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Try Again",
        cancelButtonText: "Quit",
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        } else {
          window.close();
        }
      });
    }
  }
}

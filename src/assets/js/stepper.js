var  nextBtns = document.querySelectorAll(".btn-next");
var  progress = document.getElementById("progress");
var  formSteps = document.querySelectorAll(".form-step");
var  prevBtns = document.querySelectorAll(".btn-prev");
var  progressSteps = document.querySelectorAll(".progress-step");
var formStepsNum = 0;


function reset_stepper() {
  formStepsNum = 0;
  progressSteps.forEach((progressStep, idx) => {
      if (idx == 0) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });
  progress.style.width = 0 * 100 + "%";
    formSteps.forEach((formStep,idx) => {
     if (idx == 0) {
      formStep.classList.add("form-step-active");
    } else {
      formStep.classList.remove("form-step-active");
    }
  });
}


nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  var progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}
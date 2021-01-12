// CHỨA CÁC PHƯƠNG THỨC CHECK DATA FROM USER.
function Validation() {
  this.checkEmpty = function (inputVal, spanELE, message) {
    if (inputVal.trim() === "") {
      spanELE.innerHTML = message;
      spanELE.style.display = "block";
      return false;
    } else {
      spanELE.innerHTML = "";
      // spanELE.style.display = "none";
      return true;
    }
  };
  this.checkTK = function (inputVal, spanEle, message) {
    var reg = /^(?=.*[a-z])[a-z0-9]{4,6}$/;
    if (inputVal.match(reg)) {
      spanEle.innerHTML = "";
      // spanELE.style.display = "none";
      return true;
    } else {
      spanEle.innerHTML = message;
      // spanELE.style.display = "block";
      return false;
    }
  };

  this.checkName = function (inputVal, spanEle, message) {
    var reg = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
    if (inputVal.trim().match(reg)) {
      spanEle.innerHTML = "";
      // spanELE.style.display = "none";
      return true;
    } else {
      spanEle.innerHTML = message;
      // spanELE.style.display = "block";
      return false;
    }
  };

  this.checkEmail = function (inputVal, spanELE, message) {
    //Biểu thức Regular expression. /^ $/
    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //  match: hàm có sẵn của string giúp so sánh string và biểu thức
    if (inputVal.match(emailPattern)) {
      //Hợp lệ
      spanELE.innerHTML = "";
      // spanELE.style.display = "none";
      return true;
    } else {
      spanELE.innerHTML = message;
      // spanELE.style.display = "block";
      return false;
    }
  };

  this.checkFormartPass = function (inputVal, spanELE, message) {
    var passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

    if (inputVal.match(passFormat)) {
      //Hợp lê.
      spanELE.innerHTML = "";
      // spanELE.style.display = "none";
      return true;
    } else {
      //Không hợp lệ
      spanELE.innerHTML = message;
      // spanELE.style.display = "block";
      return false;
    }
  };

  this.checkDate = function (inputVal, spanELE, message) {
    var datePatern = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
    if (inputVal.match(datePatern)) {
      //Hợp lê.
      spanELE.innerHTML = "";
      // spanELE.style.display = "none";
      return true;
    } else {
      //Không hợp lệ
      spanELE.innerHTML = message;
      spanELE.style.display = "block";
      return false;
    }
  };

  this.checkSalary = function (inputVal, spanELE, message, min, max) {
    var reg = /^\d*$/;
    if (inputVal.match(reg) && inputVal >= min && inputVal <= max) {
      //hợp lệ
      spanELE.innerHTML = "";
      // spanELE.style.display = "none";
      return true;
    } else {
      //Không hợp lệ
      spanELE.innerHTML = message;
      // spanELE.style.display = "block";
      return false;
    }
  };

  this.checkDropdown = function (selectELE, spanELE, message) {
    //Chọn những đáp án không phải option đầu tiên
    if (selectELE.selectedIndex != 0) {
      //hợp lệ
      spanELE.innerHTML = "";
      // spanELE.style.display = "none";
      return true;
    } else {
      //Không hợp lệ
      spanELE.innerHTML = message;
      spanELE.style.display = "block";
      return false;
    }
  };
}

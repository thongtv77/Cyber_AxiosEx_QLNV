// CHỨA CÁC PHƯƠNG THỨC CHECK DATA FROM USER.

function Validation() {

    this.checkEmpty = function (inputVal, spanELE, message) {
        // trim() xóa dấu khoảng cách phía trước và sau của chuỗi
        if (inputVal.trim() === "") {
            // Ô bị để trống.
            //Dữ liệu không hợp lệ
            spanELE.innerHTML = message;
            spanELE.style.display = "block"
            return false;
        } else {
            spanELE.innerHTML = "";
            spanELE.style.display = "none"
            return true;
        }
    }

    // this.checkAccountNumber = function (inputVal, spanELE, message, mangNV) {
    //     //Duyệt mảng NV
    //     //some: duyệt mảng và trả về giá trị true-false.dựa vào điều kiện so sánh.
    //     //biến kiểm tra tên tài khoan có tồn tại hay không.
    //     var isExist = false;
    //     //item đại diện cho 1 NV
    //     isExist = mangNV.some(function (item) {
    //         return inputVal === item.maNV;
    //     });
    //     // nếu mã bị trùng.
    //     // isExist = true;
    //     if (isExist) {
    //         spanELE.innerHTML = message;
    //         //dữ liệu nhập vào không hợp lệ.
    //         return false;
    //     } else {
    //         spanELE.innerHTML = "";
    //         //dữ liệu hợp lệ
    //         return true;
    //     }
    // }

    this.checkLetters = function (inputVal, spanELE, message) {
        //RegExp là đối tượng tạo sẵn của JS giúp chuyển từ kiểu chuỗi (string) sang kiểu Regular expession(/^..&/)
        var letters = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
        // test pương thức của RegExp giúp so sánh giá trị có trùng với biểu thức hay không.
        if (letters.test(inputVal)) {
            //Hợp lệ
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.innerHTML = message;
            return false;
        }
    }

    this.checkEmail = function (inputVal, spanELE, message) {
        //Biểu thức Regular expression. /^ $/
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        //  match: hàm có sẵn của string giúp so sánh string và biểu thức
        if (inputVal.match(emailPattern)) {
            //Hợp lệ
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.innerHTML = message;
            return false;
        }
    }

    this.checkLength = function (inputVal, spanELE, message, min, max) {
        if (inputVal.length > min && inputVal.length <= max) {
            //Hợp lê.
            spanELE.innerHTML = "";
            return true;
        } else {
            //Không hợp lệ
            spanELE.innerHTML = message;
            return false
        }
    }

    this.checkFormartPass = function (inputVal, spanELE, message) {
        var passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

        if (inputVal.match(passFormat)) {
            //Hợp lê.
            spanELE.innerHTML = "";
            return true;
        } else {
            //Không hợp lệ
            spanELE.innerHTML = message;
            return false
        }
    }
    this.checkDate = function (inputVal, spanELE, message) {
        var datePatern = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        if (inputVal.match(datePatern)) {
            //Hợp lê.
            spanELE.innerHTML = "";
            return true;
        } else {
            //Không hợp lệ
            spanELE.innerHTML = message;
            return false
        }
    }
    this.checkDropdown = function (selectELE, spanELE, message) {
        //Chọn những đáp án không phải option đầu tiên(chọn khóa học)
        if (selectELE.selectedIndex != 0) {
            //hợp lệ
            spanELE.innerHTML = "";
            return true;
        } else {
            //Không hợp lệ
            spanELE.innerHTML = message;
            return false
        }
    }
    this.checkSalary = function (inputVal, spanELE, message) {
        var Salarypattern = /^(\d{1,2}(\.\d{1,2})?)$/;
        if (inputVal.match(Salarypattern)) {
            //hợp lệ
            spanELE.innerHTML = "";
            return true;
        } else {
            //Không hợp lệ
            spanELE.innerHTML = message;
            return false
        }
    }
    this.checkValue = function (inputVal, spanELE, message, min, max) {
        if (inputVal.value > min && inputVal.value <= max) {
            //Hợp lê.
            spanELE.innerHTML = "";
            return true;
        } else {
            //Không hợp lệ
            spanELE.innerHTML = message;
            return false
        }
    }
}
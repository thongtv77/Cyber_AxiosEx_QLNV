//Instance
var newStaffServices = new staffServices();
var validation = new Validation();

// Uti getDOM
function getELE(id) {
  return document.getElementById(id);
}
GetListStaff();
// Get data axios
function GetListStaff() {
  var promise = newStaffServices.getListStaffServices();
  promise
    .then(function (result) {
      console.log(result.data);
      showTable(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Show result
function showTable(nhanVienList) {
  var tbody = getELE("tableDanhSach");
  var content = "";
  nhanVienList.map(function (item) {
    content += `
            <tr>
                <td>${item.taiKhoan}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngayLam}</td>
                <td>${item.chucVu}</td>
                <td>${item.tongLuong}</td>
                <td>${item.loaiNV}</td>
                <td>

                    <button
                        class="btn btn-danger"
                        onclick="deleteStaff('${item.id}')">
                    <i class="fa fa-trash"></i>
                    </button>

                    <button
                        class="btn btn-info"
                        onclick="editStaff('${item.id}')"
                        data-toggle="modal"
                        data-target="#myModal">
                    <i class="fa fa-edit"></i>
                    </button>
                </td>
            </tr>
        `;
  });
  tbody.innerHTML = content;
}
// Add 2 button to Form Add Staff.
function getButtonAddStaff() {
  reset();
  var modalFooter = document.querySelector("#myModal .modal-footer");
  modalFooter.innerHTML = `
        <button
            id="btn-add"
            class="btn btn-success"
            onclick="addStaff()">
            Add
        </button>
        <button
              id="btnDong"
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              Close
            </button>
    `;
}
// Add Staff
function addStaff() {
  var taiKhoan = getELE("tknv").value;
  var hoTen = getELE("name").value;
  var email = getELE("email").value;
  var matKhau = getELE("password").value;
  var ngayLam = getELE("datepicker").value;
  var luongCB = getELE("luongCB").value;
  var chucVu = getELE("chucvu").value;
  var gioLam = getELE("gioLam").value;
  // Check Validation.
  var iSValid = true;
  // Check tên Tài Khoản.
  iSValid &=
    validation.checkEmpty(
      taiKhoan,
      getELE("tbTKNV"),
      "Tên tài khoản không được để trống!"
    ) &&
    validation.checkValue(
      taiKhoan,
      getELE("tbTKNV"),
      "Tên tài khoản tối đa 4-6 ký sô",
      4,
      6
    );

  // Check Name
  iSValid &=
    validation.checkEmpty(
      hoTen,
      getELE("tbTen"),
      "Tên Nhân Viên không được để trống!"
    ) &&
    validation.checkLetters(
      hoTen,
      getELE("tbTen"),
      "Tên Nhân Viên không hợp lệ"
    );

  //Check Email
  iSValid &=
    validation.checkEmpty(
      email,
      getELE("tbEmail"),
      "Email không được để trống!"
    ) && validation.checkEmail(email, getELE("tbEmail"), "Email không hợp lệ!");

  //check mật khẩu: không được để trống và có độ dài 6-10 ký tự và đúng format của mật khẩu(có ít nhất 1 chữ , 1 số, 1 ký tự đặc biệt)
  iSValid &=
    validation.checkEmpty(
      matKhau,
      getELE("tbMatKhau"),
      "Password không được để trống!"
    ) &&
    validation.checkLength(
      matKhau,
      getELE("tbMatKhau"),
      "Password có độ dài từ 6-10 ký tự!",
      6,
      10
    ) &&
    validation.checkFormartPass(
      matKhau,
      getELE("tbMatKhau"),
      "Password không hợp lệ"
    );

  //check ngày làm: kiểm tra có đúng theo format yyyy/dd/mm
  iSValid &= validation.checkDate(
    ngayLam,
    getELE("tbNgay"),
    "Ngày sinh không hợp lệ!"
  );

  //check lương Cơ bản
  iSValid &=
    validation.checkEmpty(
      luongCB,
      getELE("tbLuongCB"),
      "Lương cơ bản không được để trống!"
    ) &&
    validation.checkValue(
      luongCB,
      getELE("tbTKNV"),
      "Lương cơ bản 1 000 000 - 20 000 000",
      1000000,
      20000000
    );

  //check CHỨC VỤ:phải lựa chọn các option khác cái đầu tiên.
  iSValid &= validation.checkDropdown(
    getELE("chucvu"),
    getELE("tbChucVu"),
    "Hãy chọn đúng chức vụ nhé!"
  );

  //check Giờ Làm
  iSValid &=
    validation.checkEmpty(
      gioLam,
      getELE("tbGiolam"),
      "Giờ làm không được để trống!"
    ) &&
    validation.checkValue(
      gioLam,
      getELE("tbGiolam"),
      "Giờ làm từ 80 - 200 giờ",
      80,
      200
    );

  // iSValid = true;
  if (iSValid) {
    //Thể hiện của lớp đối tượng
    var nhanVien = new Staff(
      taiKhoan,
      hoTen,
      matKhau,
      email,
      ngayLam,
      luongCB,
      chucVu,
      gioLam
    );
    nhanVien.calcSalary();
    console.log(nhanVien);
    nhanVien.Classification();

    newStaffServices
      .AddStaffServices(nhanVien)
      .then(function (result) {
        console.log(result);
        GetListStaff();
      })
      .catch(function (error) {
        console.log(error);
      });
    reset();
    getEle("btn-add").setAttribute("data-dismiss", "modal");
  }
}
//reset
function reset() {
  getELE("formND").reset();
}
//Delete Staff
function deleteStaff(id) {
  newStaffServices
    .DeleteStaffServices(id)
    .then(function (result) {
      GetListStaff();
      alert("Xóa Thành Công");
    })
    .catch(function (error) {
      console.log(error);
    });
}
//Edit Staff
function editStaff(id) {
  //   var modalTitle = document.querySelector("#myModal .header-title");
  //   modalTitle.innerHTML = "Cập Nhật Thông Tin Nhân Viên";

  var modalFooter = document.querySelector("#myModal .modal-footer");
  modalFooter.innerHTML = `
        <button
            class="btn btn-success"
             onclick="updateNhanVien('${id}')">
             Update
        </button>
        <button
              id="btnDong"
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              Đóng
            </button>
    `;

  newStaffServices
    .GetDetailServices(id)
    .then(function (result) {
      console.log(result.data);
      getELE("tknv").value = result.data.taiKhoan;
      getELE("name").value = result.data.hoTen;
      getELE("password").value = result.data.matKhau;
      getELE("email").value = result.data.email;
      getELE("datepicker").value = result.data.ngayLam;
      getELE("luongCB").value = result.data.luongCB;
      getELE("chucvu").value = result.data.chucVu;
      getELE("gioLam").value = result.data.gioLam;
    })
    .catch(function (error) {
      console.log(error);
    });
}
//Update thông tin nhân Viên.
function updateNhanVien(id) {
  var taiKhoan = getELE("tknv").value;
  var hoTen = getELE("name").value;
  var email = getELE("email").value;
  var matKhau = getELE("password").value;
  var ngayLam = getELE("datepicker").value;
  var luongCB = getELE("luongCB").value;
  var chucVu = getELE("chucvu").value;
  var gioLam = getELE("gioLam").value;
  // Check Validation.
  var iSValid = true;
  // Check tên Tài Khoản.
  iSValid &=
    validation.checkEmpty(
      taiKhoan,
      getELE("tbTKNV"),
      "Tên tài khoản không được để trống!"
    ) &&
    validation.checkValue(
      taiKhoan,
      getELE("tbTKNV"),
      "Tên tài khoản tối đa 4-6 ký sô",
      4,
      6
    );

  // Check Name
  iSValid &=
    validation.checkEmpty(
      hoTen,
      getELE("tbTen"),
      "Tên Nhân Viên không được để trống!"
    ) &&
    validation.checkLetters(
      hoTen,
      getELE("tbTen"),
      "Tên Nhân Viên không hợp lệ"
    );

  //Check Email
  iSValid &=
    validation.checkEmpty(
      email,
      getELE("tbEmail"),
      "Email không được để trống!"
    ) && validation.checkEmail(email, getELE("tbEmail"), "Email không hợp lệ!");

  //check mật khẩu: không được để trống và có độ dài 6-10 ký tự và đúng format của mật khẩu(có ít nhất 1 chữ , 1 số, 1 ký tự đặc biệt)
  iSValid &=
    validation.checkEmpty(
      matKhau,
      getELE("tbMatKhau"),
      "Password không được để trống!"
    ) &&
    validation.checkLength(
      matKhau,
      getELE("tbMatKhau"),
      "Password có độ dài từ 6-10 ký tự!",
      6,
      10
    ) &&
    validation.checkFormartPass(
      matKhau,
      getELE("tbMatKhau"),
      "Password không hợp lệ"
    );

  //check ngày làm: kiểm tra có đúng theo format yyyy/dd/mm
  iSValid &= validation.checkDate(
    ngayLam,
    getELE("tbNgay"),
    "Ngày sinh không hợp lệ!"
  );

  //check lương Cơ bản
  iSValid &=
    validation.checkEmpty(
      luongCB,
      getELE("tbLuongCB"),
      "Lương cơ bản không được để trống!"
    ) &&
    validation.checkValue(
      luongCB,
      getELE("tbTKNV"),
      "Lương cơ bản 1 000 000 - 20 000 000",
      1000000,
      20000000
    );

  //check CHỨC VỤ:phải lựa chọn các option khác cái đầu tiên.
  iSValid &= validation.checkDropdown(
    getELE("chucvu"),
    getELE("tbChucVu"),
    "Hãy chọn đúng chức vụ nhé!"
  );

  //check Giờ Làm
  iSValid &=
    validation.checkEmpty(
      gioLam,
      getELE("tbGiolam"),
      "Giờ làm không được để trống!"
    ) &&
    validation.checkValue(
      gioLam,
      getELE("tbGiolam"),
      "Giờ làm từ 80 - 200 giờ",
      80,
      200
    );

  // iSValid = true;
  if (iSValid) {
    //Thể hiện của lớp đối tượng
    var nhanVien = new Staff(
      taiKhoan,
      hoTen,
      matKhau,
      email,
      ngayLam,
      luongCB,
      chucVu,
      gioLam
    );
    nhanVien.calcSalary();
    console.log(nhanVien);
    nhanVien.Classification();
    newStaffServices
      .UpdateInfroServices(nhanVien, id)
      .then(function (result) {
        console.log(reset);
        GetListStaff();
      })
      .catch(function (error) {
        console.log(error);
      });
    reset();
    getEle("btn-update").setAttribute("data-dismiss", "modal");
  }
}

//Instance
var newStaff = new staffServices();
var validation = new Validation();
// Function getDOM.
function getELE(id) {
    return document.getElementById(id);
}
GetListStaff();
// Function---GetListStaff
function GetListStaff() {
    var promise = newStaff.getListStaffServices();
    promise.then(function (result) {
        // Nếu thành công.
        // result chứa nhiều thuộc tính nên cần gọi đến data để lấy dữ liệu từ BE.
        console.log(result.data);
        showTable(result.data);
    })
        .catch(function (error) {
            //Nếu thất bại.
            console.log(error);
        });
}
// Function showTable__1
function showTable(mangDS) {
    var tbody = getELE("tableDanhSach");
    var content = "";
    mangDS.map(function (item) {
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
                    <button class="btn btn-danger" onclick="deleteStaff('${item.id}')">DELETE</button>
                    <button class="btn btn-info" onclick="editStaff('${item.id}')" data-toggle="modal" data-target="#myModal">EDIT</button>
                </td>             
            </tr>
        `;
    });
    tbody.innerHTML = content;
}

function getInfroFromUser() {
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
    // Kiểm tra tài khoản__CheckEmpty__CheckLength
    iSValid &= validation.checkEmpty(taiKhoan, getELE("tbTKNV"), "Tên tài khoản không được để trống!") && validation.checkValue(taiKhoan, getELE("tbTKNV"), "Tên tài khoản tối đa 4-6 ký sô", 4, 6);

    // Ten NV không được để trống và tên phải là chữ
    iSValid &= validation.checkEmpty(hoTen, getELE("tbTen"), "Tên NV không được để trống!") && validation.checkLetters(hoTen, getELE("tbTen"), "Tên NV không hợp lệ");

    //Email phải đúng format
    iSValid &= validation.checkEmpty(email, getELE("tbEmail"), "Email không được để trống!") && validation.checkEmail(email, getELE("tbEmail"), "Email không hợp lệ!");

    //check mật khẩu: không được để trống và có độ dài 6-10 ký tự và đúng format của mật khẩu(có ít nhất 1 chữ , 1 số, 1 ký tự đặc biệt)
    iSValid &= validation.checkEmpty(matKhau, getELE("password"), "Password không được để trống!") && validation.checkLength(matKhau, getELE("password"), "Password có độ dài từ 6-10 ký tự!", 6, 10) && validation.checkFormartPass(matKhau, getELE("password"), "Password không hợp lệ");

    //check ngày làm: kiểm tra có đúng theo format yyyy/dd/mm
    iSValid &= validation.checkDate(ngayLam, getELE("tbNgay"), "Ngày sinh không hợp lệ!");

    //check lương Cơ bản
    iSValid &= validation.checkEmpty(luongCB, getELE("tbLuongCB"), "Lương cơ bản không được để trống!") && validation.checkValue(luongCB, getELE("tbTKNV"), "Lương cơ bản 1 000 000 - 20 000 000", 1000000, 20000000);

    //check CHỨC VỤ:phải lựa chọn các option khác cái đầu tiên.
    iSValid &= validation.checkDropdown(getELE("chucvu"), getELE("tbChucVu"), "Hãy chọn đúng chức vụ nhé!");

    //check Giờ Làm
    iSValid &= validation.checkEmpty(gioLam, getELE("tbGiolam"), "Giờ làm không được để trống!") && validation.checkValue(gioLam, getELE("tbGiolam"), "Giờ làm từ 80 - 200 giờ", 80, 200);

    // iSValid = true;
    if (iSValid) {
        //Thể hiện của lớp đối tượng 
        var nhanVien = new Staff(taiKhoan, hoTen, matKhau, email, ngayLam, luongCB, chucVu, gioLam);
        nhanVien.calcSalary(nhanVien.chucVu, nhanVien.luongCB);
        nhanVien.Classification(nhanVien.gioLam);
        return nhanVien;
    } else {
        return false;
    }
}
getELE("btnThemNV").addEventListener("click", function () {
    addStaff();
});
function addStaff() {
    var newNhanVien = getInfroFromUser();
    newStaff.AddStaffServices(newNhanVien)
        .then(function (result) {
            console.log(result);
            //Nếu thêm thành công thì load lại danh sách người dùng.
            GetListStaff();
            // getELE("btnDong").click();
        })
        .catch(function (error) {
            console.log(error);
        })

}
//Function Delete Staff__1.1
function deleteStaff(id) {
    newStaff.DeleteStaffServices(id)
        .then(function (result) {
            //Nếu xóa thành công thì load lại danh sách người dùng.
            GetListStaff();
            alert("Xóa Thành Công");
        })
        .catch(function (error) {
            console.log(error);
        })
}
//Function Edit Staff__1.2
function editStaff(id) {
    var modalTitle = document.querySelector("#myModal .modal-title");
    modalTitle.innerHTML = "Cập Nhật Thông Tin Nhân Viên";

    var modalFooter = document.querySelector("#myModal .modal-footer");
    modalFooter.innerHTML = `
        <button class="btn btn-success" onclick="updateNhanVien('${id}')">Cập Nhật</button>
    `;
    newStaff.GetDetailServices(id)
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
        })
}
//Function Update thông tin nhân Viên.
function updateNhanVien(id) {
    var newNhanVien = getInfroFromUser();
    newStaff.UpdateInfroServices(newNhanVien, id)
        .then(function (result) {
            GetListStaff();
            document.querySelector("#myModal .close").click();
            getELE("#formND").reset();
        })
        .catch(function (error) {
            console.log(error);
        })
}

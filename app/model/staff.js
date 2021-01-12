//class Người Dùng(user).

function Staff(
  _taiKhoan,
  _hoTen,
  _matKhau,
  _email,
  _ngayLam,
  _luongCB,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.matKhau = _matKhau;
  this.email = _email;
  this.ngayLam = _ngayLam;
  this.luongCB = _luongCB;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = _luongCB;
  this.loaiNV = "Xuất Sắc";

  //Phương tính lương
  this.calcSalary = function () {
    switch (this.chucVu) {
      case "Sếp":
        this.tongLuong = this.luongCB * 3;
        break;
      case "Trưởng phòng":
        this.tongLuong = this.luongCB * 2;
        break;
      case "Nhân viên":
        this.tongLuong = this.luongCB;
        break;
    }
  };
  //Phương thức xếp loại nhân viên
  this.Classification = function () {
    if (this.gioLam < 160) this.loaiNV = "Trung Bình";
    else if (this.gioLam < 176) this.loaiNV = "Khá";
    else if (this.gioLam < 192) this.loaiNV = "Giỏi";
  };
}

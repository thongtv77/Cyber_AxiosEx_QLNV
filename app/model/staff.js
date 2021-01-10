//class Người Dùng(user).

function Staff(_taiKhoan, _hoTen, _matKhau, _email, _ngayLam, _luongCB, _chucVu, _gioLam, _tongLuong, _loaiNV) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.matKhau = _matKhau;
    this.email = _email;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.loaiNV = "";
    //Phương tính lương
    this.calcSalary = function (chucVuNhanVien, luongCBNhanVien) {
        var chucVuNhanVien = document.getElementById("chucvu").value;
        console.log(chucVuNhanVien)
        this.tongLuong = 0;
        switch (chucVuNhanVien) {
            case "Sếp":
                this.tongLuong = luongCBNhanVien * 3;
                break;
            case "Trưởng phòng":
                this.tongLuong = luongCBNhanVien * 2;
                break;
            default:
                this.tongLuong = luongCBNhanVien * 1;
        }
        return tongLuong;
    }
    //Phương thức xếp loại nhân viên
    this.Classification = function (hours) {
        if (hours >= 192) {
            this.loaiNV = "Nhân Viên Xuất Sắc";
        } else if (hours >= 176) {
            this.loaiNV = "Nhân Viên Giỏi";
        } else if (hours >= 160) {
            this.loaiNV = "Nhân Viên Khá";
        } else {
            this.loaiNV = "Nhân Viên Trung Bình";
        }
    }

}
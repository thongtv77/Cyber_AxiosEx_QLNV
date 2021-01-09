/**
 * Lớp đối tượng chứa các phương thức giao tiếp với API.
 */
function staffServices() {
    //GetListUser--
    this.getListStaffServices = function () {
        var promise = axios({
            method: 'get',
            url: 'https://5fd203eeb485ea0016eef2f1.mockapi.io/NhanVienAPI',
        });
        return promise;
    }
    //Add
    this.AddStaffServices = function (nhanVien) {
        var promise = axios({
            method: 'post',
            url: 'https://5fd203eeb485ea0016eef2f1.mockapi.io/NhanVienAPI',
            data: nhanVien
        });
        return promise;
    }
    //Delete
    this.DeleteStaffServices = function (id) {
        var promise = axios({
            method: 'delete',
            url: `https://5fd203eeb485ea0016eef2f1.mockapi.io/NhanVienAPI/${id}`
        });
        return promise;
    }
    // Get Detail
    this.GetDetailServices = function (id) {
        var promise = axios({
            method: 'get',
            url: `https://5fd203eeb485ea0016eef2f1.mockapi.io/NhanVienAPI/${id}`
        });
        return promise;
    }
    // Update information
    this.UpdateInfroServices = function (nhanVien, id) {
        var promise = axios({
            method: 'put',
            url: `https://5fd203eeb485ea0016eef2f1.mockapi.io/NhanVienAPI/${id}`,
            data: nhanVien
        });
        return promise;
    }
}


// =================================================================
// LẤY CÁC PHẦN TỬ TỪ HTML (ĐÃ CẬP NHẬT THEO ID CỦA BẠN)
// =================================================================
const manHinhChonCheDo = document.getElementById('man-hinh-chon-che-do');
const manHinhChoiGame = document.getElementById('man-hinh-choi-game');
const manHinhKetThuc = document.getElementById('man-hinh-ket-thuc');
const modalKetQuaVong = document.getElementById('modal-ket-qua-vong');

// Nút bấm
const nutChoiVoiMay = document.getElementById('nut-choi-voi-may');
const nutChoiLaiKetThuc = document.getElementById('nut-choi-lai-ket-thuc');
const nutVanTiepTheo = document.getElementById('nut-van-tiep-theo');

// Hiển thị điểm số và kết quả
const diemSoNguoiChoiHienThi = document.getElementById('diem-so-nguoi-choi');
const diemSoDoiThuHienThi = document.getElementById('diem-so-doi-thu');
const ketQuaModalText = document.getElementById('chu-de-ket-qua');
const diemSoCuoiCungNguoiChoi = document.getElementById('diem-so-cuoi-cung-nguoi-choi');
const diemSoCuoiCungDoiThu = document.getElementById('diem-so-cuoi-cung-doi-thu');

// Các lựa chọn trong game
const cacLuaChon = document.querySelectorAll('.lua-chon');
const hinhAnhLuaChonDoiThu = document.getElementById('lua-chon-cua-doi-thu');
const dongHoDem = document.getElementById('thoi-gian-dem');

// =================================================================
// CÁC BIẾN TRẠNG THÁI GAME
// =================================================================
let diemSoNguoiChoi = 0;
let diemSoDoiThu = 0;
const soVongDau = 5; // Có thể thay đổi số vòng đấu tại đây
let vongDauHienTai = 0;

let luaChonNguoiChoi = '';
let dangChoi = false;
let demNguocInterval;

// =================================================================
// CÁC HÀM QUẢN LÝ GIAO DIỆN (UI)
// =================================================================
function hienManHinh(manHinh) {
    document.querySelectorAll('.man-hinh').forEach(s => s.classList.remove('hoat-dong'));
    manHinh.classList.add('hoat-dong');
}

function anModal(modal) {
    modal.classList.remove('hoat-dong');
}

function hienModal(modal) {
    modal.classList.add('hoat-dong');
}

// =================================================================
// LOGIC CỐT LÕI CỦA GAME
// =================================================================

// Đặt lại giao diện cho vòng mới
function datLaiGiaoDienVongMoi() {
    cacLuaChon.forEach(luaChon => {
        // Loại bỏ class 'doi-thu' để không ảnh hưởng đến lựa chọn của đối thủ
        if (!luaChon.id.includes('doi-thu')) {
             luaChon.classList.remove('duoc-chon', 'lam-mo', 'nguoi-thang');
        }
    });
    hinhAnhLuaChonDoiThu.src = 'assets/img/hoi-cham.png';
    dongHoDem.textContent = '3';
    dangChoi = true;
}


// Máy chọn ngẫu nhiên
function mayChonNgauNhien() {
    const luaChon = ['keo', 'bua', 'bao'];
    const soNgauNhien = Math.floor(Math.random() * luaChon.length);
    return luaChon[soNgauNhien];
}

// So sánh và xác định người thắng
function xacDinhNguoiThang(nguoi, may) {
    if (nguoi === may) {
        return 'hoa';
    }
    if (
        (nguoi === 'bua' && may === 'keo') ||
        (nguoi === 'keo' && may === 'bao') ||
        (nguoi === 'bao' && may === 'bua')
    ) {
        return 'thang';
    }
    return 'thua';
}

// Cập nhật điểm số lên giao diện
function capNhatDiemSo(ketQua) {
    if (ketQua === 'thang') {
        diemSoNguoiChoi++;
    } else if (ketQua === 'thua') {
        diemSoDoiThu++;
    }
    diemSoNguoiChoiHienThi.textContent = diemSoNguoiChoi;
    diemSoDoiThuHienThi.textContent = diemSoDoiThu;
}

// Hiển thị kết quả trong Modal
function hienThiKetQuaVong(ketQua) {
    const thongBao = {
        thang: 'Bạn Thắng!',
        thua: 'Bạn Thua!',
        hoa: 'Hòa!'
    };
    ketQuaModalText.textContent = thongBao[ketQua];
    hienModal(modalKetQuaVong);
}

// Bắt đầu đồng hồ đếm ngược
function batDauDemNguoc() {
    let thoiGianConLai = 2; // Bắt đầu đếm từ 2
    dongHoDem.textContent = 3;

    demNguocInterval = setInterval(() => {
        dongHoDem.textContent = thoiGianConLai;
        if (thoiGianConLai <= 0) {
            clearInterval(demNguocInterval);
            ketThucVongDau();
        }
        thoiGianConLai--;
    }, 1000);
}

// Kiểm tra và kết thúc trận đấu nếu đủ số vòng
function kiemTraKetThucTranDau() {
    vongDauHienTai++;
    if (vongDauHienTai >= soVongDau) {
        hienManHinh(manHinhKetThuc);
        diemSoCuoiCungNguoiChoi.textContent = diemSoNguoiChoi;
        diemSoCuoiCungDoiThu.textContent = diemSoDoiThu;
        return true; // Trận đấu đã kết thúc
    }
    return false; // Trận đấu vẫn tiếp tục
}


// Xử lý logic khi một vòng đấu kết thúc
function ketThucVongDau() {
    const luaChonCuaMay = mayChonNgauNhien();
    
    // Cập nhật hình ảnh lựa chọn của máy
    hinhAnhLuaChonDoiThu.src = `assets/img/${luaChonCuaMay}.png`;

    const ketQua = xacDinhNguoiThang(luaChonNguoiChoi, luaChonCuaMay);
    capNhatDiemSo(ketQua);
    
    // Hiệu ứng viền sáng cho người thắng
    if (ketQua === 'thang') {
        document.getElementById(luaChonNguoiChoi).classList.add('nguoi-thang');
    }
    
    // Hiển thị modal sau một khoảng trễ ngắn
    setTimeout(() => {
        hienThiKetQuaVong(ketQua);
    }, 1000);
}

// Xử lý khi người chơi chọn
function xuLyKhiNguoiChoiChon(luaChonId) {
    if (!dangChoi) return;

    dangChoi = false; // Ngăn người dùng chọn lại
    luaChonNguoiChoi = luaChonId;

    // Hiệu ứng mờ và sáng
    cacLuaChon.forEach(lc => {
        // Chỉ áp dụng hiệu ứng cho các lựa chọn của người chơi
        if (lc.id !== 'doi-thu') { 
            if (lc.id === luaChonId) {
                lc.classList.add('duoc-chon');
                lc.classList.remove('lam-mo');
            } else {
                lc.classList.add('lam-mo');
                lc.classList.remove('duoc-chon');
            }
        }
    });

    batDauDemNguoc();
}


// =================================================================
// GẮN CÁC SỰ KIỆN VÀO NÚT BẤM
// =================================================================
nutChoiVoiMay.addEventListener('click', () => {
    hienManHinh(manHinhChoiGame);
    // Reset toàn bộ game
    vongDauHienTai = 0;
    diemSoNguoiChoi = 0;
    diemSoDoiThu = 0;
    diemSoNguoiChoiHienThi.textContent = 0;
    diemSoDoiThuHienThi.textContent = 0;
    datLaiGiaoDienVongMoi();
});

nutChoiLaiKetThuc.addEventListener('click', () => {
    // Quay về màn hình chính, không cần reset vì khi bấm "Chơi với máy" sẽ reset
    hienManHinh(manHinhChonCheDo);
});

cacLuaChon.forEach(luaChon => {
    // Đảm bảo không gắn sự kiện click cho div của đối thủ
    if (luaChon.id !== 'doi-thu') {
        luaChon.addEventListener('click', () => {
            xuLyKhiNguoiChoiChon(luaChon.id);
        });
    }
});

nutVanTiepTheo.addEventListener('click', () => {
    anModal(modalKetQuaVong);
    if (!kiemTraKetThucTranDau()) {
        datLaiGiaoDienVongMoi();
    }
});

// =================================================================
// KHỞI TẠO BAN ĐẦU
// =================================================================
hienManHinh(manHinhChonCheDo);
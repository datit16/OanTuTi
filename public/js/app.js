// =================================================================
// LẤY CÁC PHẦN TỬ TỪ HTML
// =================================================================
const manHinhChonCheDo = document.getElementById('man-hinh-chon-che-do');
const manHinhDatTen = document.getElementById('man-hinh-dat-ten'); // MỚI
const manHinhChoiGame = document.getElementById('man-hinh-choi-game');
const manHinhKetThuc = document.getElementById('man-hinh-ket-thuc');
const modalKetQuaVong = document.getElementById('modal-ket-qua-vong');

// Nút bấm
const nutChoiVoiMay = document.getElementById('nut-choi-voi-may');
const nutBatDauChoi = document.getElementById('nut-bat-dau-choi'); // MỚI
const nutChoiLaiKetThuc = document.getElementById('nut-choi-lai-ket-thuc');
const nutVanTiepTheo = document.getElementById('nut-van-tiep-theo');

// Hiển thị điểm số, kết quả và tên
const hienThiTenNguoiChoi = document.getElementById('hien-thi-ten-nguoi-choi'); // MỚI
const inputTenNguoiChoi = document.getElementById('input-ten-nguoi-choi'); // MỚI
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
let tenNguoiChoi = "Bạn"; // MỚI: Biến lưu tên người chơi
let diemSoNguoiChoi = 0;
let diemSoDoiThu = 0;
const soVongDau = 5; 
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
    if (nguoi === may) return 'hoa';
    if ((nguoi === 'bua' && may === 'keo') || (nguoi === 'keo' && may === 'bao') || (nguoi === 'bao' && may === 'bua')) {
        return 'thang';
    }
    return 'thua';
}

// Cập nhật điểm số lên giao diện
function capNhatDiemSo(ketQua) {
    if (ketQua === 'thang') diemSoNguoiChoi++;
    else if (ketQua === 'thua') diemSoDoiThu++;
    diemSoNguoiChoiHienThi.textContent = diemSoNguoiChoi;
    diemSoDoiThuHienThi.textContent = diemSoDoiThu;
}

// Hiển thị kết quả trong Modal
function hienThiKetQuaVong(ketQua) {
    const thongBao = { thang: 'Bạn Thắng!', thua: 'Bạn Thua!', hoa: 'Hòa!' };
    ketQuaModalText.textContent = thongBao[ketQua];
    hienModal(modalKetQuaVong);
}

// Bắt đầu đồng hồ đếm ngược
function batDauDemNguoc() {
    let thoiGianConLai = 2; 
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
        return true; 
    }
    return false;
}

// Xử lý logic khi một vòng đấu kết thúc
function ketThucVongDau() {
    const luaChonCuaMay = mayChonNgauNhien();
    hinhAnhLuaChonDoiThu.src = `assets/img/${luaChonCuaMay}.png`;
    const ketQua = xacDinhNguoiThang(luaChonNguoiChoi, luaChonCuaMay);
    capNhatDiemSo(ketQua);
    if (ketQua === 'thang') {
        document.getElementById(luaChonNguoiChoi).classList.add('nguoi-thang');
    }
    setTimeout(() => { hienThiKetQuaVong(ketQua); }, 1000);
}

// Xử lý khi người chơi chọn
function xuLyKhiNguoiChoiChon(luaChonId) {
    if (!dangChoi) return;
    dangChoi = false; 
    luaChonNguoiChoi = luaChonId;
    cacLuaChon.forEach(lc => {
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

// 1. Khi người chơi chọn chế độ "Chơi với máy"
nutChoiVoiMay.addEventListener('click', () => {
    // Chuyển sang màn hình đặt tên thay vì màn hình chơi game
    hienManHinh(manHinhDatTen);
});

// 2. Khi người chơi nhập tên xong và nhấn "Bắt đầu"
nutBatDauChoi.addEventListener('click', () => {
    // Lấy tên từ ô input, nếu trống thì dùng tên mặc định
    const tenNhapVao = inputTenNguoiChoi.value.trim();
    tenNguoiChoi = tenNhapVao || "Bạn";

    // Cập nhật tên lên giao diện màn hình chơi game
    hienThiTenNguoiChoi.textContent = tenNguoiChoi;

    // Chuyển đến màn hình chơi game
    hienManHinh(manHinhChoiGame);

    // Reset toàn bộ game để bắt đầu ván mới
    vongDauHienTai = 0;
    diemSoNguoiChoi = 0;
    diemSoDoiThu = 0;
    diemSoNguoiChoiHienThi.textContent = 0;
    diemSoDoiThuHienThi.textContent = 0;
    datLaiGiaoDienVongMoi();
});


nutChoiLaiKetThuc.addEventListener('click', () => {
    // Quay về màn hình chọn chế độ ban đầu
    hienManHinh(manHinhChonCheDo);
});

cacLuaChon.forEach(luaChon => {
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
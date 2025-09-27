// js/che-do-bat-bai.js
(function() {
  const TEN_BI_MAT = "dat"; // ← đổi thành tên bí mật của bạn
  let batBaiMode = false;

  document.addEventListener("DOMContentLoaded", () => {
    const nutBatDau = document.getElementById("nut-bat-dau-choi");
    if (!nutBatDau) return;

    nutBatDau.addEventListener("click", () => {
      const tenNguoiChoi = document
        .getElementById("input-ten-nguoi-choi")
        .value.trim();

      if (tenNguoiChoi.toLowerCase() === TEN_BI_MAT) {
        batBaiMode = true;
        console.log("✨ Chế độ bất bại đã bật cho:", tenNguoiChoi);
      } else {
        batBaiMode = false;
      }
    });
  });

  // Lưu lại hàm gốc
  const mayChonNgauNhien_Goc = window.mayChonNgauNhien;

  // Ghi đè
  window.mayChonNgauNhien = function() {
    if (batBaiMode) {
      console.log("Máy sẽ chọn để thua bạn!");
      
      // Kiểm tra xem người chơi đã chọn gì
        if (luaChonNguoiChoi === 'bua') {
            return 'keo'; // Nếu bạn chọn Búa, máy sẽ ra Kéo
        }
        if (luaChonNguoiChoi === 'keo') {
            return 'bao'; // Nếu bạn chọn Kéo, máy sẽ ra Bao
        }
        if (luaChonNguoiChoi === 'bao') {
            return 'bua'; // Nếu bạn chọn Bao, máy sẽ ra Búa
        }

        // Trường hợp dự phòng nếu bạn chưa chọn
        return 'keo'; 
    }

    // Nếu không bật hack → chạy random bình thường
    return mayChonNgauNhien_Goc();
  };
})();

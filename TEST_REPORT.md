# Báo cáo kiểm thử — Hồ Sơ Dị Thể

## Kết quả đã quan sát

Bộ kiểm thử khói được chạy trong Chromium với khung nhìn desktop `1440×1000` và khung nhìn hẹp `390×844`. Mã được nhúng vào trang kiểm thử cô lập để chạy được trong môi trường hiện tại. Các kết quả sau đã đạt:

- [x] JavaScript vượt qua `node --check app.js`.
- [x] CSS đã được nạp; biến nền dark-fantasy và nền trang được áp dụng.
- [x] Lần khởi tạo hiển thị đủ 10 hồ sơ mẫu; thanh đối chiếu ẩn khi chưa chọn hồ sơ.
- [x] Lọc khu vực Việt Nam trả về 2 hồ sơ; lọc thể loại và lọc riêng theo văn hóa/truyền thống trả về kết quả phù hợp.
- [x] Sắp xếp tên A–Z cho kết quả đầu tiên là Baba Yaga.
- [x] Tìm `mắt đỏ` tìm được Mothman; từ khóa không khớp hiển thị trạng thái rỗng.
- [x] Đánh dấu yêu thích cập nhật danh sách và bộ đếm điều hướng.
- [x] Chọn để đối chiếu hiển thị bảng so sánh; giới hạn tối đa 4 hồ sơ được thực thi.
- [x] Trang chi tiết Ma Da hiển thị lưu ý khi không có nguồn tham khảo được gắn.
- [x] Tạo, sửa và xóa một hồ sơ thử nghiệm; mục dữ liệu được cập nhật theo thao tác.
- [x] Nhập JSON hợp lệ thành công; JSON sai cú pháp và URL ảnh `javascript:` bị từ chối, dữ liệu hiện có không bị thay đổi bởi lần nhập không hợp lệ.
- [x] Nút xuất tạo tệp `ho-so-di-the-2026-10-29.json`.
- [x] Ở khung nhìn rộng 390 px, nút menu hiển thị, ngăn điều hướng mở được và không phát hiện tràn ngang tài liệu.
- [x] Nạp dữ liệu đã lưu trong fixture khởi động không ghi đè bản ghi người dùng bằng bộ mẫu; yêu thích của fixture vẫn xuất hiện.
- [x] Không ghi nhận lỗi JavaScript không xử lý trong lượt kiểm thử.

## Giới hạn kiểm thử cần biết

Môi trường chạy này chặn điều hướng tự động tới `localhost` và `file://`. Vì vậy, các tương tác đã được kiểm tra trong một trang Chromium cô lập với **bộ thay thế `localStorage` trong bộ nhớ**, thay vì hồ sơ trình duyệt thật. Điều này kiểm tra đường đi đọc/ghi trạng thái của ứng dụng, nhưng **không được xem là xác nhận độc lập về khả năng giữ dữ liệu sau khi đóng/mở lại trình duyệt thật**. README cung cấp bước chạy qua `python -m http.server`; nên thực hiện lại bài kiểm tra lưu yêu thích → tải lại trang trên máy đích.

Chưa chạy kiểm thử tự động trên Firefox, Safari hoặc thiết bị di động vật lý. Nguồn bên ngoài có thể thay đổi hoặc ngừng hoạt động; người dùng nên mở từng liên kết tại hồ sơ để kiểm tra ngữ cảnh. Các minh họa SVG là hình vẽ nguyên bản để minh họa, không phải ảnh chứng minh thực thể tồn tại.

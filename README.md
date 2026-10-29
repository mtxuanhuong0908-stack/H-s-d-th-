# Hồ Sơ Dị Thể

Ứng dụng wiki/database kinh dị chạy hoàn toàn trên trình duyệt. Không cần tài khoản, backend, API key, package manager hay thư viện JavaScript ngoài.

## Tính năng

- Thư viện hồ sơ với dữ liệu mẫu về nhân vật hư cấu hiện đại, truyền thuyết dân gian, thần thoại/văn học và sinh vật huyền bí.
- Tìm kiếm theo tên, bí danh, từ khóa, nguồn gốc, đặc điểm, năng lực được kể lại và môi trường xuất hiện.
- Lọc theo phân loại, khu vực, văn hóa/truyền thống và thể loại; sắp xếp theo mức độ phổ biến, tên hoặc ngày cập nhật.
- Trang chi tiết có đặc điểm, năng lực được mô tả, môi trường xuất hiện, câu chuyện, giới hạn kiểm chứng, từ khóa và nguồn tham khảo.
- So sánh tối đa 4 hồ sơ theo cùng các trường dữ liệu.
- Yêu thích và lịch sử khám phá lưu trong `localStorage`.
- Thêm, sửa, xóa hồ sơ; xác nhận trước khi xóa; dữ liệu lưu cục bộ.
- Xuất/nhập JSON; kiểm tra cấu trúc, mã hồ sơ trùng, đường dẫn ảnh và nguồn HTTPS trước khi lưu.
- Thiết kế responsive, hỗ trợ bàn phím cơ bản và tôn trọng `prefers-reduced-motion`.
- 10 minh họa SVG nguyên bản trong `assets/`, không phải ảnh chụp hay bằng chứng về thực thể có thật.

## Cấu trúc thư mục

```text
ho-so-di-the/
├── index.html            # Khung ứng dụng và điều hướng
├── styles.css            # Giao diện dark fantasy, responsive
├── app.js                # Dữ liệu mẫu, state, tìm kiếm, CRUD, import/export
├── README.md             # Hướng dẫn chạy và triển khai
├── TEST_REPORT.md        # Kiểm thử đã chạy và giới hạn
├── LICENSE               # MIT License
└── assets/
    ├── favicon.svg
    ├── slender-man.svg
    ├── siren-head.svg
    ├── wendigo.svg
    ├── mothman.svg
    ├── cthulhu.svg
    ├── ma-da.svg
    ├── quy-nhap-trang.svg
    ├── baba-yaga.svg
    ├── la-llorona.svg
    └── chupacabra.svg
```

## Chạy trên máy tính

### Cách 1 — mở trực tiếp (chỉ để xem nhanh)

Có thể mở `index.html` bằng trình duyệt hiện đại để xem giao diện. Tuy nhiên, hành vi `localStorage` và tải tệp qua địa chỉ `file://` có thể khác nhau giữa các trình duyệt. Để kiểm tra đầy đủ lưu trữ, nhập/xuất JSON và điều hướng, nên dùng máy chủ tĩnh cục bộ ở cách 2.

### Cách 2 — máy chủ tĩnh cục bộ (khuyến nghị)

Cần Python 3 cài sẵn, không phải cài thư viện.

Windows: mở Command Prompt/PowerShell trong thư mục `ho-so-di-the`, chạy:

```powershell
py -m http.server 8000
```

macOS/Linux:

```bash
python3 -m http.server 8000
```

Mở `http://localhost:8000` trong trình duyệt. Dừng server bằng `Ctrl+C`.

## Triển khai miễn phí lên GitHub Pages

1. Tạo repository GitHub mới và tải lên toàn bộ tệp/thư mục của dự án.
2. Vào **Settings → Pages**.
3. Chọn nguồn triển khai từ nhánh mặc định (thường là `main`) và thư mục `/ (root)`.
4. Lưu thiết lập; đợi GitHub Pages hoàn tất build, sau đó mở URL được cung cấp trong trang Pages.
5. Vì đây là ứng dụng tĩnh không dùng routing phía máy chủ, các đường dẫn nội bộ dùng hash như `#/entity/slender-man` nên hoạt động trên project Pages.

## Triển khai miễn phí lên Cloudflare Pages

1. Đưa mã nguồn lên GitHub/GitLab và kết nối repository vào Cloudflare Pages, hoặc tải trực tiếp thư mục đã build nếu dùng chế độ upload.
2. Chọn **Framework preset: None**; không cần build command.
3. Đặt build output directory là `/` (thư mục gốc chứa `index.html`). Nếu giao diện yêu cầu thư mục build, dùng thư mục gốc của repository.
4. Triển khai và mở URL được cung cấp.

## Cách dữ liệu được lưu

- Khóa localStorage: `hoSoDiTheDataV1`.
- Lần mở đầu tiên, ứng dụng khởi tạo 10 hồ sơ mẫu. Những lần tiếp theo, dữ liệu đã lưu được nạp lại thay vì ghi đè bằng dữ liệu mẫu.
- Trạng thái gồm `entities`, `favorites`, `history`, `compareIds` và `settings`.
- Xuất JSON tạo bản sao chứa dữ liệu và các danh sách. Khi nhập JSON, ứng dụng xác nhận trước khi thay thế dữ liệu hiện tại.
- Dữ liệu nằm trong hồ sơ trình duyệt trên thiết bị hiện tại. Xóa dữ liệu website, dùng chế độ ẩn danh hoặc đổi trình duyệt có thể làm mất khả năng truy cập dữ liệu; hãy xuất JSON định kỳ.

## Định dạng dữ liệu

Mỗi hồ sơ có dạng khái quát:

```json
{
  "id": "example-entity",
  "name": "Tên thực thể",
  "aliases": ["Tên khác"],
  "classification": "Truyền thuyết dân gian",
  "category": "Truyền thuyết đô thị",
  "region": "Việt Nam",
  "culture": "Dân gian Việt Nam",
  "origin": "Nguồn gốc hoặc bối cảnh",
  "prevalence": 3,
  "summary": "Mô tả ngắn",
  "appearance": "Đặc điểm nhận dạng được kể lại",
  "abilities": "Năng lực trong truyện kể/tác phẩm",
  "habitat": "Môi trường trong câu chuyện",
  "stories": "Tóm tắt câu chuyện và dị bản",
  "limits": "Giới hạn kiểm chứng",
  "tags": ["truyền miệng", "văn hóa"],
  "image": "assets/slender-man.svg",
  "imageAlt": "Mô tả văn bản của ảnh",
  "sources": [
    {"title": "Tên nguồn", "url": "https://example.org/", "note": "Ghi chú nguồn"}
  ],
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z",
  "builtIn": false
}
```

`prevalence` là đánh giá biên tập 1–5 về mức độ phổ biến trong văn hóa đại chúng, không phải số liệu khảo sát. Những mô-típ siêu nhiên được mô tả như truyền thuyết/hư cấu; không có nội dung nào được coi là bằng chứng khoa học cho sự tồn tại của thực thể.

## Bảo mật và giới hạn

- Không dùng `eval()` hoặc thực thi mã trong JSON.
- Nội dung văn bản được escape trước khi đưa vào HTML; URL nguồn phải là HTTPS; ảnh chỉ nhận `assets/*.svg` hoặc HTTPS.
- Nhập JSON tối đa 5 MB và 1.000 hồ sơ/lần, kiểm tra mã hồ sơ và bản ghi trùng trước khi xác nhận lưu.
- Không có xác thực người dùng, đồng bộ đám mây, phân quyền, kiểm duyệt đóng góp công khai hoặc chống giả mạo vì ứng dụng không có backend.
- `localStorage` không mã hóa và có giới hạn dung lượng tùy trình duyệt. Đây là ứng dụng cá nhân trên một trình duyệt, chưa phù hợp để nhiều người cùng biên tập dữ liệu tập trung.
- Google Fonts được gọi qua CSS để có kiểu chữ đẹp hơn; nếu ngoại tuyến, ứng dụng tự dùng font dự phòng. Có thể bỏ dòng `@import` đầu `styles.css` để hoàn toàn không tải tài nguyên mạng.
- Các hồ sơ Ma Da và Quỷ Nhập Tràng ghi rõ giới hạn nguồn. Bài báo dẫn trong hồ sơ Quỷ Nhập Tràng chỉ nói về việc chất liệu dân gian được dùng trong văn hóa/phim ảnh, không xác minh hiện tượng siêu nhiên.

## Kiểm tra nhanh thủ công

Xem [`TEST_REPORT.md`](TEST_REPORT.md) để biết các kiểm thử khói đã chạy và những giới hạn của môi trường kiểm thử hiện tại.

1. Tìm `Mothman`, thử từ khóa `mắt đỏ`, sau đó xóa từ khóa.
2. Lọc `Việt Nam`, rồi chọn một phân loại; bấm **Đặt lại** để khôi phục.
3. Đánh dấu yêu thích một hồ sơ; tải lại trang và kiểm tra mục **Hồ sơ yêu thích**.
4. Đánh dấu 2–4 hồ sơ để đối chiếu, thử chọn hồ sơ thứ 5 và xác nhận ứng dụng từ chối vượt giới hạn.
5. Tạo hồ sơ mới, chỉnh sửa rồi xóa; xác nhận các mục yêu thích/so sánh không còn tham chiếu đến hồ sơ đã xóa.
6. Xuất JSON, thay đổi dữ liệu, sau đó nhập lại tệp vừa xuất để khôi phục. Thử nhập JSON sai cú pháp hoặc URL `javascript:` để kiểm tra thông báo lỗi.
7. Thử kích thước trình duyệt hẹp/điện thoại, mở menu và kiểm tra các thẻ, bảng so sánh cuộn ngang.

## Nguồn tham khảo trong dữ liệu mẫu

Nguồn được gắn trực tiếp trong từng hồ sơ. Ví dụ: Know Your Meme và SBS News về Slender Man; Reactor/NOW Toronto về Siren Head; Journal of Religion & Film và MDPI về Windigo; Smithsonian Folklife và USC Digital Folklore Archives về Mothman; trang tư liệu H. P. Lovecraft và Project Gutenberg Australia về Cthulhu; Project Gutenberg về truyện Baba Yaga trong tuyển tập Russian Fairy Tales; Revista Chilena de Literatura (Đại học Chile) về La Llorona; American Museum of Natural History về Chupacabra. Link được cung cấp để người dùng tự kiểm tra nội dung và ngữ cảnh.

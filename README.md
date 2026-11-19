# Portfolio — Nguyễn Trọng Phong

Trang portfolio cá nhân, song ngữ Việt / Anh (mặc định tiếng Việt; mở thẳng bản tiếng Anh bằng `?lang=en`).

React + TypeScript + Vite + Tailwind CSS. Trang tĩnh, không cần backend.

## Chạy trên máy

Cần [Bun](https://bun.sh) (hoặc Node.js 20+ với npm, thay `bun` bằng `npm`).

```bash
bun install
```

```bash
bun run dev
```

Mở địa chỉ hiện ra trong terminal (mặc định http://localhost:5173).

Build bản chính thức ra thư mục `dist/`:

```bash
bun run build
```

Xem thử bản build:

```bash
bun run preview
```

## Sửa nội dung

Tất cả nội dung nằm trong **một file**: [`src/data/profile.ts`](src/data/profile.ts). Sửa file này là trang web và thẻ SEO cùng đổi theo, không cần đụng vào giao diện.

- Mỗi đoạn chữ có hai bản: `{ vi: '…', en: '…' }`.
- Trường nào để rỗng `''` thì trang tự ẩn phần đó (ví dụ `url` của dự án chưa có link).
- `profile.highlights` là ba ô nổi bật dưới phần đầu trang.
- Mỗi nhóm kỹ năng có `icon`: `server`, `monitor`, `database`, `terminal` hoặc `layers`.
- Thêm kinh nghiệm / dự án / kỹ năng: sao chép một khối `{ … }` có sẵn trong mảng tương ứng rồi sửa.

Hình ảnh nằm trong `public/`:

| File | Dùng cho |
| --- | --- |
| `public/avatar.jpg` | Ảnh chân dung (nên vuông, mặt ở giữa) |
| `public/projects/<slug>.png` | Ảnh chụp màn hình dự án. `<slug>` là trường `slug` của dự án, ví dụ `ai-interview-coach.png`, `educlass.png`. Chưa có ảnh thì card hiện ảnh bìa màu kèm tên dự án. Thêm ảnh xong cần chạy lại `bun run dev` / `bun run build`. |
| `public/og-image.png` | Ảnh preview khi gửi link qua Zalo / Facebook / LinkedIn (1200×630) |

Muốn làm lại ảnh preview: sửa chữ trong `scripts/og-image.html`, mở file đó bằng Chrome ở cửa sổ 1200×630 rồi chụp màn hình, lưu đè lên `public/og-image.png`.

## Deploy

Trước khi deploy, sửa `site.url` trong `src/data/profile.ts` thành đúng địa chỉ trang. Thẻ Open Graph cần địa chỉ đầy đủ thì ảnh preview mới hiện.

### GitHub Pages (github.io)

Cách 1 — tự động bằng GitHub Actions (đã có sẵn `.github/workflows/deploy.yml`):

1. Tạo repo trên GitHub và đẩy code lên nhánh `main`.
2. Vào **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**.
3. Mỗi lần đẩy code lên `main`, trang tự build và cập nhật.

Địa chỉ trang:

- Repo tên `dunkeyyfong.github.io` → `https://dunkeyyfong.github.io`
- Repo tên khác, ví dụ `cv` → `https://dunkeyyfong.github.io/cv`

Cách 2 — tự up thư mục build: chạy `bun run build` rồi đưa toàn bộ nội dung trong `dist/` lên nhánh mà GitHub Pages đang phục vụ.

Bản build dùng đường dẫn tương đối nên chạy được ở cả hai kiểu địa chỉ trên mà không cần cấu hình thêm.

### Cloudflare Pages

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**, chọn repo.
2. Build command: `bun run build` (hoặc `npm run build`) · Build output directory: `dist`.
3. Save and Deploy.

Hoặc up thẳng thư mục `dist/` ở mục **Upload assets**.

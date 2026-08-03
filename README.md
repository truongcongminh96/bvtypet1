# Pet One Veterinary Care

Website phòng khám thú y Pet One với định hướng “Quiet Clinical Warmth”,
signature Care Notes và bảng màu sáng với xanh Pet One làm điểm nhấn.

## Tech stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4, Motion, Phosphor Icons, Radix Dialog
- Sanity Studio cho nội dung/ảnh và lớp dự phòng an toàn trong mã nguồn
- React Hook Form, Zod, Server Actions
- Resend và Cloudflare Turnstile
- Vercel Analytics, Speed Insights
- Không sử dụng database ở giai đoạn hiện tại

## Chạy local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Biến môi trường

Website hiển thị đầy đủ với nội dung dự phòng ngay cả khi chưa kết nối dịch vụ
ngoài. Form đặt lịch chỉ gửi email khi đã cấu hình:

- `BOOKING_EMAIL_TO`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

Thông tin công khai tại header và footer được cấu hình bằng:

- `NEXT_PUBLIC_CLINIC_PHONE`
- `NEXT_PUBLIC_CLINIC_EMAIL`
- `NEXT_PUBLIC_CLINIC_ADDRESS`
- `NEXT_PUBLIC_CLINIC_HOURS`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_INSTAGRAM_URL`

Sanity quản lý nội dung trang chủ và các collection nội dung:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Dataset hiện dùng chế độ public nên website không cần read token. Quyền chỉnh sửa
do tài khoản Sanity quản lý; không lưu username/password admin trong `.env`.

Studio nằm tại `/studio`. Lần đầu mở mục **Trang chủ**, Studio tạo document
singleton với text mặc định đang dùng trên website. Ảnh chưa upload lên Sanity
tiếp tục dùng file trong `public/images`, vì vậy có thể chuyển ảnh từng phần mà
không làm hỏng giao diện.

Trong Sanity Manage, thêm các origin sau vào phần API/CORS Origins:

- `http://localhost:3000` (Allow credentials)
- URL production trên Vercel, ví dụ `https://bvtypet1.vercel.app` (Allow credentials)

Sau khi publish, website nhận nội dung mới trong tối đa khoảng 5 phút. Những
document chưa tạo hoặc field chưa nhập sẽ tiếp tục dùng nội dung dự phòng trong
`src/content`.

## Kiểm tra chất lượng

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Deploy Vercel

Import repository vào Vercel hoặc chạy:

```bash
vercel
vercel --prod
```

Thêm các biến môi trường trước khi bật form đặt lịch và Content Studio. Cập nhật
`NEXT_PUBLIC_SITE_URL` thành tên miền chính thức để metadata, sitemap và
canonical URL được tạo đúng.

Các biến `NEXT_PUBLIC_SANITY_PROJECT_ID` và `NEXT_PUBLIC_SANITY_DATASET` phải
được khai báo cho cả Production, Preview và Development trên Vercel.

## Nội dung cần thay trước khi phát hành chính thức

- Số điện thoại, địa chỉ và giờ làm việc
- Hồ sơ bác sĩ đã xác minh
- Ảnh thật của phòng khám và đội ngũ
- Email nhận lịch, domain gửi email và Turnstile
- Các cam kết dịch vụ, số liệu hoặc chứng nhận đã được kiểm chứng

Các ảnh hiện dùng trên website là hình minh hoạ được tạo riêng cho concept và
đã được ghi chú rõ trong giao diện. Bộ ảnh dịch vụ nằm tại
`public/images/services`.

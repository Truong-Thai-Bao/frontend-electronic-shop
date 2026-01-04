# 🛒 Electric Shop 

> Website quản lý kho và đơn hàng cho cửa hàng điện tử (Electronics Store).

## 📖 Giới thiệu
Electric Shop là một ứng dụng web thương mại điện tử , cho phép người dùng xem, tìm kiếm, lọc sản phẩm và đặt hàng trực tuyến. Hệ thống cung cấp trang quản trị để quản lý sản phẩm, đơn hàng, người dùng và theo dõi doanh thu.

Link Deploy sản phẩm :
- **Frontend:** https://frontend-electronic-shop.vercel.app/
- **Backend:** https://backend-electronic-shop.onrender.com

---

## 🚀 Chức năng chính

### 1. Phía Người Dùng (Client) 
- **Xác thực:** Đăng ký, Đăng nhập, Đăng xuất, Refresh Token (JWT).
- **Sản phẩm:** Xem danh sách, Chi tiết sản phẩm, Tìm kiếm (Debounce), Lọc theo giá và đánh giá (Star/Price Filter).
- **Giỏ hàng & Đặt hàng:**
  - Thêm sản phẩm vào giỏ.
  - Thanh toán trực tuyến VNPay hoặc Tiền mặt 
  - Quản lý địa chỉ giao hàng.
- **Cá nhân:** Xem lịch sử đơn hàng, cập nhật thông tin cá nhân/avatar, theo dõi trạng thái đơn hàng (Pending, Completed, Cancelled).

### 2. Phía Quản Trị Viên (Admin) 
- **Dashboard:** Thống kê tổng quan về users, sản phẩm, đơn hàng.
- **Quản lý Sản phẩm (CRUD):** Thêm, Xóa, Sửa, Cập nhật thông tin, Upload ảnh (tích hợp Cloudinary).
- **Quản lý Đơn hàng:** Xem danh sách đơn hàng, cập nhật trạng thái vận chuyển/thanh toán.
- **Quản lý Người dùng:** Xem danh sách, thêm, sửa, xóa thông tin người dùng.

---

## 🛠 Công nghệ sử dụng 

### Frontend
- **ReactJS**: Thư viện xây dựng giao diện.
- **Redux Toolkit**: Quản lý state toàn cục (User, Order, Product).
- **React Query (TanStack Query)**: Quản lý fetching và caching dữ liệu API.
- **Ant Design**: Thư viện UI Component đơn giản.
- **Styled-components**: CSS-in-JS để style giao diện.

### Backend
- **Node.js & Express.js**: Xây dựng RESTful API.
- **MongoDB & Mongoose**: Cơ sở dữ liệu NoSQL.
- **JWT (JsonWebToken)**: Cơ chế xác thực và bảo mật
- **Bcrypt**: Mã hóa mật khẩu.

### Third-party Services
- **Cloudinary**: Lưu trữ hình ảnh sản phẩm/avatar
- **VNPay API**: Cổng thanh toán trực tuyến.

---

## ⚙️ Hướng dẫn Cài đặt & Chạy dự án

### 1. Yêu cầu môi trường
- Reactjs 
- Node.js (v14 trở lên).
- MongoDB (Cài sẵn hoặc dùng MongoDB Atlas).
- Git.

### 2. Cài đặt Backend (Server)

#### Di chuyển vào thư mục backend
```bash
cd backend
```
#### Cài đặt các gói phụ thuộc
```
npm install
```

#### Tạo file .env (backend/.env)
```
PORT=3001
MONGO_DB=mongodb+srv://thaibao:wC9925TGDouXdWgC@cluster0.zjtg7fy.mongodb.net/test?retryWrites=true&w=majority
ACCESS_TOKEN=access_token
REFRESH_TOKEN=refresh_token
SECURE_SECRET_VNPAY=ISESX55WGLQ6SLOBDBY7CULWK8WQLW6S
TMN_CODE=EG3CSSD9
APP_API_URL=http://localhost:3000
```
#### Chạy server
```
npm start
```
- Server sẽ chạy tại: http://localhost:3001

### 3. Cài đặt Frontend (Client)
#### Di chuyển vào thư mục backend
```bash
cd front
```
#### Cài đặt các gói phụ thuộc
```
npm install
```
#### Tạo file .env (frontend/.env)
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_CLOUDINARY_CLOUD_NAME=dhohcsfbj
REACT_APP_CLOUDINARY_PRESET=ml_default
```
#### Chạy server
```
npm start
```
- Server sẽ chạy tại: http://localhost:3000

### 4. Tài khoản kiểm thử 
#### Tài khoản Admin
- Email: admin@gmail.com
- Password : 123456
#### Tài khoản User
- Email: test@gmail.com
- Password : 1
#### Tài khoản thanh toán qua VNPay 
##### Lưu ý: Chỉ chọn thanh toán bằng "Thẻ nội địa"
- Ngân hàng: NCB
- Số thẻ:  9704198526191432198
- Tên chủ thẻ:  NGUYEN VAN A
- Ngày phát hành:  07/15
- Mật khẩu OTP: 123456

### Cấu trúc thư mục
```text
Electric-Shop/
├── backend/        
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   └── .env
│
└── frontend/       
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    │   ├── hook/
    │   └── services/
    └── .env
```




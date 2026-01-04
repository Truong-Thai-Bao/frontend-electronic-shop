import styled from "styled-components"

// Container chính của phần Header thông tin (3 cột)
export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: flex-start; /* Căn chỉnh lên trên */
  justify-content: space-between;
  gap: 20px; /* Khoảng cách giữa các ô */
  margin-bottom: 30px;
`

// Label tiêu đề nhỏ (VD: ĐỊA CHỈ NGƯỜI NHẬN)
export const WrapperLabel = styled.div`
  color: #555;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
`

// Khối nội dung thông tin (Card)
export const WrapperContentInfo = styled.div`
  background-color: #fff;
  border-radius: 12px; /* Bo góc mềm mại */
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05); /* Bóng đổ nhẹ */
  width: 100%;
  min-height: 140px; /* Chiều cao tối thiểu */
  display: flex;
  flex-direction: column;
  justify-content: center;
`

// Style cho text bên trong khối thông tin
export const WrapperInfoUser = styled.div`
  flex: 1; /* Chia đều 3 cột */
  
  .name-info {
    font-size: 15px;
    color: #333;
    font-weight: 700;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
  .address-info, .phone-info, .delivery-info, .delivery-fee, .payment-info {
    color: #666;
    font-size: 14px;
    margin-top: 6px;
    line-height: 1.5;
  }
  .name-delivery {
    color: #ea8500; 
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 5px;
  }
  .status-payment {
    margin-top: 8px;
    color: #ea8500; 
    font-weight: 600;
  }
`

// Phần chứa danh sách sản phẩm
export const WrapperStyleContent = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`

// Từng dòng sản phẩm
export const WrapperProduct = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0; /* Đường gạch ngăn cách mờ */
`

// Tên và ảnh sản phẩm
export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: center;
  flex: 4; /* Chiếm phần lớn diện tích */
  gap: 15px;
`

// Các cột số liệu (Giá, Số lượng...)
export const WrapperItem = styled.div`
  flex: 1; /* Chia đều các cột còn lại */
  font-weight: 500;
  color: #333;
  text-align: right; /* Căn phải cho số liệu */
  
  &:last-child {
    color: #d70018; /* Màu đỏ cho cột Thành tiền/Giảm giá */
    font-weight: 700;
  }
`

// Header của bảng sản phẩm (Tiêu đề cột)
export const WrapperItemLabel = styled.div`
  flex: 1;
  text-align: right; /* Căn phải cho khớp với nội dung */
  font-size: 14px;
  color: #888;
  font-weight: 600;
`

// Phần tổng tiền cuối cùng
export const WrapperAllPrice = styled.div`
  display: flex;
  justify-content: flex-end; /* Đẩy về bên phải */
  align-items: center;
  padding-top: 15px;
  
  /* Style cho Label (Tạm tính, Phí vận chuyển...) */
  & > div:first-child { 
     margin-right: 20px;
     color: #555;
     font-weight: 500;
  }

  /* Style cho Value (Số tiền) */
  & > div:last-child {
     color: #333;
     font-weight: 600;
     font-size: 15px;
     min-width: 150px;
     text-align: right;
  }

  /* Riêng dòng Tổng cộng sẽ to và đỏ */
  &:last-child > div:last-child {
      color: #d70018;
      font-size: 24px;
      font-weight: 700;
  }
`
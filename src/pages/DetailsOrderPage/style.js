import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: flex-start; 
  justify-content: space-between;
  gap: 20px; 
  margin-bottom: 30px;
`

export const WrapperLabel = styled.div`
  color: #555;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
`

export const WrapperContentInfo = styled.div`
  background-color: #fff;
  border-radius: 12px; 
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
  width: 100%;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const WrapperInfoUser = styled.div`
  flex: 1; 
  
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

export const WrapperStyleContent = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`

export const WrapperProduct = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
`

export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: center;
  flex: 4; 
  gap: 15px;
`

export const WrapperItem = styled.div`
  flex: 1; 
  font-weight: 500;
  color: #333;
  text-align: right; 
  
  &:last-child {
    color: #d70018; 
    font-weight: 700;
  }
`

export const WrapperItemLabel = styled.div`
  flex: 1;
  text-align: right; 
  font-size: 14px;
  color: #888;
  font-weight: 600;
`

export const WrapperAllPrice = styled.div`
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  padding-top: 15px;
  
  & > div:first-child { 
     margin-right: 20px;
     color: #555;
     font-weight: 500;
  }

  & > div:last-child {
     color: #333;
     font-weight: 600;
     font-size: 15px;
     min-width: 150px;
     text-align: right;
  }

  &:last-child > div:last-child {
      color: #d70018;
      font-size: 24px;
      font-weight: 700;
  }
`
import styled from "styled-components";
import { Radio } from "antd";

export const WrapperContainer = styled.div`
  width: 100%;
`

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  width: 100%;
`

export const WrapperContent = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    padding: 20px;
    margin-top: 20px;
`

export const WrapperValue = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  padding: 10px;
  width: fit-content;
  border-radius: 6px;
  margin-top: 8px;
  font-weight: 500;
`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  margin-top: 2px;
  padding: 15px 0;
  border: 2px solid #f5f5f5;
  
  &:last-child {
      border-bottom: none;
  }
`

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperItemOrderInfo = styled.div`
  padding: 17px 20px;
  background: #fff;
  width: 100%;

`

export const Label = styled.span`
  font-size: 14px;
  color: #555;
  font-weight: 600;
`

export const WrapperTotal = styled.div`
    display: flex;
    justify-content: flex-end; 
    padding: 20px;
    background: #fff;
    border-top: 1px solid #eee;
    font-size: 18px;
`
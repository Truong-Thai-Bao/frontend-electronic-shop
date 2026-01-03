import styled from "styled-components";

export const WrapperLableText = styled.h4`
    color: rgb(56, 56, 61);
    font-size: 14px;
    font-style:bold;
    margin-bottom: 8px;
    border-bottom: 2px solid #000;
`

export const WrapperTextValue = styled.span`
    display: block; 
    font-size: 14px;
    font-weight: 400;
    color: #38383d; 
    padding: 4px 6px; 
    margin-bottom: 4px;
    border-radius: 6px; 
    cursor: pointer;
    transition: all 0.3s ease; 

    &:hover {
        background-color: #e6f7ff; 
        color: #1890ff; 
        font-weight: 500;
        transform: translateX(5px); 
    }
`

export const WrapperContent = styled.div`
    display: flex;
    // align-items: center;
    flex-direction: column;
    gap: 2px;
`

export const WrapperTextPrice = styled.div`
    display: block;
    font-size: 15px;
    color: #555;
    padding: 3px 0;
    margin: 2px 0;
    cursor: pointer;
    position: relative;
    transition: color 0.3s;

    &:hover {
        font-weight: 600;
        color: #d70018; 
    }

    &::after {
        content: '';
        display: block;
        width: 0;
        height: 2px;
        background: #d70018;
        transition: width 0.3s;
    }

    &:hover::after {
        width: 100%; 
    }
`

export const WrapperStar = styled.div`
    padding: 5px;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0; 
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.2s;

    &:hover {
        color: #1890ff;
        background: #f9f9f9;
        padding-left: 15px; 
    }

    &:last-child {
        border-bottom: none; 
    }
`
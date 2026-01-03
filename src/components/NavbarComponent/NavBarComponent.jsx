import { Checkbox, Col, Rate, Row } from 'antd'
import React from 'react'
import { WrapperContent, WrapperLableText, WrapperStar, WrapperTextPrice, WrapperTextValue } from './style'
import { useState } from 'react'
import * as ProductService from '../../services/ProductService'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'




const NavBarComponent = () => {
    const onChange = () => { }
    const navigate = useNavigate()

    const [typeProducts, setTypeProducts] = useState([])
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if(res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    const handleNavigateType = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: type})
    }

    const handleOnchangePrice = (price) => {
        // Xử lý chuỗi giá thành khoảng min-max để gửi đi
        let min = 0
        let max = 0
        switch (price) {
            case 'Dưới 1 triệu':
                min = 0; max = 1000000;
                break;
            case '1 triệu - 3 triệu':
                min = 1000000; max = 3000000;
                break;
            case '3 triệu - 7 triệu':
                min = 3000000; max = 7000000;
                break;
            case '7 triệu - 13 triệu':
                min = 7000000; max = 13000000;
                break;
            case 'Trên 13 triệu':
                min = 13000000; max = 100000000; 
                break;
            default:
                return;
        }
        navigate('/product/filter-price', { state: { min, max, type: 'price-filter' } })
    }

    const handleOnchangeStar = (star) => {
        navigate('/product/filter-star', { state: { star, type: 'star-filter' } })
    }

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (
                        <WrapperTextValue
                            key={option}
                            onClick={() => handleNavigateType(option)}
                        >{option}</WrapperTextValue>
                    )
                })
            case 'star':
                return options.map((option) => {
                    return (
                        <WrapperStar 
                            onClick={() => handleOnchangeStar(option)}
                            key={option}
                        >
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span> {`từ ${option}  sao`}</span>
                        </WrapperStar>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice onClick={() => handleOnchangePrice(option)}
                            key={option}
                            style={{cursor: 'pointer'}}
                        >{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }

    return (
        <div>
            <WrapperLableText>Phân loại</WrapperLableText>
            <WrapperContent>
                {renderContent("text", typeProducts)}
            <WrapperLableText>Đánh giá</WrapperLableText>
                {renderContent("star",[
                    5,4,3,2,1
                ])}
            <WrapperLableText>Phân vùng giá</WrapperLableText>
                {renderContent("price",[
                    "Dưới 1 triệu",
                    "1 triệu - 3 triệu",
                    "3 triệu - 7 triệu",
                    "7 triệu - 13 triệu",
                    "Trên 13 triệu",
                ])}
            </WrapperContent>
        </div>
    )
}

export default NavBarComponent
import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponent/Loading'

const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token)
    return res.data
  }

  const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder }, {
    enabled: id
  })
  const { isLoading, data } = queryOrder

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
  },[data])

  return (
   <Loading isLoading={isLoading}>
     <div style={{width: '100%', minHeight: '100vh', background: '#f5f5fa', paddingBottom: '50px'}}>
      <div style={{ width: '1270px', margin: '0 auto'}}>
        <h3 style={{fontSize: '24px', fontWeight: 'bold', color: '#333', padding: '20px 0'}}>Chi tiết đơn hàng</h3>
        
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className='name-info'>{data?.shippingAddress?.fullName}</div>
              <div className='address-info'><span>Địa chỉ: </span> {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}</div>
              <div className='phone-info'><span>Điện thoại: </span> {data?.shippingAddress?.phone}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          
          <WrapperInfoUser>
            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className='delivery-info'><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
              <div className='delivery-fee'><span>Phí giao hàng: </span> {convertPrice(data?.shippingPrice)}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
              <div className='status-payment'>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>

        <WrapperStyleContent>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '15px', borderBottom: '1px solid #ccc'}}>
            <div style={{flex: 4, fontWeight: 'bold', fontSize: '15px', color: '#555'}}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
          </div>

          {data?.orderItems?.map((order) => {
            return (
              <WrapperProduct key={order?._id}> 
                <WrapperNameProduct>
                  <img src={order?.image} 
                    style={{
                      width: '70px', 
                      height: '70px', 
                      objectFit: 'cover',
                      borderRadius: '6px',
                      border: '1px solid #eee'
                    }}
                    alt="product"
                  />
                  <div style={{
                    width: '100%', 
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap',
                    marginLeft: '10px',
                    fontWeight: '500',
                    color: '#333'
                  }} title={order?.name}>Điện thoại</div> 
                </WrapperNameProduct>
                
                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                <WrapperItem>{order?.discount ? convertPrice(priceMemo * order?.discount / 100) : '0 VND'}</WrapperItem>
              </WrapperProduct>
            )
          })}
          
          <div style={{borderTop: '1px solid #f0f0f0', marginTop: '20px', paddingTop: '20px'}}>
              <WrapperAllPrice>
                <div>Tạm tính</div>
                <div>{convertPrice(priceMemo)}</div>
              </WrapperAllPrice>
              
              <WrapperAllPrice>
                <div>Phí vận chuyển</div>
                <div>{convertPrice(data?.shippingPrice)}</div>
              </WrapperAllPrice>
              
              <WrapperAllPrice>
                <div>Tổng cộng</div>
                <div>{convertPrice(data?.totalPrice)}</div>
              </WrapperAllPrice>
          </div>

      </WrapperStyleContent>
      </div>
    </div>
   </Loading>
  )
}

export default DetailsOrderPage
import React, { useEffect, useState } from 'react'
import { Label, WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemOrderInfo, WrapperContent, WrapperTotal } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useLocation, useSearchParams } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const OrderSuccess = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams(); 
  
  const [state] = useState(() => {
    if (location.state) return location.state;
    const tempOrder = localStorage.getItem('tempOrder');
    return tempOrder ? JSON.parse(tempOrder) : null;
  });

  const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')
  const vnp_Amount = searchParams.get('vnp_Amount')
  
  const isVnpay = searchParams.has('vnp_ResponseCode'); 
  const isVnpayError = isVnpay && vnp_ResponseCode !== '00';

  useEffect(() => {
    if (isVnpay) {
      localStorage.removeItem('tempOrder'); 
    }
  }, [isVnpay]);

  const displayData = {
      delivery: state ? orderContant.delivery[state?.delivery] : '',
      payment: state ? orderContant.payment[state?.payment] : '',
      totalPrice: state ? state?.totalPriceMemo : (vnp_Amount ? vnp_Amount / 100 : 0),
      orders: state?.orders || [] 
  }

  if (isVnpayError) {
      return (
        <div style={{ background: '#f5f5fa', width: '100%', minHeight: '100vh', paddingTop: '50px' }}>
            <div style={{ width: '1270px', margin: '0 auto', textAlign: 'center', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                 <CloseCircleFilled style={{ fontSize: '50px', color: 'red' }} />
                 <h2 style={{ color: 'red', margin: '10px 0' }}>Thanh toán thất bại</h2>
                 <p>Giao dịch VNPAY không thành công. Vui lòng thử lại.</p>
            </div>
        </div>
      )
  }

  return (
    <div style={{ background: '#f5f5fa', width: '100%', minHeight: '100vh', paddingBottom: '20px' }}>
      <Loading isLoading={false}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          
          <div style={{ paddingTop: '20px', textAlign: 'center' }}>
             <CheckCircleFilled style={{ fontSize: '40px', color: '#26aa99', marginBottom: '10px' }} />
             <h3 style={{ color: '#26aa99', fontSize: '24px', margin: 0 }}>
                 {isVnpay ? 'Thanh toán VNPAY thành công!' : 'Đặt hàng thành công!'}
             </h3>
             <p style={{ color: '#888', marginTop: '5px' }}>Cảm ơn bạn đã mua sắm tại cửa hàng</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
              <WrapperContent>
                <WrapperInfo>
                  <div style={{display: 'flex', gap: '50px'}}> 
                    <div style={{flex: 1}}>
                        <Label>Phương thức giao hàng</Label>
                        <WrapperValue>
                            <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{displayData.delivery}</span> Giao hàng tiết kiệm
                        </WrapperValue>
                    </div>

                    <div style={{flex: 1}}>
                        <Label>Phương thức thanh toán</Label>
                        <WrapperValue>
                            {displayData.payment}
                        </WrapperValue>
                    </div>
                  </div>
                </WrapperInfo>

                <WrapperItemOrderInfo>
                  <Label style={{display:'block', marginBottom: '10px'}}>
                      Sản phẩm đã đặt
                  </Label>
                  
                  {displayData.orders.map((order) => {
                    return (
                      <WrapperItemOrder key={order?.name}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15, flex: 1 }}>
                          <img src={order.image} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} alt={order.name} />
                          <div style={{
                            width: '100%', 
                            maxWidth: '500px', 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: '500',
                            color: '#333'
                          }} title={order?.name}>{order?.name}</div>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexShrink: 0 }}>
                          <span style={{ fontSize: '14px', color: '#555' }}>
                            Số lượng: <b style={{color: '#000'}}>{order?.amount}</b>
                          </span>
                          
                          <span style={{ fontSize: '14px', color: '#333' }}>
                             Giá: <span style={{ color: '#d70018', fontWeight: 'bold', fontSize: '15px' }}>{convertPrice(order?.price)}</span>
                          </span>
                        </div>
                      </WrapperItemOrder>
                    )
                  })}
                </WrapperItemOrderInfo>

                <WrapperTotal>
                  <span style={{ fontSize: '16px', color: '#333', marginRight: '10px' }}>Tổng thanh toán:</span>
                  <span style={{ fontSize: '20px', color: '#d70018', fontWeight: 'bold' }}>
                      {convertPrice(displayData.totalPrice)}
                  </span>
                </WrapperTotal>
                
              </WrapperContent>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default OrderSuccess

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';



const ListingPage = () => {
    SwiperCore.use([Navigation]);

    const {id} = useParams();
    const [listing, setListing] =useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchListing = async () => {
            try {
            const res = await fetch(`http://localhost:3000/api/list/get/${id}`);
            const data = await res.json();
            if (data.success) {
                setListing(data.listing);
                setLoading(false)
            }
            } catch (error) {
            console.log("err", error);
            setLoading(false)
            }
        };

        fetchListing();
        }, [id]);

  return (
    <main>
        {loading && <p className='text-center my-7 text 2xl '>Loading ...</p>}

      {
        listing && !loading && 
        (
            <div className="">
                <Swiper navigation>
                    {
                        listing.imageUrls.map((img) => (
                            <SwiperSlide key={img._id}>
                                <div
                                className='h-[400px] '
                                style={{
                                    background: `url(${img.url}) center no-repeat`,
                                    backgroundSize: 'cover',
                                }}
                                ></div>
                            </SwiperSlide>
                            
                        ))
                    }
                </Swiper>
                <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            {/* <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />  */}
          </div>
            </div>
  )
      }
    </main>
  )
}

export default ListingPage

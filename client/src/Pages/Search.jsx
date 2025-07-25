import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation,Link } from 'react-router-dom';
const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarData, setSidebarData] = useState({
        searchTerm:'',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created-at',
        order: 'desc'

    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);


    useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();

      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/list/search?${searchQuery}`);
      const data = await res.json();
      console.log(data,"data")
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);


    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebarData({ ...sidebarData, type: e.target.id });
        }
        if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData, searchTerm: e.target.value})
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSidebarData({...sidebarData, [e.target.id]: e.target.checked })
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebarData({ ...sidebarData, sort, order });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };



    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
        setShowMore(false);
        }
        setListings([...listings, ...data]);
    };


  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-3 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit}  className='flex flex-col gap-8'>
            <div className="flex items-center gap-2">
                <label className='font-semibold text-2xl'>Search</label>
                <input type="text"
                id="searchTerm"
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'
                value={sidebarData.searchTerm}
                onChange={handleChange}

                 />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <label className='font-semibold'>Type:</label>
                <div className="flex gap-2">
                    <input type="checkbox" id='all'
                    onChange={handleChange}
                    checked ={sidebarData.type === 'all'}
                    className='w-5' />
                    <span>Rent & Sale</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='rent'
                    onChange={handleChange}
                    checked={sidebarData.type === 'rent'}
                    className='w-5' />
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='sale'
                    onChange={handleChange}
                    checked={sidebarData.type === 'sale'}
                    className='w-5' />
                    <span>Sale</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='offer'
                    onChange={handleChange}
                    checked={sidebarData.offer}
                    className='w-5' />
                    <span>Offer</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='parking'
                    onChange={handleChange}
                    checked={sidebarData.parking}
                    className='w-5' />
                    <span>Parking</span>
                </div>
                <div className='flex gap-2'>
                    <input
                        type='checkbox'
                        id='furnished'
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebarData.furnished}
                    />
                    <span>Furnished</span>
                </div>
                
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-2 m-2'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase w-full hover:opacity-95'>
            Search
          </button>
        </form>
    </div>
      <div className="flex-1">
        <h1 className='font-semibold text-3xl p-2  text-slate-700 mt-2'>Result:</h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
  listings &&
  listings.map((listing) => (
    <div
      key={listing._id}
      className='border rounded-lg shadow-md hover:shadow-xl transition w-full sm:w-[330px]'
    >
      <img
        src={listing.imageUrls[0]?.url || 'https://via.placeholder.com/400'}
        alt={listing.name}
        className='h-[200px] w-full object-cover rounded-t-lg'
      />
      <div className='p-4'>
        <Link to={`/listpage/${listing._id}`} className='text-xl font-semibold text-slate-800 truncate'>
          {listing.name}
        </Link>
        <p className='text-sm text-slate-600 truncate'>{listing.address}</p>
        <p className='mt-2 font-bold text-green-700'>
          PKR{' '}
          {listing.offer
            ? listing.discountedPrice?.toLocaleString()
            : listing.regularPrice?.toLocaleString()}
          {listing.type === 'rent' && ' / month'}
        </p>
        {listing.offer && (
          <p className='text-sm text-red-500 font-semibold'>
            Offer available!
          </p>
        )}
      </div>
    </div>
))}


          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search

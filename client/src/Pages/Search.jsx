import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-3 border-b-2 md:border-r-2 md:min-h-screen">
        <form>
            <div className="flex items-center gap-2">
                <label className='font-semibold text-2xl'>Search</label>
                <input type="text"
                id="searchTerm"
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'
                 />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <label className='font-semibold'>Type:</label>
                <div className="flex gap-2">
                    <input type="checkbox" id='all' className='w-5' />
                    <span>Rent & Sale</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='rent' className='w-5' />
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='sale' className='w-5' />
                    <span>Sale</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='offer' className='w-5' />
                    <span>Offer</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='parking' className='w-5' />
                    <span>Parking</span>
                </div>
                
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                // onChange={handleChange}
                // checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                // onChange={handleChange}
                // checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
            //   onChange={handleChange}
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
      </div>
    </div>
  )
}

export default Search

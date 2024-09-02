import React, { useState } from 'react'
type getFilteredItemsType = {
  getfilteredItems: () => Promise<void>
}
const FilterSidebar = ({getfilteredItems}: getFilteredItemsType) => {
  const [name, setName] = useState<string>('')
  const [minPrice, setMinPrice] = useState<string|number>('')
  const [maxPrice, setMaxPrice] = useState<string|number>('')
  const [minQuantity, setMinQuantity] = useState<string|number>('')
  const [maxQuantity, setMaxQuantity] = useState<string|number>('')
  const [withVariants, setWithVariants] = useState(true)
  const [withNoVariants, setWithNoVariants] = useState(true)
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setName(value);
    };
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setMinPrice(value);
    };
    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setMaxPrice(value);
    };
    const handleMinQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setMinQuantity(value);
    };
    const handleMaxQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setMaxQuantity(value);
    };
    const handleWithVariantsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWithVariants(event.target.checked);
    };
    const handleWithNoVariantsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWithNoVariants(event.target.checked);
    };


  return (
    <div className='w-64 p-4 bg-white shadow-md h-screen'>
        <h2 className='text-x1 font semibold test-indigo-600 mb-4'>
            Filter items
        </h2>
        <div className='mb-4'>
            <label htmlFor="name" className='block text-indigo-600 mb-2'>Name</label>
            <input type="text" id='name' onChange={handleNameChange} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600' placeholder='Enter name'/>
        </div>

        <div className='mb-4'>
            <label htmlFor="minPrice" className='block text-indigo-600 mb-2'>Min Price</label>
            <input type="number" id='minPrice' onChange={handleMinPriceChange} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600' placeholder='Enter minimum price'/>
        </div>

        <div className='mb-4'>
            <label htmlFor="maxPrice" className='block text-indigo-600 mb-2'>Max Price</label>
            <input type="number" id='maxPrice'onChange={handleMaxPriceChange} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600' placeholder='Enter maximum price'/>
        </div>

        <div className='mb-4'>
            <label htmlFor="minQuantity" className='block text-indigo-600 mb-2'>Min Quantity</label>
            <input type="number" id='minQuantity'onChange={handleMinQuantityChange} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600' placeholder='Enter minimum quantity'/>
        </div>

        <div className='mb-4'>
            <label htmlFor="maxQuantity" className='block text-indigo-600 mb-2'>Max Quantity</label>
            <input type="number" id='maxQuantity' onChange={handleMaxQuantityChange} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600' placeholder='Enter maximum quantity'/>
        </div>

        <div className='mb4'>
            <h3 className='text-lg font-medium text-indigo-600 mb-2'>Variants</h3>
            <div className="flex items-center mb2">
                <input type="checkbox" id='HasVariants' onChange={handleWithVariantsChange} defaultChecked className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 ronuded' />
                <label htmlFor="HasVariants" className='ml-2 text-indigo-600'> With Variants</label>
                <input type="checkbox" id='HasNoVariants' onChange={handleWithNoVariantsChange} defaultChecked className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 ronuded' />
                <label htmlFor="HasNoVariants" className='ml-2 text-indigo-600'> With No Variants</label>
            </div>
        </div>
        

        <button type='button' onClick={getfilteredItems} className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600'>
            Apply Filters
        </button>
        
      
    </div>
  )
}

export default FilterSidebar
import React from 'react'

const Whats = ({createPost , setContent}) => {
  return (
<div className='w-full z-20 -mt-10 sticky top-[56px] bg-dark-200'>
    <form
    className="w-3/4 pr-12 pt-8 pb-4"
    onSubmit={createPost}>
      <div className="flex justify-end">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full outline outline-2 outline-primary">
            <img src="public/thumpnail.png" alt="Profile" />
          </div>
          <textarea 
          className="textarea outline-1 focus:ring-offset-1 focus:ring-1 focus:ring-primary/75 outline outline-primary shadow-md shadow-primary bg-dark-200 text-base text-white font-body w-[30rem] h-16 ml-2"
           placeholder="What's in your mind?"
           onChange={(e) => setContent(e.target.value)}
           ></textarea>
        </div>
      </div>
      {/* Button */}
      <div className="flex justify-end mx-auto space-x-2 mt-2">
        <button 
        className="btn btn-outline hover:outline hover:-outline-offset-1 hover:outline-1 hover:outline-primary hover:bg-dark-200 hover:text-primary btn-xs h-2"
        type='reset'
        onClick={() => setContent('')}
        >
            Clear
        </button>
        <button 
        className="btn btn-xs hover:scale-110 hover:bg-white hover:text-black bg-primary text-white"
        type='submit'
        >
            Post
        </button>
      </div>           
    </form>
</div> )
}

export default Whats
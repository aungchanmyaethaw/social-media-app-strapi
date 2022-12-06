import React from 'react'

const Whats = ({createPost , setContent}) => {
  return (
// Form
<form 
className="w-3/4 pr-12 mt-6"
onSubmit={createPost}>
  <div className="flex justify-end">
    <div className="avatar">
      <div className="w-12 h-12 rounded-full">
        <img src="public/thumpnail.png" alt="Profile" />
      </div>
      <textarea 
      className="textarea textarea-bordered bg-dark-100 text-base text-white font-body w-[30rem] h-16 ml-2"
       placeholder="What's in your mind?"
       onChange={(e) => setContent(e.target.value)}
       ></textarea>
    </div>
  </div>
  {/* Button */}
  <div className="flex justify-end mx-auto space-x-2 mt-2">
    <button 
    className="btn btn-xs btn-outline border-primary text-primary"
    type='reset'
    onClick={() => setContent('')}
    >
        Discard
    </button>
    <button 
    className="btn btn-xs hover:scale-110 bg-primary text-white"
    type='submit'
    >
        Post
    </button>
  </div>           
</form> )
}

export default Whats
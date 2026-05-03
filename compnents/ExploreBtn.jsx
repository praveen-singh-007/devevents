// import Image from "next/image";
'use client';
const ExploreBtn = () => {
  return (
   <>
    <button type="button" id="explore-btn" className="mt-7 mx-auto border border-white" onClick={()=>console.log('CLICKED')}>
  <a href="#events">
    Explore Events

    <img
      alt="arrow-down"
      loading="lazy"
      width="24"
      height="24"
      decoding="async"
      style={{ color: "transparent" }}
      src="/icons/arrow-down.svg"
    />
  </a>
</button>

</>

  );
}

export default ExploreBtn;
